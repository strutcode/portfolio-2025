import Scene from '../rendering/Scene'

import {
  createProgramInfo,
  m4,
  v3,
  createBufferInfoFromArrays,
  primitives,
  createVertexArrayInfo,
  drawObjectList,
  addExtensionsToContext,
  type ProgramInfo,
  type BufferInfo,
  type VertexArrayInfo,
} from 'twgl.js'
import WavefrontLoader from './WavefrontLoader'

type GlObjectDescriptor =
  | {
      // Normal object
      programInfo: ProgramInfo
      bufferInfo: BufferInfo
      world: m4.Mat4
      transparent?: boolean
    }
  | {
      // Instanced object
      programInfo: ProgramInfo
      bufferInfo: BufferInfo
      vertexArrayInfo: VertexArrayInfo
      instanceCount: number
      transparent?: boolean
    }

export default class HeroScene extends Scene {
  private objects: GlObjectDescriptor[] = []
  private terrain: GlObjectDescriptor[] = []

  protected async setup() {
    const gl = this.ctx

    addExtensionsToContext(gl)
    if (!gl.drawArraysInstanced || !gl.createVertexArray) {
      alert('need drawArraysInstanced and createVertexArray') // eslint-disable-line
      return
    }

    // Load shaders
    const terrainShader = createProgramInfo(gl, [
      (await import('./shaders/terrain.vs.glsl')).default,
      (await import('./shaders/terrain.fs.glsl')).default,
    ])
    const starShader = createProgramInfo(gl, [
      (await import('./shaders/star.vs.glsl')).default,
      (await import('./shaders/star.fs.glsl')).default,
    ])

    // Initialize the resize listener
    window.addEventListener('resize', this.boundResize)
    this.resize()

    // Load the model from the server
    WavefrontLoader.load('/terrain.obj').then((data) => {
      const terrain1: GlObjectDescriptor = {
        programInfo: terrainShader,
        bufferInfo: createBufferInfoFromArrays(gl, data),
        world: m4.identity(),
      }
      const terrain2: GlObjectDescriptor = {
        programInfo: terrainShader,
        bufferInfo: createBufferInfoFromArrays(gl, data),
        world: m4.translation([0, 0, 11.7]),
      }
      this.objects.push(terrain1)
      this.objects.push(terrain2)
      this.terrain.push(terrain1)
      this.terrain.push(terrain2)
    })

    const instances = 200
    const instanceWorlds = new Float32Array(16 * instances)
    const rand = (min: number, max: number) => Math.random() * (max - min) + min
    const r = 20

    for (let i = 0; i < instances; i++) {
      const mat = new Float32Array(instanceWorlds.buffer, i * 16 * 4, 16)

      // Random distribution in an area
      m4.translation([rand(-r, r), rand(0, r), 50], mat)

      // Rotate the billboards to face -Z
      m4.rotateY(mat, Math.PI, mat)

      // Randomize rotation relative to camera
      m4.rotateZ(mat, rand(-Math.PI, Math.PI), mat)

      // Random scaling
      const s = rand(0.1, 0.33)
      m4.scale(mat, [s, s, s], mat)
    }

    const bufferInfo = createBufferInfoFromArrays(gl, {
      ...primitives.createXYQuadVertices(1),
      instanceWorld: {
        numComponents: 16,
        data: instanceWorlds,
        divisor: 1,
      },
    })

    this.objects.push({
      programInfo: starShader,
      bufferInfo,
      vertexArrayInfo: createVertexArrayInfo(gl, starShader, bufferInfo),
      instanceCount: instances,
      transparent: true,
    })
  }

  /** Pauses the render loop. */
  protected pause() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
  }

  /** Resumes the render loop if it's paused. */
  protected resume() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }

    this.animationFrame = requestAnimationFrame(this.boundRender)
  }

  protected update(delta: number) {
    for (const terrain of this.terrain) {
      // Move the terrain toward the camera
      m4.translate(terrain.world, [0, 0, delta * 0.003], terrain.world)

      // Wrap the terrain around if it moves too far
      if (m4.getTranslation(terrain.world)[2] <= -11.7) {
        m4.translate(terrain.world, [0, 0, 23.4], terrain.world)
      }
    }
  }

  protected render() {
    const gl = this.ctx
    const darkMode = document.documentElement.classList.contains('dark-theme')

    const now = performance.now()
    const delta = (now - this.last) * 0.001
    this.update(this.last - now)
    this.last = now

    this.update(delta)

    // Reset the canvas
    if (darkMode) {
      gl.clearColor(0.03, 0.03, 0.1, 1.0)
    } else {
      gl.clearColor(0.7, 0.8, 1.0, 1.0)
    }
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    // Enable basic features
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)

    // Calculate all global data
    const time = performance.now() / 1000
    const projection = m4.perspective(
      (30 * Math.PI) / 180,
      this.canvas.width / this.canvas.height,
      0.1,
      100,
    )
    const vPos = document.documentElement.scrollTop / window.innerHeight
    const camera = m4.lookAt([0, 1.2 - vPos, -8], [0, 1 + vPos, 0], [0, 1, 0])
    const view = m4.inverse(camera)
    const viewProjection = m4.multiply(projection, view)

    // Draw everything
    for (const object of this.objects) {
      if (object.transparent) {
        gl.enable(gl.BLEND)
        gl.disable(gl.DEPTH_TEST)

        // Assume straight alpha
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      } else {
        gl.disable(gl.BLEND)
        gl.enable(gl.DEPTH_TEST)
      }

      const uniforms = {
        time,
        resolution: [this.canvas.width, this.canvas.height],
        viewProjection,
        lightDirection: v3.normalize(v3.create(0.5, -0.2, 1)),
        shadowColor: darkMode ? [0.01, 0.03, 0.1] : [0.1, 0.3, 0.14],
        lightColor: darkMode ? [0.05, 0.14, 0.05] : [0.6, 0.87, 0.6],
      }

      if (object.world) {
        uniforms.world = object.world
        uniforms.worldViewProjection = m4.multiply(viewProjection, object.world)
      }

      drawObjectList(gl, [
        {
          programInfo: object.programInfo,
          bufferInfo: object.bufferInfo,
          vertexArrayInfo: object.vertexArrayInfo,
          uniforms,
          instanceCount: object.instanceCount,
        },
      ])
    }

    // Wait for the next render loop
    this.animationFrame = requestAnimationFrame(this.boundRender)
  }
}

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
  drawBufferInfo,
  setBuffersAndAttributes,
  setUniforms,
} from 'twgl.js'
import WavefrontLoader from './WavefrontLoader'

type GlObjectDescriptor =
  | {
      // Normal object
      kind: 'mesh'
      programInfo: ProgramInfo
      bufferInfo: BufferInfo
      world: m4.Mat4
      transparent?: boolean
    }
  | {
      // Instanced object
      kind: 'instanced'
      programInfo: ProgramInfo
      bufferInfo: BufferInfo
      vertexArrayInfo: VertexArrayInfo
      instanceCount: number
      transparent?: boolean
    }

export default class HeroScene extends Scene {
  private objects: GlObjectDescriptor[] = []
  private terrain: GlObjectDescriptor[] = []
  private backgroundColor: v3.Vec3 = [1, 1, 1]
  private lightColor: v3.Vec3 = [1, 1, 1]
  private shadowColor: v3.Vec3 = [0, 0, 0]
  private transitionT = 0
  private instancingAvailable = true

  protected async setup() {
    const gl = this.ctx

    // Add available extensions to the WebGL context
    addExtensionsToContext(gl)

    // If instanced rendering and VAOs, flag it
    for (const method of ['drawArraysInstanced', 'createVertexArray']) {
      if (!(method in gl)) {
        this.instancingAvailable = false
        break
      }
    }

    // Initialize the resize listener
    window.addEventListener('resize', this.boundResize)
    this.resize()

    this.loadTerrain()
    this.createStars()
  }

  protected async loadTerrain() {
    const gl = this.ctx

    // Load the shader
    const terrainShader = createProgramInfo(gl, [
      (await import('./shaders/terrain.vs.glsl')).default,
      (await import('./shaders/terrain.fs.glsl')).default,
    ])

    // Load the model from the server
    const data = await WavefrontLoader.load('/terrain.obj')

    const terrain1: GlObjectDescriptor = {
      kind: 'mesh',
      programInfo: terrainShader,
      bufferInfo: createBufferInfoFromArrays(gl, data),
      world: m4.identity(),
    }
    const terrain2: GlObjectDescriptor = {
      kind: 'mesh',
      programInfo: terrainShader,
      bufferInfo: createBufferInfoFromArrays(gl, data),
      world: m4.translation([0, 0, 11.7]),
    }

    this.objects.push(terrain1)
    this.objects.push(terrain2)
    this.terrain.push(terrain1)
    this.terrain.push(terrain2)
  }

  protected async createStars() {
    const gl = this.ctx

    // Load the shader
    const starShader = createProgramInfo(gl, [
      (await import('./shaders/star.vs.glsl')).default,
      (await import('./shaders/star.fs.glsl')).default,
    ])

    // Set some constants that will be used to create the stars
    const instances = 200
    const instanceWorlds = new Float32Array(16 * instances)
    const spread = [20, 20]
    const scale = [0.1, 0.33]

    /** A small helper function that returns a random numnber in a range */
    const rand = (min: number, max: number) => Math.random() * (max - min) + min

    for (let i = 0; i < instances; i++) {
      const mat = new Float32Array(instanceWorlds.buffer, i * 16 * 4, 16)

      // Random distribution in an area
      m4.translation([rand(-spread[0], spread[0]), rand(0, spread[1]), 50], mat)

      // Rotate the billboards to face -Z
      m4.rotateY(mat, Math.PI, mat)

      // Randomize rotation relative to camera
      m4.rotateZ(mat, rand(-Math.PI, Math.PI), mat)

      // Random scaling
      const s = rand(scale[0], scale[1])
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
      kind: 'instanced',
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
    const darkMode = document.documentElement.classList.contains('dark-theme')

    if (darkMode) {
      if (this.transitionT < 1) {
        this.transitionT = Math.min(1, this.transitionT + delta / 0.2)
      }
    } else {
      if (this.transitionT > 0) {
        this.transitionT = Math.max(0, this.transitionT - delta / 0.2)
      }
    }

    this.backgroundColor = v3.lerp([0.7, 0.8, 1.0], [0.03, 0.03, 0.1], this.transitionT)
    this.shadowColor = v3.lerp([0.1, 0.3, 0.14], [0.01, 0.03, 0.1], this.transitionT)
    this.lightColor = v3.lerp([0.6, 0.87, 0.6], [0.05, 0.14, 0.05], this.transitionT)

    for (const terrain of this.terrain) {
      if (terrain.kind === 'mesh') {
        // Move the terrain toward the camera
        m4.translate(terrain.world, [0, 0, -delta * 3], terrain.world)

        // Wrap the terrain around if it moves too far
        const z = m4.getTranslation(terrain.world)[2]
        if (z <= -11.7) {
          m4.translate(terrain.world, [0, 0, 23.4], terrain.world)
        }
      }
    }
  }

  protected render() {
    const gl = this.ctx

    const now = performance.now()
    const delta = (now - this.last) * 0.001
    this.last = now

    this.update(delta)

    // Reset the canvas
    gl.clearColor(...(this.backgroundColor as [number, number, number]), 1)
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
    const camera = m4.lookAt([0, 2.2 - vPos * 2, -8], [0, 1 + vPos, 0], [0, 1, 0])
    const view = m4.inverse(camera)
    const viewProjection = m4.multiply(projection, view)

    // Draw everything
    let lastObject: GlObjectDescriptor | null = null
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
        lightColor: this.lightColor,
        shadowColor: this.shadowColor,
        backgroundColor: this.backgroundColor,
      }

      // If the shader wasn't just used and already active...
      if (object.programInfo !== lastObject?.programInfo) {
        // Activate the shader for this object
        gl.useProgram(object.programInfo.program)
      }

      // If the object being drawn changed, set up the buffers
      if (object.bufferInfo !== lastObject?.bufferInfo) {
        // If the last object used a VAO, unbind it
        if (object.kind === 'instanced' && lastObject?.kind !== 'instanced') {
          gl.bindVertexArray(null)
        }

        setBuffersAndAttributes(gl, object.programInfo, object.bufferInfo)
      }

      if (object.kind === 'mesh') {
        // Set all uniforms including the optional ones for this type
        setUniforms(object.programInfo, {
          ...uniforms,
          world: object.world,
          worldViewProjection: m4.multiply(viewProjection, object.world),
        })

        drawBufferInfo(gl, object.bufferInfo)
      } else if (object.kind === 'instanced') {
        // Crude, but if instancing isn't available, skip the object
        // At least this way we can still render the rest of the scene
        if (!this.instancingAvailable) {
          continue
        }

        // Set standard uniforms
        setUniforms(object.programInfo, uniforms)

        // Use the instanced form of `drawBufferInfo`
        drawBufferInfo(
          gl,
          object.vertexArrayInfo,
          gl.TRIANGLES,
          undefined,
          undefined,
          object.instanceCount,
        )
      }

      lastObject = object
    }

    // Wait for the next render loop
    this.animationFrame = requestAnimationFrame(this.boundRender)
  }
}

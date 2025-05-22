import Scene from '../rendering/Scene'

import {
  createProgramInfo,
  m4,
  v3,
  createBufferInfoFromArrays,
  primitives,
  createVertexArrayInfo,
  addExtensionsToContext,
  type ProgramInfo,
  type BufferInfo,
  type VertexArrayInfo,
  drawBufferInfo,
  setBuffersAndAttributes,
  setUniforms,
  createTexture,
} from 'twgl.js'
import WavefrontLoader from './WavefrontLoader'

/** An object saved to the rendering list */
type GlObjectDescriptor =
  // Normal object
  | {
      kind: 'mesh'
      name?: string
      uniforms?: Record<string, any>
      programInfo: ProgramInfo
      bufferInfo: BufferInfo
      world: m4.Mat4
      transparent?: boolean
      premulAlpha?: boolean
    }
  // Instanced object
  | {
      kind: 'instanced'
      name?: string
      programInfo: ProgramInfo
      bufferInfo: BufferInfo
      vertexArrayInfo: VertexArrayInfo
      instanceCount: number
      transparent?: boolean
      premulAlpha?: boolean
    }

/**
 * A simple scene that renders a scrolling terrain to display in the landing section.
 */
export default class HeroScene extends Scene {
  /** A list of objects to render next frame */
  private objects: GlObjectDescriptor[] = []
  /** The color used to clear the canvas before drawing */
  private backgroundColor: v3.Vec3 = [1, 1, 1]
  /** The direction the global "sun" light is pointing */
  private lightDirection = v3.normalize(v3.create(0.5, -0.2, 1))
  /** The 'lit' color of the terrain material */
  private lightColor: v3.Vec3 = [1, 1, 1]
  /** The 'unlit' color of the terrain material */
  private shadowColor: v3.Vec3 = [0, 0, 0]
  /** The "amount" of dark mode in the range 0..1. Used for smoothly transitioning */
  private transitionT = 0
  /** Whether or not the drawInstanced test passed */
  private instancingAvailable = true
  /** The total elapsed time of the scene */
  private time = 0

  /**
   * Pre-allocated storage for 4x4 matrices used at render time.
   *
   * Re-using them prevents a lot of frame by frame allocations and eventual garbage collection events.
   */
  private matrices = {
    projection: m4.create(),
    view: m4.create(),
    camera: m4.create(),
    viewProjection: m4.create(),
    worldViewProjection: m4.create(),
  }

  /** Sets up the rendering context and initializes the scene. */
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
    this.createSun()
    this.createMoon()
  }

  /** Loads the terrain visual from a model file. */
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
      name: 'terrain0',
      programInfo: terrainShader,
      bufferInfo: createBufferInfoFromArrays(gl, data),
      world: m4.identity(),
    }
    const terrain2: GlObjectDescriptor = {
      kind: 'mesh',
      name: 'terrain1',
      programInfo: terrainShader,
      bufferInfo: createBufferInfoFromArrays(gl, data),
      world: m4.translation([0, 0, 11.7]),
    }

    this.objects.push(terrain1)
    this.objects.push(terrain2)
  }

  /** Creates the stars in the background as an instanced array. */
  protected async createStars() {
    const gl = this.ctx

    // Load the shader
    const starShader = createProgramInfo(gl, [
      (await import('./shaders/star.vs.glsl')).default,
      (await import('./shaders/star.fs.glsl')).default,
    ])

    // Set some constants that will be used to create the stars
    const instanceCount = 200
    const instanceWorlds = new Float32Array(16 * instanceCount)
    const spread = [25, 20]
    const scale = [0.1, 0.33]

    /** A small helper function that returns a random numnber in a range */
    const rand = (min: number, max: number) => Math.random() * (max - min) + min

    for (let i = 0; i < instanceCount; i++) {
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

    // Create a buffer from generated vertex info (position, normal, texcoord)
    // and the the instance-based transformation matrices
    const bufferInfo = createBufferInfoFromArrays(gl, {
      ...primitives.createXYQuadVertices(1),
      instanceWorld: {
        numComponents: 16,
        data: instanceWorlds,
        divisor: 1,
      },
    })

    // Add the star cluster to the render list
    this.objects.push({
      kind: 'instanced',
      programInfo: starShader,
      bufferInfo,
      vertexArrayInfo: createVertexArrayInfo(gl, starShader, bufferInfo),
      instanceCount,
      transparent: true,
    })
  }

  /** Creates the "sun" visual in the background */
  protected async createSun() {
    const gl = this.ctx

    // Load the shader
    const sunShader = createProgramInfo(gl, [
      (await import('./shaders/sun.vs.glsl')).default,
      (await import('./shaders/sun.fs.glsl')).default,
    ])

    // Create the sun
    const bufferInfo = primitives.createXYQuadBufferInfo(gl, 2.8)

    // Load the texture from the server
    const texture = createTexture(gl, {
      src: '/sun.svg',
    })

    // Create three copies, we'll animate them later to give it a bit more character
    for (let i = 0; i < 3; i++) {
      // Create a unique matrix for each instance using the same data
      const world = m4.translation([-1.2, 3.2, 14])

      // Rotate it to face the camera
      m4.rotateY(world, Math.PI, world)

      // Add it to the render list
      this.objects.push({
        kind: 'mesh',
        name: 'sun' + i,
        transparent: true,
        premulAlpha: true,
        programInfo: sunShader,
        uniforms: {
          texture,
        },
        bufferInfo,
        world,
      })
    }
  }

  /** Creates the moon shape in the background */
  protected async createMoon() {
    const gl = this.ctx

    // Load the shader
    const moonShader = createProgramInfo(gl, [
      (await import('./shaders/sun.vs.glsl')).default,
      (await import('./shaders/sun.fs.glsl')).default,
    ])

    // Create the moon
    const bufferInfo = primitives.createXYQuadBufferInfo(gl, 1.5)

    // Load the texture from the server
    const texture = createTexture(gl, {
      src: '/moon.svg',
    })

    // Set the world position matrix for the moon
    const world = m4.translation([-1.2, 3.2, 14])

    // Rotate it to face the camera
    m4.rotateX(world, Math.PI, world)

    // Add it to the render list
    this.objects.push({
      kind: 'mesh',
      name: 'moon',
      transparent: true,
      premulAlpha: true,
      programInfo: moonShader,
      uniforms: {
        texture,
      },
      bufferInfo,
      world,
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

  /** Runs all time-based logic for this scene before rendering */
  protected update(delta: number) {
    const darkMode = document.documentElement.classList.contains('dark-theme')
    const amount = delta / 0.2 // Speed up delta seconds so that 1.0 units takes 0.2s

    if (darkMode) {
      // If dark mode is active, move toward 1.0
      if (this.transitionT < 1) {
        this.transitionT = Math.min(1, this.transitionT + amount)
      }
    } else {
      // If dark mode is not active, move toward 0.0
      if (this.transitionT > 0) {
        this.transitionT = Math.max(0, this.transitionT - amount)
      }
    }

    // Transition all colors values in place based on the time value
    v3.lerp([0.7, 0.8, 1.0], [0.03, 0.03, 0.1], this.transitionT, this.backgroundColor)
    v3.lerp([0.1, 0.3, 0.14], [0.01, 0.03, 0.1], this.transitionT, this.shadowColor)
    v3.lerp([0.6, 0.87, 0.6], [0.05, 0.14, 0.05], this.transitionT, this.lightColor)

    // Update the state of all objects
    for (const object of this.objects) {
      if (object.kind !== 'mesh') {
        continue
      }

      // If the object is a terrain, perform scrolling logic
      if (object.name === 'terrain0' || object.name === 'terrain1') {
        // Move the terrain toward the camera
        m4.translate(object.world, [0, 0, -delta * 3], object.world)

        // Wrap the terrain around if it moves too far
        const z = m4.getTranslation(object.world)[2]
        if (z <= -11.7) {
          m4.translate(object.world, [0, 0, 23.4], object.world)
        }
      }

      // If the object is the sun or moon, update it
      if (object.name?.startsWith('sun') || object.name === 'moon') {
        // Give it a little bob for fun
        m4.setTranslation(
          object.world,
          [-1.2, 3.2 + Math.sin(this.time * 0.75) * 0.25, 14],
          object.world,
        )

        // Perform rotation logic separately for each one
        if (object.name === 'sun0') {
          m4.rotateZ(object.world, delta * 0.18, object.world)
        }
        if (object.name === 'sun1') {
          m4.rotateZ(object.world, delta * 0.05, object.world)
        }
        if (object.name === 'sun2') {
          m4.rotateZ(object.world, delta * 0.1, object.world)
        }
      }

      // For the moon, we'll invert the dark mode value to be able to re-use the shader
      if (object.name === 'moon') {
        object.uniforms.darkModeValue = 1 - this.transitionT
      }
    }
  }

  protected render() {
    const gl = this.ctx

    // Time update
    const now = performance.now()
    const delta = (now - this.last) / 1000
    this.time = performance.now() / 1000
    this.last = now

    // Run the logic update function
    this.update(delta)

    // Reset the canvas
    gl.clearColor(...(this.backgroundColor as [number, number, number]), 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    // Enable basic features
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)

    // Calculate all global data
    const viewProjection = this.calculateViewProjectionMatrix()

    // Draw everything
    let lastObject: GlObjectDescriptor | null = null
    for (const object of this.objects) {
      if (object.transparent) {
        gl.enable(gl.BLEND)
        gl.disable(gl.DEPTH_TEST)

        // Choose a blend func based on transparency type
        if (object.premulAlpha) {
          gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
        } else {
          gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
        }
      } else {
        gl.disable(gl.BLEND)
        gl.enable(gl.DEPTH_TEST)
      }

      const uniforms = {
        time: this.time,
        resolution: [this.canvas.width, this.canvas.height],
        viewProjection,
        lightDirection: this.lightDirection,
        lightColor: this.lightColor,
        shadowColor: this.shadowColor,
        backgroundColor: this.backgroundColor,
        darkModeValue: this.transitionT,
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
          ;(gl as any).bindVertexArray(null)
        }

        setBuffersAndAttributes(gl, object.programInfo, object.bufferInfo)
      }

      if (object.kind === 'mesh') {
        // Use pre-allocated memory to calculate a complete transformation matrix
        m4.multiply(viewProjection, object.world, this.matrices.worldViewProjection)

        // Set all uniforms including the optional ones for this type
        setUniforms(object.programInfo, {
          ...uniforms,
          ...object.uniforms,
          world: object.world,
          worldViewProjection: this.matrices.worldViewProjection,
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

  /*
   * Calculates the view projection matrix for the scene. This includes the
   * location of the camera and its perspective to the scne.
   *
   * All of these operations are performed on pre-allocated arrays to avoid
   * unneccesary garbage collection events
   */
  private calculateViewProjectionMatrix() {
    const vPos = document.documentElement.scrollTop / window.innerHeight

    // Create a perspective camera matrix, meaning objects further from the
    // eye are transformed more
    m4.perspective(
      (30 * Math.PI) / 180, // 30 degree FOV
      this.canvas.width / this.canvas.height, // width/height aspect ratio
      0.1, // near plane
      100, // far plane
      this.matrices.projection,
    )

    // Create a camera matrix that looks at the center of the scene from a
    // position relative to the vertical scroll
    m4.lookAt([0, 2.2 - vPos * 2, -8], [0, 1 + vPos, 0], [0, 1, 0], this.matrices.camera)

    // Create a view matrix that transforms the camera space to clip space
    m4.inverse(this.matrices.camera, this.matrices.view)

    // Create a view projection matrix that combines the view and projection
    // matrices. This is used to transform vertices from view space to clip space
    m4.multiply(this.matrices.projection, this.matrices.view, this.matrices.viewProjection)

    return this.matrices.viewProjection
  }
}

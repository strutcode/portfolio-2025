import {
  addExtensionsToContext,
  createBufferInfoFromArrays,
  createProgramInfo,
  createVertexArrayInfo,
  drawBufferInfo,
  m4,
  primitives,
  setBuffersAndAttributes,
  setUniforms,
  v3,
} from 'twgl.js'

import Scene from '../../Scene'

// Shaders -- using ?raw to import as string and avoid syntax errors
import vs from './particle.vs.glsl?raw'
import fs from './particle.fs.glsl?raw'

import points from './ship.json'
import OrbitCamera from '../../OrbitCamera'

/** A fancy sparkling shimmery effect for the home page */
export default class HomeScene extends Scene {
  public camera: OrbitCamera

  private particles = 10000
  private shape = new Float32Array(points)
  // private shape = new Float32Array(new TextEncoder().encode(points).buffer, 0, this.particles * 3)
  private data: Record<any, any> = {}
  private totalTime = 0

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas)

    this.camera = new OrbitCamera(canvas)

    // Load required WebGL extensions on start
    addExtensionsToContext(this.getContext())

    this.createParticles()

    this.camera.target = [0, 0, 4]
    this.camera.distance = 34.5
  }

  public dispose() {
    super.dispose()
  }

  /** Creates the particles used in the animation */
  public createParticles() {
    const gl = this.getContext()

    /** The total number of particles */
    const numInstances = this.particles
    /** The position of each particle */
    const instancePositions = new Float32Array(numInstances * 3) // 3 components per particle
    /** The rotation of each particle around its axis */
    const instanceRotations = new Float32Array(numInstances)
    /** Get a random float between `x` and `y` */
    const randfRange = (x: number, y: number) => x + Math.random() * (y - x)
    /** The spread range of particles on initial spawn */
    const range = 20

    for (let i = 0; i < numInstances; ++i) {
      // Extract the world matrix of the current particle as a buffer view
      const pos = new Float32Array(instancePositions.buffer, i * 3 * 4, 3)

      // Randomize the position and rotation of the particle
      pos[0] = randfRange(-range, range)
      pos[1] = randfRange(-range, range)
      pos[2] = randfRange(0, range)
      instanceRotations[i] = randfRange(0, Math.PI * 2)
    }

    // Create the vertex arrays for the particles
    const arrays = primitives.createCubeVertices(0.05)

    // Add the instance world matrix as an attribute
    Object.assign(arrays, {
      instancePosition: {
        numComponents: 3,
        data: instancePositions,
        divisor: 1,
      },
      instanceRotation: {
        numComponents: 1,
        data: instanceRotations,
        divisor: 1,
      },
    })

    // Create the program and buffer info
    const programInfo = createProgramInfo(gl, [vs, fs])
    const bufferInfo = createBufferInfoFromArrays(gl, arrays)
    const vertexArrayInfo = createVertexArrayInfo(gl, programInfo, bufferInfo)

    // Save the data for use in the render loop
    this.data = {
      programInfo,
      bufferInfo,
      vertexArrayInfo,
      instancePositions,
      instanceRotations,
    }
  }

  /** Called by the base Scene class on render */
  public animate(deltaSeconds: number) {
    this.totalTime += deltaSeconds
    this.updateCamera(deltaSeconds)
    this.updateParticles(deltaSeconds)
    this.renderParticles()
  }

  public updateCamera(deltaSeconds: number) {
    this.camera.azimuth += deltaSeconds * 0.1
    this.camera.altitude = Math.sin(this.totalTime * 0.1)
  }

  private updateParticles(deltaSeconds: number) {
    const gl = this.getContext()
    const { instancePositions, instanceRotations } = this.data
    const diff = [0, 0, 0]

    // Iterate every particle and rotate it slightly
    for (let i = 0; i < this.particles; ++i) {
      const pos = new Float32Array(instancePositions.buffer, i * 3 * 4, 3)
      const target = new Float32Array(this.shape.buffer, i * 3 * 4, 3)

      // Get the relative distance to the target location
      v3.subtract(target, pos, diff)

      // Scale the delta movement by the frame rate
      diff[0] *= deltaSeconds * 4
      diff[1] *= deltaSeconds * 4
      diff[2] *= deltaSeconds * 4

      // Move the particle towards the target
      v3.add(pos, diff, pos)

      // Rotate the particle
      instanceRotations[i] += deltaSeconds * 8 * Math.random()
    }

    // Update the buffer with the new positions
    gl.bindBuffer(gl.ARRAY_BUFFER, this.data.bufferInfo.attribs.instancePosition.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, instancePositions)

    // Update the buffer for rotations
    gl.bindBuffer(gl.ARRAY_BUFFER, this.data.bufferInfo.attribs.instanceRotation.buffer)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, instanceRotations)
  }

  private renderParticles() {
    // Sets up the context -- the uniforms and buffer info used for rendering and the original world matrix attribute array
    const gl = this.getContext()
    const { programInfo, vertexArrayInfo } = this.data
    const uniforms = {
      view: this.camera.view,
      viewProjection: this.camera.viewProjection,
    }

    // Activate the shaders
    gl.useProgram(programInfo.program)

    // Set the buffers and attributes
    setBuffersAndAttributes(gl, programInfo, vertexArrayInfo)

    // Update the uniforms
    setUniforms(programInfo, uniforms)

    // Draw the entire instance buffer
    drawBufferInfo(
      gl,
      vertexArrayInfo,
      gl.TRIANGLES,
      vertexArrayInfo.numelements,
      0,
      this.particles,
    )
  }
}

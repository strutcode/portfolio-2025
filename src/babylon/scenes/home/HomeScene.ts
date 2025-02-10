import {
  AppendSceneAsync,
  ArcRotateCamera,
  Color4,
  Engine,
  HemisphericLight,
  ParticleSystem,
  RawTexture,
  Scene,
  Texture,
  Vector3,
} from '@babylonjs/core'
import { CustomMaterial } from '@babylonjs/materials'
import '@babylonjs/loaders/glTF'

import flare from '@/assets/textures/flare.png'

export default class HomeScene {
  private scene: Scene

  public constructor(canvas: HTMLCanvasElement) {
    const engine = new Engine(canvas)
    const scene = new Scene(engine)

    // Set a themed background color
    scene.clearColor = new Color4(13 / 255, 17 / 255, 28 / 255, 1)

    // Create a basic default lighting
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

    // Create a basic default camera
    const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 8, Vector3.Zero(), scene)

    // Attach the camera to the canvas
    camera.attachControl(canvas, true)

    // this.createParticleSystem(scene)

    // Load the gltf file
    AppendSceneAsync('/models/flower.glb', scene).then(() => {
      const flower = scene.getMeshByName('Flower')
      const deg2rad = Math.PI / 180

      if (flower) {
        flower.rotation = new Vector3(-117 * deg2rad, 0, 180 * deg2rad)

        flower.material = this.createCustomMaterial(scene)

        camera.setTarget(new Vector3(0, 1, 0))
      }
    })
    this.scene = scene

    // Run the engine
    engine.runRenderLoop(() => {
      scene.render()

      const flower = scene.getMeshByName('Flower')
      if (flower) {
        // flower.rotation.y += 0.0002 * engine.getDeltaTime()
        flower.rotateAround(
          flower.getBoundingInfo().boundingBox.centerWorld,
          flower.up,
          0.0001 * engine.getDeltaTime(),
        )
      }
    })
  }

  public dispose(): void {
    this.scene.dispose()
  }

  private createNoiseTexture(scene: Scene) {
    const buffer = new Uint8Array(256 * 256 * 4)

    for (let i = 0; i < buffer.length; i += 4) {
      buffer[i] = Math.random() * 160 + 95
      buffer[i + 1] = Math.random() * 160 + 95
      buffer[i + 2] = Math.random() * 160 + 95
      buffer[i + 3] = 100
    }

    const tex = new RawTexture(buffer, 256, 256, Engine.TEXTUREFORMAT_RGBA, scene, true, false)
    tex.wrapU = Texture.WRAP_ADDRESSMODE
    tex.wrapV = Texture.WRAP_ADDRESSMODE
    tex.hasAlpha = true

    return tex
  }

  private createCustomMaterial(scene: Scene) {
    const mat = new CustomMaterial('custom', scene)

    // Set the base texture used for reflection
    mat.diffuseTexture = this.createNoiseTexture(scene)

    // Define a varying to transfer the normal from vertex to fragment shader
    mat.Vertex_Definitions('varying vec3 vNormal;')
    mat.Fragment_Definitions('varying vec3 vNormal;')

    // Set the world normal in the vertex shader
    mat.Vertex_MainEnd('vNormal = vec3(inverse(view * world) * vec4(normal, 0.0));')

    // Set the final color from a mapping of the world normal to texture space
    mat.Fragment_Custom_Diffuse('baseColor = texture2D(diffuseSampler, vNormal.xz * 0.03);')

    // Set transparency flags
    mat.alphaMode = Engine.ALPHA_COMBINE
    mat.useAlphaFromDiffuseTexture = true

    // Disable culling to prevent artifacts
    mat.backFaceCulling = false

    return mat
  }

  private createParticleSystem(scene: Scene) {
    // Load the particle system
    const particleSystem = new ParticleSystem('particles', 2000, scene)
    particleSystem.particleTexture = new Texture(flare, scene)
    particleSystem.emitter = new Vector3(0, 0, 0)
    particleSystem.minEmitBox = new Vector3(-1, 0, -1)
    particleSystem.maxEmitBox = new Vector3(1, 0, 1)
    particleSystem.color1 = new Color4(1, 0, 0, 1)
    particleSystem.color2 = new Color4(0, 1, 1, 1)
    particleSystem.colorDead = new Color4(0, 0, 0, 0.0)
    particleSystem.minSize = 0.1
    particleSystem.maxSize = 0.5
    particleSystem.minLifeTime = 0.3
    particleSystem.maxLifeTime = 1.5
    particleSystem.emitRate = 1500
    particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE
    particleSystem.gravity = new Vector3(0, -9.81, 0)
    particleSystem.direction1 = new Vector3(-7, 8, 3)
    particleSystem.direction2 = new Vector3(7, 8, -3)
    particleSystem.minAngularSpeed = 0
    particleSystem.maxAngularSpeed = Math.PI
    particleSystem.minEmitPower = 1
    particleSystem.maxEmitPower = 3
    particleSystem.updateSpeed = 0.005

    // Start the particle system
    particleSystem.start()
  }
}

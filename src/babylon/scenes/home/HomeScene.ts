import {
  AppendSceneAsync,
  ArcRotateCamera,
  Color4,
  Engine,
  HemisphericLight,
  LoadSceneAsync,
  ParticleSystem,
  Scene,
  SceneLoader,
  ShaderMaterial,
  StandardMaterial,
  Texture,
  Vector3,
} from '@babylonjs/core'
import '@babylonjs/loaders/glTF'
// import '@babylonjs/serializers/glTF'
import { Inspector } from '@babylonjs/inspector'

import flare from '@/assets/textures/flare.png'
import { CustomMaterial } from '@babylonjs/materials'

export default class HomeScene {
  private scene: Scene

  public constructor(canvas: HTMLCanvasElement) {
    const engine = new Engine(canvas)
    const scene = new Scene(engine)

    // Create a basic default lighting
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

    // Create a basic default camera
    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      10,
      Vector3.Zero(),
      scene,
    )

    // Attach the camera to the canvas
    camera.attachControl(canvas, true)

    // this.createParticleSystem(scene)

    // Load the gltf file
    AppendSceneAsync('/models/flower.glb', scene).then(() => {
      const flower = scene.getMeshByName('Flower')
      const rad2deg = 180 / Math.PI

      if (flower) {
        console.log('Ready? Set up!')
        flower.rotation = new Vector3(-27 * rad2deg, 0, 0)

        const mat = new CustomMaterial('custom', scene)
        mat.AddAttribute('normal')
        mat.Vertex_Definitions('varying vec3 vNormal;')
        mat.Vertex_MainEnd('vNormal = vec3(vec4(normal, 0.0) * world * view);')
        mat.Fragment_Definitions('varying vec3 vNormal;')
        mat.Fragment_Custom_Diffuse('result = vNormal;')
        mat.backFaceCulling = false

        flower.material = mat

        camera.useFramingBehavior = true
        camera.setTarget(flower)
      }
    })
    this.scene = scene

    Inspector.Show(scene, {
      overlay: true,
      globalRoot: document.getElementById('inspector') as HTMLElement,
    })

    // Run the engine
    engine.runRenderLoop(() => {
      scene.render()

      const flower = scene.getMeshByName('Flower')
      if (flower) {
        flower.rotation.y += 0.0004 * engine.getDeltaTime()
      }
    })
  }

  public dispose(): void {
    this.scene.dispose()
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

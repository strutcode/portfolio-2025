import { Color4, Engine, LoadSceneAsync, PointLight, Scene } from '@babylonjs/core'
import '@babylonjs/loaders/glTF'
import { Inspector } from '@babylonjs/inspector'

import flare from '@/assets/textures/flare.png'

export default class HomeScene {
  private scene: Scene
  private useInspector = false

  public constructor(canvas: HTMLCanvasElement) {
    const engine = new Engine(canvas)

    // Load the gltf file
    ;(async () => {
      this.scene = await LoadSceneAsync('/models/meteor.glb', engine)

      const camera = this.scene.cameras[0]
      this.scene.activeCamera = camera
      this.scene.beginAnimation(camera.parent, 1, 1250, true)

      for (const mesh of this.scene.meshes) {
        if (mesh.animations.length > 0) {
          this.scene.beginAnimation(mesh, 1, 1250, true)
        }
      }

      for (const light of this.scene.lights) {
        if (light instanceof PointLight) {
          light.intensity **= 0.5
        }
      }

      // Set a themed background color
      this.scene.clearColor = new Color4(13 / 255, 17 / 255, 28 / 255, 1)

      if (this.useInspector) {
        Inspector.Show(this.scene, {
          globalRoot: document.getElementById('inspector')!,
          overlay: true,
        })
      }
    })()

    window.addEventListener('resize', () => {
      engine.resize()
    })

    // Run the engine
    engine.runRenderLoop(() => {
      if (this.scene) {
        if (this.scene.activeCamera) {
          this.scene.render()
        }
      }
    })
  }

  public dispose(): void {
    this.scene.dispose()
  }
}

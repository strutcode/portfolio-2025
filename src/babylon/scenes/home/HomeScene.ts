import {
  Color4,
  Engine,
  LoadSceneAsync,
  AppendSceneAsync,
  SceneLoaderFlags,
  PointLight,
  Scene,
} from '@babylonjs/core'
import '@babylonjs/loaders/glTF'
import { Inspector } from '@babylonjs/inspector'

import flare from '@/assets/textures/flare.png'

export default class HomeScene {
  private scene: Scene
  private useInspector = false

  public constructor(canvas: HTMLCanvasElement) {
    const engine = new Engine(canvas)
    const scene = new Scene(engine)
    this.scene = scene

    // Load the gltf file
    ;(async () => {
      if (!window.sceneBlob) {
        throw new Error('No scene blob found')
      }

      SceneLoaderFlags.ShowLoadingScreen = false
      await AppendSceneAsync(window.sceneBlob, scene, {
        pluginExtension: '.glb',
      })

      const camera = scene.cameras[0]
      scene.activeCamera = camera
      scene.beginAnimation(camera.parent, 1, 1250, true)

      for (const mesh of scene.meshes) {
        if (mesh.animations.length > 0) {
          scene.beginAnimation(mesh, 1, 1250, true)
        }
      }

      for (const light of scene.lights) {
        if (light instanceof PointLight) {
          light.intensity **= 0.5
        }
      }

      // Set a themed background color
      scene.clearColor = new Color4(13 / 255, 17 / 255, 28 / 255, 1)

      if (this.useInspector) {
        Inspector.Show(scene, {
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

import { Scene } from '@babylonjs/core/scene'
import { Engine } from '@babylonjs/core/Engines/engine'
import { Color4 } from '@babylonjs/core/Maths/math.color'
import { AppendSceneAsync } from '@babylonjs/core/Loading/sceneLoader'
import { SceneLoaderFlags } from '@babylonjs/core/Loading/sceneLoaderFlags'
import { PointLight } from '@babylonjs/core/Lights/pointLight'
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import '@babylonjs/loaders/glTF/2.0'

import flare from '@/assets/textures/flare.png'
import TimeStopPostProcess from './TimeStopPostProcess'
import { Animation } from '@babylonjs/core'

export default class HomeScene {
  /** The amount to move the camera with the mouse */
  public panAmount = 1
  /** Whether or not to initialize the Babylon inspector */
  public useInspector = false

  private engine: Engine
  private scene: Scene
  private mouse = { x: 0, y: 0 }
  private boundMousePosition = this.getMousePosition.bind(this)

  public constructor(private canvas: HTMLCanvasElement) {
    const engine = new Engine(canvas)
    const scene = new Scene(engine)
    const camera = new FreeCamera('MainCamera', Vector3.Zero(), scene)

    this.engine = engine
    this.scene = scene

    window.addEventListener('pointermove', this.boundMousePosition)

    const monitorUserInteraction = () => {
      camera.position.x = -this.panAmount + this.mouse.x * (2 * this.panAmount)
      camera.position.y = this.panAmount + this.mouse.y * -(2 * this.panAmount)

      camera.position.y -= (window.scrollY / window.innerHeight) * 10
    }

    // Load the gltf file from memory
    ;(async () => {
      if (!window.sceneBlob) {
        throw new Error('No scene blob found')
      }

      SceneLoaderFlags.ShowLoadingScreen = false
      await AppendSceneAsync(window.sceneBlob, scene, {
        pluginExtension: '.glb',
      })

      // Set up the camera
      scene.activeCamera = camera
      const baseCamera = scene.getCameraByName('Camera')
      if (baseCamera instanceof FreeCamera) {
        scene.beginAnimation(baseCamera.parent, 1, 1250, true)
        camera.parent = baseCamera.parent
        camera.position = baseCamera.position
        camera.rotation = baseCamera.rotation
        camera.fov = baseCamera.fov
        camera.ignoreParentScaling = true
      }

      // Start animations on all meshes
      for (const mesh of scene.meshes) {
        if (mesh.animations.length > 0) {
          scene.beginAnimation(mesh, 1, 1250, true)
        }
      }

      // Modulate light intensity ot better match Blender
      for (const light of scene.lights) {
        if (light instanceof PointLight) {
          light.intensity **= 0.5
          light.range **= 0.01
        }
      }

      // Set a themed background color
      scene.clearColor = new Color4(13 / 255, 17 / 255, 28 / 255, 1)

      // Set up post processing
      const postProcess = new TimeStopPostProcess(camera)

      // Animation the post process
      this.createBlurAnimation(postProcess)

      // Load the inspector if requested
      if (import.meta.env.MODE === 'development') {
        if (this.useInspector) {
          const { Inspector } = await import('@babylonjs/inspector')

          Inspector.Show(scene, {
            globalRoot: document.getElementById('inspector')!,
            overlay: true,
          })
        }
      }
    })()

    window.addEventListener('resize', () => {
      engine.resize()
    })

    // Run the engine
    engine.runRenderLoop(() => {
      monitorUserInteraction()

      if (this.scene?.activeCamera) this.scene.render()
    })
  }

  public dispose(): void {
    this.engine.stopRenderLoop()
    this.scene.dispose()
    window.removeEventListener('pointermove', this.boundMousePosition)
  }

  private getMousePosition(event: PointerEvent): void {
    this.mouse.x = event.clientX / window.innerWidth
    this.mouse.y = event.clientY / window.innerHeight
  }

  private createBlurAnimation(target: TimeStopPostProcess): void {
    // Create a blur animation
    const blurAnimation = new Animation(
      'blur',
      'intensity',
      30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT,
    )

    // Set the keyframes for the animation
    const keys = [
      { frame: 0, value: 0 },
      { frame: 30, value: 0 },
      { frame: 60, value: 0.3 },
      { frame: 500, value: 0.5 },
    ]

    blurAnimation.setKeys(keys)

    // Add the animation to the camera
    target.animations.push(blurAnimation)

    // Start the animation
    this.scene.beginAnimation(target, 0, 500, true)
  }
}

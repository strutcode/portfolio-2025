import { Scene } from '@babylonjs/core/scene'
import { Engine } from '@babylonjs/core/Engines/engine'
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color'
import { AppendSceneAsync } from '@babylonjs/core/Loading/sceneLoader'
import { SceneLoaderFlags } from '@babylonjs/core/Loading/sceneLoaderFlags'
import { PointLight } from '@babylonjs/core/Lights/pointLight'
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import '@babylonjs/loaders/glTF/2.0'

import flare from '@/assets/textures/flare.png'
import {
  CreatePlane,
  CreateSphere,
  Mesh,
  StandardMaterial,
  VolumetricLightScatteringPostProcess,
} from '@babylonjs/core'

export default class HomeScene {
  private engine: Engine
  private scene: Scene
  private useInspector = false
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
      const pan = 1
      camera.position.x = -pan + this.mouse.x * (2 * pan)
      camera.position.y = pan + this.mouse.y * -(2 * pan)

      camera.position.y -= (window.scrollY / window.innerHeight) * 10
    }

    // Load the gltf file
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
      if (baseCamera) {
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
      const { PassPostProcess, BlackAndWhitePostProcess, VolumetricLightScatteringPostProcess } =
        await import('@babylonjs/core/PostProcesses')
      // camera.attachPostProcess(new PassPostProcess('PassPostProcess', 1.0, camera))
      // camera.attachPostProcess(new BlackAndWhitePostProcess('bw', 1.0, camera))
      camera.attachPostProcess(this.createLightRayPostProcess(scene, camera))

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

  private createRayMesh() {
    var rad1 = CreatePlane('rad1', undefined, this.scene)
    // var rad1 = BABYLON.Mesh.CreateSphere("rad1", 8, 16, scene);
    // var rad1 = BABYLON.Mesh.CreateCylinder("rad1", 10, 5, 5, 8, 8, scene);
    rad1.visibility = 1

    const mat = new StandardMaterial('bmat', this.scene)
    // mat.diffuseColor = new Color3(0.0, 0.0, 0.0)
    mat.emissiveColor = new Color3(1.0, 0.0, 0.0)
    // mat.emissiveColor = new Color3(1.0, 1.0, 1.0)
    // mat.emissiveColor = new Color3(0.1, 0.0, 0.1)
    // mat.emissiveColor = new Color3(0.3, 0.1, 0.1)
    mat.backFaceCulling = false
    rad1.material = mat

    rad1.billboardMode = Mesh.BILLBOARDMODE_ALL

    // rad1.position = new BABYLON.Vector3(10, 5, 0);
    rad1.position = Vector3.Zero()
    rad1.scalingDeterminant *= 200

    return rad1
  }

  private createLightRayPostProcess(scene: Scene, camera: FreeCamera) {
    const vl = new VolumetricLightScatteringPostProcess('vl', 1.0, camera)
    vl.exposure = 0.5
    vl.decay = 0.96815
    vl.weight = 0.98767
    vl.density = 0.996
    const mat = vl.mesh.material as StandardMaterial
    mat.emissiveColor = new Color3(0.277, 0.066, 1.0)
    mat.specularColor = new Color3(0, 0, 0)
    mat.disableLighting = true
    mat.alpha = 0.1
    vl.mesh.billboardMode = Mesh.BILLBOARDMODE_ALL
    vl.mesh.position = new Vector3(8.269518852233887, 7.952142238616943, -6.513382434844971)
    vl.mesh.scalingDeterminant = 200

    return vl
  }
}

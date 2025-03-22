import * as THREE from 'three'
import lightDark from '@/util/lightDarkMode'
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer'
import { RenderPass } from 'three/addons/postprocessing/RenderPass'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass'
import { OutputPass } from 'three/addons/postprocessing/OutputPass'
import TimeStopShader from './TimeStopShader'
import Scene from '@/threejs/Scene'

export default class HomeScene extends Scene {
  public constructor(canvas: HTMLCanvasElement) {
    super()

    if (!window.sceneBlob) {
      throw new Error('Scene blob not found')
    }

    const renderer = this.setupRenderer(canvas)
    this.setupScene(window.sceneBlob, renderer)
    this.runRenderLoop()
  }

  private setupRenderer(canvas: HTMLCanvasElement) {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
    })

    // Set pixel ratio
    renderer.setPixelRatio(window.devicePixelRatio)

    // Set size
    const rect = canvas.getBoundingClientRect()
    renderer.setSize(rect.width, rect.height)

    // Set background to transparent
    renderer.setClearColor(0x000000, 0)

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.outputColorSpace = THREE.SRGBColorSpace

    this.onDispose(() => {
      renderer.dispose()
    })

    return renderer
  }

  private async setupScene(blobUrl: string, renderer: THREE.WebGLRenderer) {
    const scene = new THREE.Scene()

    this.onDispose(() => {
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          obj.material.dispose()
        }
      })

      scene.clear()
    })

    const loader = new GLTFLoader()
    const gltf = await new Promise<GLTF>((resolve, reject) => {
      loader.load(
        blobUrl,
        (gltf) => {
          resolve(gltf)
        },
        undefined,
        (error) => {
          reject(error)
        },
      )
    })

    scene.add(gltf.scene)

    const camera = gltf.cameras[0] as THREE.PerspectiveCamera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    this.initializeLightDarkToggle(scene)

    // Set up lights
    for (const obj of gltf.scene.children) {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }

      if (obj instanceof THREE.Light) {
        obj.castShadow = true
        obj.shadow.radius = 4
        obj.shadow.mapSize.width = 256
        obj.shadow.mapSize.height = 256
        obj.shadow.camera.near = 0.5
        obj.shadow.camera.far = 50
      }
    }

    // Update materials for the heat trail
    const trail = scene.getObjectByName('Trail')
    if (trail instanceof THREE.Mesh) {
      const trailMaterial = trail.material as THREE.MeshStandardMaterial
      trailMaterial.transparent = true
      trailMaterial.opacity = 0.1

      // Set the blend mode for raw alpha
      trailMaterial.blendSrc = THREE.SrcAlphaFactor
      trailMaterial.blendDst = THREE.OneMinusSrcAlphaFactor
      trailMaterial.blendEquation = THREE.AddEquation
    }

    // Start all animations
    const mixers: THREE.AnimationMixer[] = []
    gltf.animations.forEach((clip) => {
      const mixer = new THREE.AnimationMixer(gltf.scene)
      mixer.clipAction(clip).play()
      mixers.push(mixer)
    })

    // Set up post process
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new ShaderPass(TimeStopShader))
    composer.addPass(new OutputPass())

    this.onRender((delta) => {
      // Update animations
      for (const mixer of mixers) {
        mixer.update(delta)
      }

      // Run render pipeline
      composer.render(delta)
    })
  }

  private initializeLightDarkToggle(scene: THREE.Scene) {
    // Create a light to use for adjusting scene colors
    const ambient = new THREE.AmbientLight(0x404040, 1)
    scene.add(ambient)

    /** Alters the scene based on the current state of classes on the root element. */
    const applyLightDarkMode = () => {
      if (lightDark.isDarkMode) {
        ambient.intensity = 0
      } else {
        ambient.intensity = 1
      }
    }

    // Apply initial state
    applyLightDarkMode()

    // Observe changes to the light/dark mode
    const observer = lightDark.observe(() => {
      applyLightDarkMode()
    })

    // Clean up after ourselves
    this.onDispose(() => {
      observer.disconnect()
    })
  }

  private runRenderLoop() {
    let last = performance.now()
    let run = true

    this.onDispose(() => {
      run = false
    })

    const animate = () => {
      if (!run) return

      // Compute delta time
      const time = performance.now()
      const delta = (time - last) / 1000
      last = time

      this.render(delta)

      // Request next frame
      requestAnimationFrame(animate)
    }

    animate()
  }
}

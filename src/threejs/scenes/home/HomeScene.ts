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
    this.setup(canvas)
  }

  private async setup(canvas: HTMLCanvasElement) {
    if (!window.sceneBlob) {
      throw new Error('Scene blob not found')
    }

    const renderer = this.setupRenderer(canvas)

    // Wait for the scene to load before starting to render
    await this.setupScene(window.sceneBlob, renderer)

    this.runRenderLoop()
  }

  private setupRenderer(canvas: HTMLCanvasElement) {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
    })

    // Set pixel ratio
    renderer.setPixelRatio(window.devicePixelRatio)

    // Set background to transparent
    renderer.setClearColor(0x000000, 0)

    // Set up shadow mapping
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // Set tone map for the scene
    renderer.toneMapping = THREE.CineonToneMapping
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

    this.initializeViewport(camera, renderer)
    this.initializeLightDarkToggle(scene)
    this.initializeLighting(scene)
    this.initializeEffects(scene)

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

  private initializeViewport(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    const resizeViewport = () => {
      // Set size
      const canvas = renderer.domElement
      if (canvas instanceof HTMLCanvasElement) {
        // Remove any styles previously set by Three.js
        canvas.removeAttribute('style')
        canvas.removeAttribute('width')
        canvas.removeAttribute('height')

        const rect = canvas.getBoundingClientRect()
        renderer.setSize(rect.width, rect.height)
      }

      // Set up camera
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }

    // Initialize Viewport
    resizeViewport()

    // Handle resizing
    window.addEventListener('resize', () => {
      resizeViewport()
    })
  }

  private initializeLighting(scene: THREE.Scene) {
    // Set up lights
    for (const obj of scene.children[0].children) {
      if (obj instanceof THREE.Mesh) {
        if (obj.name !== 'Trail' && obj.name !== 'Ground') {
          obj.castShadow = true
        }
        obj.receiveShadow = true
      }

      if (obj instanceof THREE.Light) {
        obj.castShadow = true
        obj.shadow.radius = 4
        obj.shadow.mapSize.width = 512
        obj.shadow.mapSize.height = 512
        obj.shadow.camera.near = 0.5
        obj.shadow.camera.far = 50
      }
    }
  }

  private initializeEffects(scene: THREE.Scene) {
    // Update materials for the heat trail
    const trail = scene.getObjectByName('Trail')
    if (trail instanceof THREE.Mesh) {
      // console.log(trail)
      const trailMaterial = trail.material as THREE.MeshStandardMaterial
      trailMaterial.opacity = 0.1
    }
  }

  private initializeLightDarkToggle(scene: THREE.Scene) {
    /** Alters the scene based on the current state of classes on the root element. */
    const applyLightDarkMode = () => {
      for (const obj of scene.children[0].children) {
        if (obj instanceof THREE.Mesh) {
          if (obj.name === 'Trail') {
            continue
          }

          const material = obj.material as THREE.MeshStandardMaterial

          if (lightDark.isDarkMode) {
            material.emissiveIntensity = 0
            material.emissive = new THREE.Color(0xbff4ff)
          } else {
            material.emissiveIntensity = 0.1
            material.emissive = new THREE.Color(0xbff4ff)
          }
        }
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

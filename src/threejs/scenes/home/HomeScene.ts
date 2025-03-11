import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer'
import { RenderPass } from 'three/addons/postprocessing/RenderPass'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass'
import { OutputPass } from 'three/addons/postprocessing/OutputPass'
import TimeStopShader from './TimeStopShader'

export default class HomeScene {
  public scene: THREE.Scene
  public camera: THREE.PerspectiveCamera
  public renderer: THREE.WebGLRenderer

  public constructor(private canvas: HTMLCanvasElement) {
    const scene = (this.scene = new THREE.Scene())
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const renderer = (this.renderer = new THREE.WebGLRenderer({
      context: canvas.getContext('webgl2')!,
      antialias: false,
    }))

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.outputColorSpace = THREE.SRGBColorSpace
    document.body.appendChild(renderer.domElement)

    const loader = new GLTFLoader()
    loader.load(
      window.sceneBlob!,
      (gltf) => {
        scene.add(gltf.scene)

        this.camera = gltf.cameras[0] as THREE.PerspectiveCamera
        this.camera.aspect = canvas.width / canvas.height
        this.camera.updateProjectionMatrix()

        // Set up lights
        for (const obj of gltf.scene.children) {
          if (obj instanceof THREE.Mesh) {
            obj.castShadow = true
            obj.receiveShadow = true
          }

          if (obj instanceof THREE.Light) {
            obj.castShadow = true
            obj.shadow.radius = 4
            obj.shadow.mapSize.width = 128
            obj.shadow.mapSize.height = 128
            obj.shadow.camera.near = 0.5
            obj.shadow.camera.far = 50
            obj.intensity **= 0.75
            obj.decay **= 1.5
          }
        }

        // Start all animations
        const mixers = []
        gltf.animations.forEach((clip) => {
          const mixer = new THREE.AnimationMixer(gltf.scene)
          mixer.clipAction(clip).play()
          mixers.push(mixer)
        })

        // Set up post process
        const composer = new EffectComposer(renderer)
        composer.addPass(new RenderPass(scene, this.camera))
        composer.addPass(new ShaderPass(TimeStopShader))
        composer.addPass(new OutputPass())

        let last = performance.now()
        const animate = () => {
          // Compute delta time
          const time = performance.now()
          const delta = (time - last) / 1000
          last = time

          // Update animations
          for (const mixer of mixers) {
            mixer.update(delta)
          }

          // Run render pipeline
          composer.render(delta)

          // Request next frame
          requestAnimationFrame(animate)
        }

        animate()
      },
      undefined,
      (error) => {
        console.error(error)
      },
    )
  }

  public dispose() {
    this.renderer.dispose()
    this.scene.clear()
  }
}

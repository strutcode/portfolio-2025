import { Camera } from '@babylonjs/core/Cameras/camera'
import { Effect } from '@babylonjs/core/Materials/effect'
import { PostProcess } from '@babylonjs/core/PostProcesses/postProcess'
import { Texture } from '@babylonjs/core/Materials/Textures/texture'

import fragmentShader from './timeStop.fs.glsl'

// Initialize the shader by placing it in the effect store for compilation on the fly
Effect.ShadersStore['timestopFragmentShader'] = fragmentShader

/** A radial blur effect using the frame buffer. */
export default class TimeStopPostProcess extends PostProcess {
  constructor(camera: Camera) {
    // Initialize the base PostProcess
    super(
      // Name
      'TimeStop',
      // Use the shader from above
      'timestop',
      // Set uniforms
      ['amount', 'steps', 'stepSize'],
      // No samplers
      null,
      // Set the resolution to 50% of the original
      0.5,
      // Pass the camera
      camera,
      // Use bilinear sampling for smoother blur
      Texture.BILINEAR_SAMPLINGMODE,
    )

    // Called every frame to set the uniforms
    this.onApply = (effect: Effect) => {
      effect.setFloat('amount', 0.5)
      effect.setInt('steps', 20)
      effect.setFloat('stepSize', 0.03)
    }
  }
}

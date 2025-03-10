import { Camera } from '@babylonjs/core/Cameras/camera'
import { Effect } from '@babylonjs/core/Materials/effect'
import { PostProcess } from '@babylonjs/core/PostProcesses/postProcess'
import { Texture } from '@babylonjs/core/Materials/Textures/texture'

import fragmentShader from './timeStop.fs.glsl'

// Initialize the shader by placing it in the effect store for compilation on the fly
Effect.ShadersStore['timestopFragmentShader'] = fragmentShader

/** A radial blur effect using the frame buffer. */
export default class TimeStopPostProcess extends PostProcess {
  /** The blend amount between the original frame and the effect. */
  public intensity = 0.5
  /** The number of steps to take in the blur; affects performance. */
  public steps = 20
  /** The size of the texel step, this dictates the size and inversely the smoothness of the blur. */
  public stepSize = 0.03

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
      effect.setFloat('amount', this.intensity)
      effect.setInt('steps', this.steps)
      effect.setFloat('stepSize', this.stepSize)
    }
  }
}

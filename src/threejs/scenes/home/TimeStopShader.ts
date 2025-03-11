import vertexShader from './timeStop.vs.glsl'
import fragmentShader from './timeStop.fs.glsl'

/** A radial blur effect using the frame buffer. */
export default {
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: 0.5 },
    steps: { value: 15 },
    stepSize: { value: 0.03 },
  },
  vertexShader,
  fragmentShader,
}

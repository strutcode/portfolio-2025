import vertexShader from './timeStop.vs.glsl'
import fragmentShader from './timeStop.fs.glsl'

/** A radial blur effect using the frame buffer. */
export default {
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: 0.5 },
    steps: { value: 10 },
    stepSize: { value: 0.02 },
  },
  vertexShader,
  fragmentShader,
}

import Camera from './Camera'

export default class OrbitCamera extends Camera {
  /** Horizontal angle in degrees */
  public azimuth = 0
  /** Vertical angle in degrees */
  public altitude = 0
  /** Distance from the target in meters */
  public distance = 10

  public render(gl: WebGLRenderingContext) {
    this.position = [
      this.target[0] + this.distance * Math.cos(this.altitude) * Math.sin(this.azimuth),
      this.target[1] + this.distance * Math.cos(this.altitude) * Math.cos(this.azimuth),
      this.target[2] + this.distance * Math.sin(this.altitude),
    ]

    super.render(gl)
  }
}

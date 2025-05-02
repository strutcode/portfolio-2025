const float sensorSize = 0.025;

/** Creates a ray based on a screen coordinate */
Ray camera_ray(vec2 uv, vec2 size) {
  /*
  * Since we're essentially calculating a unit sphere, we'll use radian angles
  * from the center of the screen ranging from negative half the field of view
  * to positive half of the field of view.
  */

  float ratio = size.x / size.y;

  // Typical images are wider than they are tall, so base the FoV on the size.x
  float hFieldOfView = fovRange;
  float vFieldOfView = fovRange * (size.y / size.x);

  // Get the radians from center for the x and y screen coordinates
  float xComp = (uv.x - 0.5) * hFieldOfView;
  float yComp = (uv.y - 0.5) * vFieldOfView;

  // Calculate a directional vector
  // Z is implicitly proportional to the other two
  vec3 direction = vec3(sin(xComp) * cos(yComp), sin(yComp), cos(xComp) * cos(yComp));

  Ray ray;
  ray.origin = vec3((uv - vec2(0.5)) * sensorSize * ratio, 0.0);
  ray.direction = direction;

  return ray;
}
vec3 cast_ray(Ray ray) {
  // Define the sphere center and radius
  vec3 sphereCenter = vec3(0.0, 0.0, 10.0);
  float sphereRadius = 0.4;

  RayHit hit;

  // Check for intersection with the sphere
  if (intersect_sphere(sphereCenter, sphereRadius, ray, hit)) {
    return vec3(1.0, 1.0, 1.0);
  } else {
    return vec3(0.0, 0.0, 0.0);
  }
}
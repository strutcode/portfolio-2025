vec3 cast_ray(Ray ray) {
  // Define the sphere center and radius
  vec3 sphereCenter = vec3(0.0, 0.0, 10.0);
  float sphereRadius = 1.0;

  RayHit hit;

  // Check for intersection with the sphere
  if (intersect_sphere(sphereCenter, sphereRadius, ray, hit)) {
    Ray newRay;
    newRay.origin = hit.point;
    newRay.direction = hit.normal;

    PointLight light;
    light.position = vec3(5.0, 5.0, 0.0);
    light.color = vec3(1.0, 1.0, 1.0);
    light.intensity = 100.0;
    light.size = 0.5;

    return point_light_contribution(light, newRay);
  } else {
    return vec3(0.0, 0.0, 0.0);
  }
}
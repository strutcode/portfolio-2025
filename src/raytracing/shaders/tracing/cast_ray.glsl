vec3 cast_ray(Ray ray, out Ray next) {
  // Define a sphere in the scene
  Sphere sphere;
  sphere.position = vec3(0.0, 0.0, 10.0);
  sphere.color = vec3(1.0, 1.0, 1.0);
  sphere.radius = 1.0;

  // Define a light source
  PointLight light;
  light.position = vec3(5.0, 5.0, 0.0);
  light.color = vec3(1.0, 1.0, 1.0);
  light.intensity = 100.0;
  light.size = 0.5;

  RayHit hit;

  // Check for intersection with the sphere
  if (intersect_sphere(sphere, ray, hit)) {
    next.origin = hit.point;
    next.direction = reflect(ray.direction, hit.normal);

    return sphere.color;
  } else {
    // Sample the background if the ray missed
    float lat = acos(ray.direction.y);
    float lon = atan(ray.direction.x, ray.direction.z);

    vec2 uv = vec2(lon / (2.0 * PI) + 0.5, lat / PI);

    next.origin = vec3(0.0);
    next.direction = vec3(0.0);

    return texture2D(background, uv).rgb;
  }
}
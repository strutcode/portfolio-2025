RayHit raycast(Ray ray) {
  // Define a sphere in the scene
  Sphere sphere;
  sphere.position = vec3(0.0, 0.0, 10.0);
  sphere.color = vec3(1.0, 1.0, 1.0);
  sphere.radius = 1.0;
  sphere.roughness = 1.0;

  RayHit hit;

  // Check for intersection with the sphere
  if (intersect_sphere(sphere, ray, hit)) {
    hit.type = RAY_TYPE_DIFFUSE;
    hit.color = sphere.color;
    hit.roughness = sphere.roughness;
    hit.distance = length(hit.point - ray.origin);
    hit.reflect = reflect(ray.direction, hit.normal);

    return hit;
  } else {
    hit.type = RAY_TYPE_ENVIRONMENT;
    hit.reflect = ray.direction;

    return hit;
  }
}
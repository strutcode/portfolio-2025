/**
 * The main function for raycasting in the scene. This function is responsible
 * primarily for intersection queries using signed distance functions (SDFs).
 *
 * It will return a RayHit object that contains information about the intersection
 * such as the normal, distance, and color of the hit object.
 */
RayHit raycast(Ray ray) {
  // Define a sphere as the scene
  Sphere sphere;
  sphere.position = vec3(0.0, 0.0, 10.0);
  sphere.color = vec3(1.0, 1.0, 1.0);
  sphere.radius = 1.0;
  sphere.roughness = 1.0;

  /** Structured sotrage for the output of the function. */
  RayHit hit;

  // Check for intersection with the sphere
  if (intersect_sphere(sphere, ray, hit)) {
    // Calculate the properties of the hit
    hit.type = RAY_TYPE_DIFFUSE;
    hit.color = sphere.color;
    hit.roughness = sphere.roughness;
    hit.distance = length(hit.point - ray.origin);
    hit.reflect = reflect(ray.direction, hit.normal);
  } else {
    // If the ray missed, initialize an environment hit
    hit.type = RAY_TYPE_ENVIRONMENT;
    hit.reflect = ray.direction;
  }

  return hit;
}
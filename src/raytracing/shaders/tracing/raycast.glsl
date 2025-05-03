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
  sphere.position = vec3(-1.4, 0.0, 10.0);
  sphere.color = vec3(1.0, 1.0, 1.0);
  sphere.radius = 1.2;
  sphere.roughness = 0.08;
  Sphere sphere2;
  sphere2.position = vec3(1.4, 0.0, 10.0);
  sphere2.color = vec3(1.0, 1.0, 1.0);
  sphere2.radius = 1.2;
  sphere2.roughness = 0.08;

  /** Structured storage for the output of the function. */
  RayHit hit;

  // Check for intersection with the sphere
  if (intersect_sphere(sphere, ray, hit)) {
    // Calculate the properties of the hit
    hit.type = RAY_TYPE_DIFFUSE;
    hit.color = sphere.color;
    hit.roughness = sphere.roughness;
    hit.distance = length(hit.point - ray.origin);
    hit.reflect = reflect(ray.direction, hit.normal);
  } else if (intersect_sphere(sphere2, ray, hit)) {
    // Calculate the properties of the hit
    hit.type = RAY_TYPE_DIFFUSE;
    hit.color = sphere2.color;
    hit.roughness = sphere2.roughness;
    hit.distance = length(hit.point - ray.origin);
    hit.reflect = reflect(ray.direction, hit.normal);
  } else {
    // If the ray missed, initialize an environment hit
    hit.type = RAY_TYPE_ENVIRONMENT;
    hit.reflect = ray.direction;
  }

  return hit;
}
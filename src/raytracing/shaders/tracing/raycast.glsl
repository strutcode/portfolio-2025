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
  sphere.position = vec3(0.0, 0.0, 10.0) + vec3(sin(time * 0.001) * 0.9, 0.0, cos(time * 0.001) * 0.9);
  sphere.color = vec3(1.0, 1.0, 1.0);
  sphere.radius = 1.2;
  sphere.roughness = 0.03;

  Sphere sphere2;
  sphere2.position = vec3(0.0, 0.0, 10.0) + vec3(cos(time * 0.001) * 3.5, 0.0, sin(time * 0.001) * 3.5);
  sphere2.color = vec3(1.0, 1.0, 1.0);
  sphere2.radius = 1.2;
  sphere2.roughness = 0.03;

  /** Structured storage for the output of the function. */
  RayHit hit1;
  RayHit hit2;

  // Intersect both spheres
  intersect_sphere(sphere, ray, hit1);
  intersect_sphere(sphere2, ray, hit2);

  // Check for intersection with the sphere
  if (hit1.type != RAY_TYPE_NONE && hit1.distance < hit2.distance) {
    // Calculate the properties of the hit
    hit1.type = RAY_TYPE_DIFFUSE;
    hit1.color = sphere.color;
    hit1.roughness = sphere.roughness;
    hit1.distance = length(hit1.point - ray.origin);
    hit1.reflect = reflect(ray.direction, hit1.normal);

    return hit1;
  }

  if (hit2.type != RAY_TYPE_NONE && hit2.distance < hit1.distance) {
    // Calculate the properties of the hit
    hit2.type = RAY_TYPE_DIFFUSE;
    hit2.color = sphere2.color;
    hit2.roughness = sphere2.roughness;
    hit2.distance = length(hit2.point - ray.origin);
    hit2.reflect = reflect(ray.direction, hit2.normal);

    return hit2;
  }

    // If the ray missed, initialize an environment hit
  RayHit hit;
  hit.type = RAY_TYPE_ENVIRONMENT;
  hit.reflect = ray.direction;
  return hit;
}
// Tests for intersection between a ray and an sdf sphere
bool intersect_sphere(vec3 sphereCenter, float sphereRadius, Ray ray, out RayHit hit) {
  vec3 L = sphereCenter - ray.origin;
  float tca = dot(ray.direction, L);

  // If the ray is pointing away from the sphere center there's no chance of intersection
  if (tca <= 0.0) {
    return false;
  }

  // Calculate the distance from the sphere center to the intersection point squared
  float d2 = dot(L, L) - tca * tca;
  float r2 = sphereRadius * sphereRadius;

  // If the distance of the ray from the center (squared) is greater than radius (squared), it missed
  if (d2 > r2) {
    return false;
  }

  // Calculate the distance from the origin to the sphere center
  float thc = sqrt(r2 - d2);

  // Calculate t0, or the distance from the ray origin to the intersection point
  float t0 = tca - thc;

  // Get the intersection point as a vector
  hit.point = ray.origin + ray.direction * t0;

  // For a perfect sphere the normal will always point away from the center
  // so get the normalized difference between the intersection point and the center
  hit.normal = normalize(hit.point - sphereCenter);

  return true;
}
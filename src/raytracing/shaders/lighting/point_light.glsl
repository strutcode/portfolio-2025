// Returns a color contribution from a point light source by a ray
vec3 point_light_contribution(PointLight light, Ray ray) {
  // Calculate the direction from the light to the ray origin
  vec3 lightDir = normalize(light.position - ray.origin);

  // Calculate the angle between the light direction and the ray direction
  float angle = dot(lightDir, ray.direction);

  // Calculate the distance from the light to the ray origin
  float distance = length(light.position - ray.origin);
  float distanceSq = distance * distance;
  
  // If the angle is less than the light's perspective size, it contributes nothing
  if (angle < light.size / distanceSq) {
    return vec3(0.0);
  }

  // Calculate the attenuation based on distance
  float attenuation = light.intensity / distanceSq;

  // Return the color contribution of the light
  return light.color * attenuation * angle;
}
precision mediump float;

uniform float screen_width;
uniform float screen_height;

struct Ray {
  vec3 origin;
  vec3 direction;
};

struct RayHit {
  vec3 point;
  vec3 normal;
  float distance;
};

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

vec3 cast_ray(vec2 xy) {
  // Get the origin and direction of the ray from uv
  Ray ray;
  ray.origin = vec3(xy, 0.0);
  ray.direction = vec3(xy, -1.0);

  // Define the sphere center and radius
  vec3 sphereCenter = vec3(0.0, 0.0, -1.0);
  float sphereRadius = 0.4;

  RayHit hit;

  // Check for intersection with the sphere
  if (intersect_sphere(sphereCenter, sphereRadius, ray, hit)) {
    return vec3(1.0, 1.0, 1.0);
  } else {
    return vec3(0.0, 0.0, 0.0);
  }
}

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);
  vec2 ratio = vec2(screen_width / screen_height, 1.0);
  gl_FragColor = vec4(cast_ray((uv - vec2(0.5)) * ratio), 1.0);
}
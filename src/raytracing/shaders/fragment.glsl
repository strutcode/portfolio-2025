precision mediump float;

uniform float screen_width;
uniform float screen_height;
uniform sampler2D background;

const float fov = 90.0; // Degrees
const float degToRad = 0.017453292519943295;
const float fovRange = fov * 0.5 * degToRad;

#include util/constants
#include util/types
#include sdf/sphere
#include tracing/camera
#include lighting/point_light
#include tracing/cast_ray

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);
  Ray ray = camera_ray(uv, vec2(screen_width, screen_height));
  Ray next;

  vec3 result = cast_ray(ray, next);
  for (int i = 0; i < 3; i++) {
    // Copy the next ray to the current ray
    ray.origin = next.origin;
    ray.direction = next.direction;

    if (ray.direction == vec3(0.0)) {
      break; // No more rays to cast
    }

    // Cast the ray again
    result *= cast_ray(ray, next);
  }

  gl_FragColor = vec4(result, 1.0);
}
precision mediump float;

uniform float screen_width;
uniform float screen_height;

const float fov = 90.0; // Degrees
const float degToRad = 0.017453292519943295;
const float fovRange = fov * 0.5 * degToRad;

#include util/types
#include sdf/sphere
#include tracing/cast_ray
#include tracing/camera

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);
  vec2 ratio = vec2(screen_width / screen_height, 1.0);
  Ray ray = camera_ray(uv, vec2(screen_width, screen_height));
  vec3 result = cast_ray(ray);

  gl_FragColor = vec4(result, 1.0);
}
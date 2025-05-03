precision mediump float;

uniform float screen_width;
uniform float screen_height;
uniform sampler2D background;

const float fov = 90.0; // Degrees
const float degToRad = 0.017453292519943295;
const float fovRange = fov * 0.5 * degToRad;
const int traces = 30;
const int bounces = 1;

#include util/constants
#include util/types
#include util/rand
#include sdf/sphere
#include tracing/camera
#include lighting/point_light
#include tracing/raycast
#include tracing/trace

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);
  Ray ray = camera_ray(uv, vec2(screen_width, screen_height));
  vec3 result = vec3(0.0);

  for (int i = 0; i < traces; i++) {
    result += trace(ray);
  }

  result *= 1.0 / float(traces);

  gl_FragColor = vec4(result, 1.0);
}
precision mediump float;

uniform float screen_width;
uniform float screen_height;
uniform sampler2D background;

#define PI 3.1415926535897932384626433832795

const float fov = 90.0; // Degrees
const float degToRad = 0.017453292519943295;
const float fovRange = fov * 0.5 * degToRad;

#include util/types
#include sdf/sphere
#include tracing/camera
#include lighting/point_light
#include tracing/cast_ray

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);
  Ray ray = camera_ray(uv, vec2(screen_width, screen_height));
  vec3 result = cast_ray(ray);

  gl_FragColor = vec4(result, 1.0);
  // gl_FragColor = texture2D(background, uv);
}
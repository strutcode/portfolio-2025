precision mediump float;

uniform float screen_width;
uniform float screen_height;
uniform float time;
uniform sampler2D background;

const float fov = 110.0; // Degrees
const float degToRad = 0.017453292519943295;
const float fovRange = fov * 0.5 * degToRad;
const int traces = 8;
const int bounces = 5;

#include util/constants
#include util/types
#include util/rand
#include sdf/sphere
#include tracing/camera
#include lighting/point_light
#include tracing/raycast
#include tracing/trace

/**
 * Main function for the fragment shader. This sets up the initial parameters
 * and calls the path tracing function.
 */
void main() {
  // Calculate the screen coordinates and create a ray from the camera
  vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);

  // Adjust the coordinates to account for the camera parameters
  Ray ray = camera_ray(uv, vec2(screen_width, screen_height));

  // Trace `traces` rays and accumulate all the color contributions
  vec3 result = vec3(0.0);
  for (int i = 0; i < traces; i++) {
    result += trace(ray);
  }

  // Take the average of the captured colors and use it as the fragment color
  gl_FragColor = vec4(result / float(traces), 1.0);
}
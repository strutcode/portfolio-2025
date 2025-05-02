precision mediump float;

uniform float screen_width;
uniform float screen_height;
uniform vec3 colors[3];
uniform vec2 points[2];

float dist(vec2 p, vec2 q) {
  return 1.0 - length(p - (q / vec2(screen_width, screen_height)));
}

vec3 distanceColor(vec2 uv) {
  return 0.33 * (colors[0] + colors[1] * dist(uv, points[0]) + colors[2] * dist(uv, points[1]));
}

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);

  gl_FragColor = vec4(distanceColor(uv), 1.0);
}
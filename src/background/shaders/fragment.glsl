precision mediump float;

const bool debug = false;

uniform float screen_width;
uniform float screen_height;
uniform vec3 colors[2];
uniform vec2 points[5];

float dist(vec2 p, vec2 q) {
  return length(p - q);
}

vec3 pointColor(int n) {
  return mix(colors[0], colors[1], float(n) / 10.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);

  int closest = 0;
  vec2 closestP = points[0];

  for (int i = 1; i < 5; i++) {
    if (dist(uv, points[i]) < dist(uv, closestP)) {
      closest = i;
      closestP = points[i];
    }
  }

  if (debug) {
    // Display the points themselves
    if (dist(uv, closestP) < 0.01) {
      gl_FragColor = vec4(1.0);
      return;
    }
  }

  gl_FragColor = vec4(pointColor(closest), 1.0);
}
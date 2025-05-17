precision mediump float;

uniform vec2 resolution;
uniform float time;

varying vec2 vUv;

float circle() {
  return 1.0 - length(vUv - vec2(0.5, 0.5)) * 2.0;
}

void main() {
  gl_FragColor = vec4(vec3(circle() * circle()), circle());
}
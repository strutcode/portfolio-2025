precision mediump float;

uniform vec2 resolution;
uniform float time;

varying vec2 vUv;

float star() {
  return 0.5 - (abs(0.5 - vUv.x) + abs(0.5 - vUv.y));
}

void main() {
  gl_FragColor = vec4(vec3(1.0), star());
}
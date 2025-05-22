precision mediump float;

uniform sampler2D texture;
uniform float darkModeValue;

varying vec2 vUv;

float star() {
  return 0.5 - (abs(0.5 - vUv.x) + abs(0.5 - vUv.y));
}

void main() {
  gl_FragColor = texture2D(texture, vUv);
  gl_FragColor *= 1.0 - darkModeValue;
}
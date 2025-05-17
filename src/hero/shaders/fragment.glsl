precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform vec3 lightDirection;

varying vec3 vNormal;

void main() {
  float light = dot(vNormal, lightDirection);

  gl_FragColor = vec4(vec3(light), 1.0);
  // gl_FragColor = vec4(vec3(vNormal * 0.5 + 0.5), 1.0);
}
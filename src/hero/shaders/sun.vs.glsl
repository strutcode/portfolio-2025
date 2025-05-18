attribute vec4 position;
attribute vec2 texcoord;

uniform mat4 worldViewProjection;

varying vec2 vUv;

void main() {
  vUv = texcoord;

  // Convert vertex position to screen space using the MVP matrix
  gl_Position = worldViewProjection * position;
}

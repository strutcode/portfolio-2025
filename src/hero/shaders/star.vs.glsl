attribute vec4 position;
attribute vec2 texcoord;
attribute mat4 instanceWorld;

uniform mat4 viewProjection;

varying vec2 vUv;

void main() {
  vUv = texcoord;

  // Convert vertex position to screen space using the MVP matrix
  gl_Position = viewProjection * instanceWorld * position;
}

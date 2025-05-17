attribute vec4 position;
attribute vec3 normal;

uniform mat4 world;
uniform mat4 worldViewProjection;

varying vec3 vNormal;

void main() {
  // Convert normal to world space, ignoring translation
  vNormal = (world * vec4(normal, 0.0)).xyz;

  // Convert vertex position to screen space using the MVP matrix
  gl_Position = worldViewProjection * position;
}

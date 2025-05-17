attribute vec4 position;
attribute vec3 normal;

uniform mat4 world;
uniform mat4 worldViewProjection;

varying vec3 vNormal;

void main() {
  // Convert normal to world space (ignore translation)
  vNormal = (world * vec4(normal, 0.0)).xyz;
  // vNormal = normal;

  gl_Position = worldViewProjection * position;
}

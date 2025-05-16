attribute vec4 position;

uniform mat4 worldViewProjection;

void main() {
  gl_Position = worldViewProjection * position;
}

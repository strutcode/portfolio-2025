attribute vec4 position;

uniform mat4 world;
uniform mat4 worldViewProjection;

varying vec3 vNormal;

float heightAtLocation(vec2 position) {
  return position.y * 0.1;
}

vec3 normalAtLocation(vec2 position) {
  vec2 up = position + vec2(0.0, 1.0);
  vec2 down = position + vec2(0.0, -1.0);
  vec2 left = position + vec2(-1.0, 0.0);
  vec2 right = position + vec2(1.0, 0.0);

  float leftRightGradient = heightAtLocation(left) - heightAtLocation(right);
  float upDownGradient = heightAtLocation(up) - heightAtLocation(down);

  return normalize(vec3(leftRightGradient, 2.0, upDownGradient));
}

void main() {
  // Convert normal to world space (ignore translation)
  vNormal = mat3(world) * normalAtLocation(position.xy);

  vec4 offset = vec4(0.0, heightAtLocation(position.xz), 0.0, 0.0);

  gl_Position = worldViewProjection * (position + offset);
}

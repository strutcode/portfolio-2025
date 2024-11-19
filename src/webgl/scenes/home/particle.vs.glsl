attribute vec4 position;
attribute vec3 normal;
attribute vec3 instancePosition;
attribute float instanceRotation;

varying vec3 frag_Normal;

uniform mat4 viewProjection;
uniform mat4 view;

void main() {
  mat4 instanceWorld = mat4(
    cos(instanceRotation), 0.0, sin(instanceRotation), 0.0,
    0.0, 1.0, 0.0, 0.0,
    -sin(instanceRotation), 0.0, cos(instanceRotation), 0.0,
    instancePosition.x, instancePosition.y, instancePosition.z, 1.0
  );
  mat4 worldView = view * instanceWorld;
  mat4 worldViewProjection = viewProjection * instanceWorld;

  gl_Position = worldViewProjection * position;
  frag_Normal = (worldView * vec4(normal, 0.0)).xyz;
}
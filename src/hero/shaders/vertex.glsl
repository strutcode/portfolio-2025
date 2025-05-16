attribute vec4 a_position;

void main() {
  // Calculate a perspective camera transform
  mat4 perspectiveMatrix = mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, -1.0, -1.0, 0.0, 0.0, -1.5, 1.0);

  // Create a world transform matrix that places the object in front of the camera
  mat4 worldMatrix = mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, -5.0, 0.0, 0.0, 0.0, 1.0);

  gl_Position = perspectiveMatrix * worldMatrix * a_position;
}
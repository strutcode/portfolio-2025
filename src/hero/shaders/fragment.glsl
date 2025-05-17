precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform vec3 lightDirection;

varying vec3 vNormal;

void main() {
  // Get the alignment between the world normal and the inverse light direction
  // This tells us between -1.0 and 1.0 how much the surface is facing the light
  // We clamp the value to the 0..1 range because there can't be negative light
  float light = clamp(dot(vNormal, -lightDirection), 0.0, 1.0);

  // Set the material colors
  vec3 lightColor = vec3(0.6, 0.87, 0.6);
  vec3 shadowColor = vec3(0.1, 0.3, 0.14);

  // Calculate a final color based on material colors and the lighting amount
  gl_FragColor = vec4(mix(shadowColor, lightColor, light), 1.0);
}
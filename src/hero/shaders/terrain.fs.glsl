precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform vec3 lightDirection;
uniform vec3 lightColor;
uniform vec3 shadowColor;
uniform vec3 backgroundColor;

varying vec3 vNormal;

void main() {
  // Get the alignment between the world normal and the inverse light direction
  // This tells us between -1.0 and 1.0 how much the surface is facing the light
  // We clamp the value to the 0..1 range because there can't be negative light
  float light = clamp(dot(vNormal, -lightDirection), 0.0, 1.0);

  // Calculate a final color based on material colors and the lighting amount
  gl_FragColor = vec4(mix(shadowColor, lightColor, light), 1.0);

  // Add a fade to background color to simulate fog
  float fogAmount = smoothstep(0.99, 0.997, gl_FragCoord.z);
  gl_FragColor = mix(gl_FragColor, vec4(backgroundColor, 1.0), fogAmount);
}
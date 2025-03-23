#ifdef GL_ES
    precision highp float;
#endif

// Samplers
varying vec2 vUv;
uniform sampler2D tDiffuse;

// Parameters
uniform float amount;
uniform int steps;
uniform float stepSize;

void main(void) 
{
  vec4 baseColor = texture2D(tDiffuse, vUv);
  vec4 result = vec4(0.0);
  float factor = 1.0 / float(steps);

  for (int i = 0; i < steps; i++) {
    vec2 offset = (vUv - vec2(0.5)) * (float(i) * stepSize);
    vec2 fUv = vUv + offset;

    // Check if the UV coordinates are within bounds
    if (fUv.x >= 0.0 && fUv.x <= 1.0 && fUv.y >= 0.0 && fUv.y <= 1.0) {
      vec4 color = texture2D(tDiffuse, fUv);
      result += color * factor;
    }
    else {
      result += vec4(0.0); // Add black if out of bounds
    }
  }

  gl_FragColor = mix(baseColor, result, amount);
}
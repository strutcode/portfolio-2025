#ifdef GL_ES
    precision highp float;
#endif

// Samplers
varying vec2 vUV;
uniform sampler2D textureSampler;

// Parameters
uniform float amount;
uniform int steps;
uniform float stepSize;

void main(void) 
{
  vec4 baseColor = texture2D(textureSampler, vUV);
  vec4 result = vec4(0.0);
  float factor = 1.0 / float(steps);

  for (int i = 0; i < steps; i++) {
    vec2 offset = (vUV - vec2(0.5)) * (float(i) * stepSize);
    vec4 color = texture2D(textureSampler, vUV + offset);

    result += color * factor;
  }

  gl_FragColor = mix(baseColor, result, amount);
}
precision mediump float;

uniform float screen_width;
uniform float screen_height;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(screen_width, screen_height);
  gl_FragColor = vec4(uv, 0.0, 1.0);
}
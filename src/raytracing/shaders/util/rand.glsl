float seed = 0.287945184;

float rand() {
  vec2 st = gl_FragCoord.xy / vec2(screen_width, screen_height);
  float val = dot(st, vec2(12.9898, 78.233)) + seed;
  seed = val;
  return fract(sin(val) * 43758.5453123);
}
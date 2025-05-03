float seed = 0.287945184;

/** A simple psuedo-random number generator. Returns a value from 0.0 to 1.0. */
float rand() {
  // Ensure each fragment starts with a different seed value
  vec2 st = gl_FragCoord.xy / vec2(screen_width, screen_height);

  // Use the fragment coordinates and an offset to create a random vector
  // then get the dot product to normalize it to 0..1
  float val = dot(st, vec2(12.9898, 78.233)) + seed;

  // Update the seed value for the next call
  seed = val;

  // Use a sine function to create a pseudo-random value
  return fract(sin(val) * 43758.5453123);
}
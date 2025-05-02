struct Ray {
  vec3 origin;
  vec3 direction;
};

struct RayHit {
  vec3 point;
  vec3 normal;
  float distance;
};
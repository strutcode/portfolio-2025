struct Ray {
  vec3 origin;
  vec3 direction;
};

struct RayHit {
  vec3 point;
  vec3 normal;
  float distance;
};

struct Sphere {
  vec3 position;
  vec3 color;
  float radius;
};

struct PointLight {
  vec3 position;
  vec3 color;
  float intensity;
  float size;
};
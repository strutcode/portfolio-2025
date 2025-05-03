const int RAY_TYPE_DIRECT = 0;
const int RAY_TYPE_DIFFUSE = 1;
const int RAY_TYPE_ENVIRONMENT = 2;

struct Ray {
  vec3 origin;
  vec3 direction;
};

struct RayHit {
  int type;
  vec3 point;
  vec3 normal;
  vec3 reflect;
  float distance;
  vec3 color;
  float roughness;
};

struct Sphere {
  vec3 position;
  vec3 color;
  float roughness;
  float radius;
};

struct PointLight {
  vec3 position;
  vec3 color;
  float intensity;
  float size;
};
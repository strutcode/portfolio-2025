vec3 environment(vec3 dir);

vec3 trace(Ray ray) {
  RayHit hit;
  RayHit contribs[3];
  int b = 0;

  for (int i = 0; i < bounces + 1; i++) {
    hit = raycast(ray);
    contribs[i] = hit;
    b++;

    ray.origin = hit.point;
    ray.direction = hit.reflect;

    if (hit.type == RAY_TYPE_ENVIRONMENT) {
      contribs[i].color = environment(hit.reflect);
      // No more rays to cast
      break;
    } else if (hit.type == RAY_TYPE_DIRECT) {
      // Direct reflection
      continue;
    } else if (hit.type == RAY_TYPE_DIFFUSE) {
      // Diffuse reflection
      vec3 tweak = vec3(rand() * hit.roughness, rand() * hit.roughness, rand() * hit.roughness);

      // If the tweak would point inside the sphere, invert it
      if (dot(tweak, hit.normal) < 0.0) {
        tweak = -tweak;
      }

      ray.direction = normalize(ray.direction + tweak);
    }
  }

  vec3 final = vec3(0.0);
  for (int i = bounces + 1; i >= 0; i--) {
    if (i > b) {
      continue;
    }

    hit = contribs[i];

    if (hit.type == RAY_TYPE_DIRECT) {
      final *= hit.color;
    } else if (hit.type == RAY_TYPE_DIFFUSE) {
      final *= hit.color;
    } else if (hit.type == RAY_TYPE_ENVIRONMENT) {
      final += hit.color;
    }
  }
  return final;
}

vec3 environment(vec3 dir) {
  float lat = acos(dir.y);
  float lon = atan(dir.x, dir.z);

  vec2 uv = vec2(lon / (2.0 * PI) + 0.5, lat / PI);

  return texture2D(background, uv).rgb;
}
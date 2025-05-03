vec3 environment(vec3 dir);

/**
 * Ray tracing function
 * 
 * This function is responsible for end to end path tracing, accumulating the
 * color of the ray as it bounces off surfaces in the scene. It branches for
 * different kinds of surface intersections to provide functions like diffuse,
 * specular, and environment reflections.
 *
 * @param ray The camera ray to trace from.
 */
vec3 trace(Ray ray) {
  /** Stores the last intersection */
  RayHit hit;
  /** Each contributing bounce, in eye order (i.e. reversed) */
  RayHit contribs[3];
  /** Tracks the current bounce count */
  int bounce = 0;

  // Trace the ray, starting from the camera
  for (int i = 0; i < bounces + 1; i++) {
    // Get the intersection, store it in contributions and increment bounces
    hit = raycast(ray);
    contribs[i] = hit;
    bounce++;

    // Set up the next ray cast to be from the hit point, reflected off the normal
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
      // Diffuse reflection, start by picking a random direction to adjust the reflection
      vec3 tweak = normalize(vec3(rand(), rand(), rand()));

      // If the tweak would point inside the sphere, invert it
      if (dot(tweak, hit.normal) < 0.0) {
        tweak = -tweak;
      }

      // Interpolate between the original reflection and the tweak based on the roughness
      ray.direction = mix(ray.direction, tweak, hit.roughness);
    }
  }

  /** The final output color of the path tracing function. */
  vec3 final = vec3(0.0);

  // Iterate through the contributions in reverse order
  for (int i = bounces + 1; i >= 0; i--) {
    // GLSL doesn't allow dynamic loop initializers, so skip any unused iterations
    if (i > bounce) {
      continue;
    }

    // Get the contribution from the current bounce
    hit = contribs[i];

    if (hit.type == RAY_TYPE_ENVIRONMENT) {
    // If the hit is a direct light, add it to the final color
      final += hit.color;
    } else {
    // If the hit is a bounce off of a surface, multiply by the absorption color
      final *= hit.color;
    }
  }

  return final;
}

/** Returns the environment color for a given ray direction. */
vec3 environment(vec3 dir) {
  // Convert the direction vector to spherical coordinates
  float lat = acos(dir.y);
  float lon = atan(dir.x, dir.z);

  // Normalize the latitude and longitude to [0, 1]
  vec2 uv = vec2(lon / (2.0 * PI) + 0.5, lat / PI);

  // Sample the texture from the uv coordinates
  return texture2D(background, uv + vec2(time * 0.00005, 0.0)).rgb;
}
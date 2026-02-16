#version 300 es
precision highp float;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

uniform float uDissolve;
uniform vec2 uCenter;
uniform vec2 uResolution;
uniform float uMaxDist;

in vec2 vUv;
out vec4 fragColor;

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 centeredUv = vUv - uCenter;
  centeredUv.x *= aspect;

  float dist = length(centeredUv);
  float noiseRamp = smoothstep(0.0, 0.5, uDissolve);

  float blobNoise = fbm(centeredUv * 3.0) * 0.3 * noiseRamp;
  float edgeVariation = fbm(centeredUv * 5.0 + vec2(0.5, 0.3)) * 0.2;
  float emberTexture = fbm(vUv * 50.0) * 0.08;
  float fineDetail = fbm(vUv * 120.0) * 0.04;

  float totalNoise = blobNoise + edgeVariation + emberTexture + fineDetail;
  float normalizedDist = (dist + totalNoise) / uMaxDist;

  float dissolveThreshold = uDissolve;
  float dissolveMask = smoothstep(dissolveThreshold - 0.02, dissolveThreshold, normalizedDist);

  if (dissolveMask < 0.01) discard;

  float edgeZoneWidth = 0.15 * (1.0 - uDissolve) + 0.04;
  float edgeZone = smoothstep(dissolveThreshold - edgeZoneWidth, dissolveThreshold - edgeZoneWidth + 0.06, normalizedDist) *
                   smoothstep(dissolveThreshold + 0.04, dissolveThreshold - 0.02, normalizedDist);

  float emberNoise = fbm(vUv * 80.0 + vec2(normalizedDist * 5.0, 0.0));
  float ember = pow(emberNoise, 1.5) * edgeZone * 1.5;
  float brightSpots = smoothstep(0.65, 0.75, fbm(vUv * 100.0)) * edgeZone * 0.8;

  vec3 bgColor = vec3(0.03, 0.02, 0.02);
  float emberTemp = ember + brightSpots * 0.6;
  vec3 hotCore = vec3(1.0, 0.95, 0.85);
  vec3 midFlame = vec3(1.0, 0.55, 0.15);
  vec3 coolEdge = vec3(0.85, 0.25, 0.08);

  vec3 emberColor = mix(coolEdge, midFlame, smoothstep(0.0, 0.4, emberTemp));
  emberColor = mix(emberColor, hotCore, smoothstep(0.4, 0.9, emberTemp));

  float glowIntensity = edgeZone;
  vec3 glow = mix(vec3(0.85, 0.35, 0.08), vec3(1.0, 0.65, 0.25), sqrt(edgeZone)) * glowIntensity;
  vec3 emberParticles = emberColor * (ember + brightSpots * 0.5);

  fragColor = vec4(bgColor + glow + emberParticles, dissolveMask);
}

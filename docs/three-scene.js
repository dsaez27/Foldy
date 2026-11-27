import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.35, 5.4);
  camera.lookAt(0, -0.25, 0);

  const targetColor = new THREE.Color('#d97757');
  const currentColor = new THREE.Color('#d97757');
  const secondaryColor = new THREE.Color('#1f2636');

  const uniforms = {
    uTime: { value: 0 },
    uAccent: { value: currentColor },
    uSecondary: { value: secondaryColor },
    uPointer: { value: new THREE.Vector2(0, 0) }
  };

  // Architectural kinetic wave topography mesh
  const planeGeo = new THREE.PlaneGeometry(16, 11, 112, 72);
  const planeMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms,
    vertexShader: `
      uniform float uTime;
      uniform vec2 uPointer;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vUv = uv;
        vec3 pos = position;

        float wave1 = sin(pos.x * 0.55 + uTime * 0.42) * cos(pos.y * 0.45 + uTime * 0.31) * 0.42;
        float wave2 = sin((pos.x * 0.9 - pos.y * 0.7) + uTime * 0.28) * 0.18;
        float pointerDist = length(pos.xy * 0.16 - uPointer * 0.8);
        float ripple = exp(-pointerDist * 1.45) * 0.28;

        pos.z += wave1 + wave2 + ripple;
        vElevation = pos.z;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uAccent;
      uniform vec3 uSecondary;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        // Fine architectural grid lines
        vec2 grid = abs(fract(vUv * vec2(34.0, 22.0) - 0.5) - 0.5) / fwidth(vUv * vec2(34.0, 22.0));
        float line = 1.0 - min(min(grid.x, grid.y), 1.0);

        // Subtle topographic contour rings
        float contour = abs(fract(vElevation * 4.5) - 0.5);
        float contourLine = smoothstep(0.06, 0.0, contour) * 0.45;

        // Radial vignette fade so edges dissolve into #090a0d
        float edgeX = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
        float edgeY = smoothstep(0.0, 0.26, vUv.y) * smoothstep(1.0, 0.72, vUv.y);
        float mask = edgeX * edgeY;

        float crest = smoothstep(-0.35, 0.55, vElevation);
        vec3 baseCol = mix(uSecondary, uAccent, crest * 0.62);
        vec3 col = baseCol * (0.28 + line * 0.48 + contourLine);

        float alpha = (0.12 + line * 0.22 + contourLine * 0.24) * mask;
        gl_FragColor = vec4(col, alpha);
      }
    `
  });

  const waveMesh = new THREE.Mesh(planeGeo, planeMat);
  waveMesh.rotation.x = -Math.PI * 0.37;
  waveMesh.position.set(0, -0.85, -1.2);
  scene.add(waveMesh);

  // Subtle floating depth nodes (restrained, architectural)
  const nodeCount = 72;
  const nodePositions = new Float32Array(nodeCount * 3);
  for (let i = 0; i < nodeCount; i++) {
    nodePositions[i * 3] = (Math.random() - 0.5) * 12;
    nodePositions[i * 3 + 1] = (Math.random() - 0.35) * 5.2;
    nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 4.5 - 1.0;
  }
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

  const nodeMat = new THREE.PointsMaterial({
    color: currentColor,
    size: 0.038,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });
  const nodes = new THREE.Points(nodeGeo, nodeMat);
  scene.add(nodes);

  // Pointer parallax tracking
  const pointerTarget = new THREE.Vector2(0, 0);
  window.addEventListener('pointermove', (e) => {
    pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  });

  window.__foldySetAccent = (hex) => {
    try {
      targetColor.set(hex);
    } catch {
      // Ignore invalid color strings
    }
  };

  let rafId = 0;
  const clock = new THREE.Clock();

  function renderFrame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    uniforms.uTime.value += dt;

    currentColor.lerp(targetColor, 0.07);
    nodeMat.color.copy(currentColor);

    uniforms.uPointer.value.lerp(pointerTarget, 0.05);
    camera.position.x = uniforms.uPointer.value.x * 0.28;
    camera.position.y = 1.35 + uniforms.uPointer.value.y * 0.16;
    camera.lookAt(0, -0.25, 0);

    nodes.rotation.y += dt * 0.025;
    renderer.render(scene, camera);
  }

  function loop() {
    if (document.hidden) {
      rafId = 0;
      return;
    }
    renderFrame();
    rafId = requestAnimationFrame(loop);
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !prefersReduced && !rafId) {
      clock.getDelta();
      loop();
    }
  });

  if (prefersReduced) {
    renderFrame();
  } else {
    loop();
  }
}

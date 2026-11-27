'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackdropProps {
  accentHex: string;
  secondaryHex: string;
  lightMode?: boolean;
}

export function ThreeBackdrop({ accentHex, secondaryHex, lightMode = false }: ThreeBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetPrimaryRef = useRef<THREE.Color>(new THREE.Color(accentHex));
  const targetSecondaryRef = useRef<THREE.Color>(new THREE.Color(secondaryHex));
  const lightModeRef = useRef<boolean>(lightMode);

  useEffect(() => {
    targetPrimaryRef.current.set(accentHex);
    targetSecondaryRef.current.set(secondaryHex);
    lightModeRef.current = lightMode;
  }, [accentHex, secondaryHex, lightMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const currentPrimary = new THREE.Color(targetPrimaryRef.current);
    const currentSecondary = new THREE.Color(targetSecondaryRef.current);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uPointer: { value: new THREE.Vector2(0.5, 0.55) },
      uScroll: { value: 0 },
      uPrimary: { value: currentPrimary },
      uSecondary: { value: currentSecondary },
      uLight: { value: lightModeRef.current ? 1.0 : 0.0 }
    };

    // Full-screen Domain-Warped Liquid Silk & Optical Light Shader (Apple / Stripe / Raycast 2026 aesthetic)
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      depthWrite: false,
      depthTest: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uPointer;
        uniform float uScroll;
        uniform vec3 uPrimary;
        uniform vec3 uSecondary;
        uniform float uLight;

        varying vec2 vUv;

        // Smooth 2D simplex-style value noise
        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.52;
          mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
          for (int i = 0; i < 5; i++) {
            v += a * noise(p);
            p = rot * p * 2.02 + vec2(1.7, 9.2);
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / max(uResolution.y, 1.0);
          vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
          vec2 ptr = (uPointer - 0.5) * vec2(aspect, 1.0);

          float t = uTime * 0.095;
          // Continuous gentle downward drift (+Y in UV space moves the pattern downward)
          vec2 drift = vec2(0.0, t * 1.15 + uScroll * 0.75);
          vec2 sp = p * 0.78 + drift;

          // Soft, broad domain warping for calm velvety silk flow
          vec2 q = vec2(
            fbm(sp + vec2(0.0, t * 0.35)),
            fbm(sp + vec2(3.4, 1.9 + t * 0.25))
          );

          vec2 r = vec2(
            fbm(sp * 1.05 + 1.15 * q + vec2(1.7, 5.2 + t * 0.3)),
            fbm(sp * 1.05 + 1.15 * q + vec2(6.8, 2.4 + t * 0.2))
          );

          float f = fbm(sp * 0.95 + 1.05 * r);

          // Gentle broad silk luminosity
          float ribbon = smoothstep(0.2, 0.9, f);
          float caustic = pow(clamp(1.0 - abs(f - 0.54) * 2.8, 0.0, 1.0), 2.0);

          // Soft cursor optical sheen
          float mouseDist = length(p - ptr);
          float mouseGlow = exp(-mouseDist * 1.9) * 0.3;

          // Broad atmospheric vignette
          float heroFocus = smoothstep(1.4, 0.05, length(p * vec2(0.68, 0.85) - vec2(0.0, 0.1)));

          vec3 darkBase = vec3(0.016, 0.02, 0.032);
          vec3 lightBase = vec3(0.968, 0.975, 0.994);
          vec3 base = mix(darkBase, lightBase, uLight);

          // Multi-color soft aurora palette blending across the flowing waves
          vec3 colAqua = vec3(0.14, 0.82, 0.93);
          vec3 colRose = vec3(0.92, 0.34, 0.62);
          vec3 colMint = vec3(0.18, 0.85, 0.62);

          vec3 bandA = mix(uPrimary, colAqua, smoothstep(0.2, 0.8, q.x));
          vec3 bandB = mix(uSecondary, colRose, smoothstep(0.25, 0.85, r.y));
          vec3 silkCol = mix(bandA, bandB, smoothstep(0.18, 0.82, f));
          silkCol = mix(silkCol, colMint, smoothstep(0.58, 0.92, q.y) * 0.42);
          vec3 highlight = mix(silkCol, vec3(1.0), 0.28);

          // Multi-color velvety silk waves
          vec3 darkScene = base
            + silkCol * (ribbon * 0.38 * (0.52 + heroFocus * 0.65))
            + highlight * (caustic * 0.14 * heroFocus)
            + uPrimary * (mouseGlow * 0.22);

          vec3 lightScene = base
            - (vec3(1.0) - silkCol) * (ribbon * 0.15 * (0.5 + heroFocus * 0.55))
            + uPrimary * (caustic * 0.06)
            + uSecondary * (mouseGlow * 0.06);

          vec3 finalCol = mix(darkScene, lightScene, uLight);

          // Ultra-fine film grain dither
          float grain = (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.014;
          finalCol += grain;

          gl_FragColor = vec4(finalCol, 1.0);
        }
      `
    });

    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    const pointerTarget = new THREE.Vector2(0.5, 0.55);
    let scrollTarget = 0;

    const onPointerMove = (e: PointerEvent) => {
      pointerTarget.x = e.clientX / Math.max(window.innerWidth, 1);
      pointerTarget.y = 1.0 - e.clientY / Math.max(window.innerHeight, 1);
    };
    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget = window.scrollY / maxScroll;
    };
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      uniforms.uTime.value += dt;
      uniforms.uScroll.value += (scrollTarget - uniforms.uScroll.value) * 0.06;
      uniforms.uLight.value += ((lightModeRef.current ? 1.0 : 0.0) - uniforms.uLight.value) * 0.08;
      uniforms.uPointer.value.lerp(pointerTarget, 0.055);

      currentPrimary.lerp(targetPrimaryRef.current, 0.06);
      currentSecondary.lerp(targetSecondaryRef.current, 0.06);

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (document.hidden) {
        rafId = 0;
        return;
      }
      renderFrame();
      rafId = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (!document.hidden && !prefersReduced && !rafId) {
        clock.getDelta();
        loop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    if (prefersReduced) {
      renderFrame();
    } else {
      loop();
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} aria-hidden="true" />;
}

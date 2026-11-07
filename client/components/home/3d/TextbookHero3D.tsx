"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Textbook2DFallback from "./Textbook2DFallback";

export default function TextbookHero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    // Check viewport width and reduced-motion preference
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) {
      setShouldRender3D(false);
      return;
    }

    setShouldRender3D(true);
  }, []);

  useEffect(() => {
    if (!shouldRender3D || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 540;
    const height = container.clientHeight || 520;

    // 1. SCENE
    const scene = new THREE.Scene();

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 7.0);

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // transparent background
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. LIGHTING SETUP (Consistent clean studio light for light theme)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    // Key Light (Crisp soft white)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    // Brand Indigo Rim Light (Soft indigo edge highlights)
    const indigoRimLight = new THREE.DirectionalLight(0x6366f1, 1.8);
    indigoRimLight.position.set(-6, 3, 3);
    scene.add(indigoRimLight);

    // Warm Amber Fill Light (Soft subtle warmth)
    const warmFillLight = new THREE.DirectionalLight(0xfef3c7, 1.2);
    warmFillLight.position.set(2, -4, 4);
    scene.add(warmFillLight);

    // Soft Point Light above the book
    const bookLight = new THREE.PointLight(0x4f46e5, 1.5, 5);
    bookLight.position.set(0, 1.2, 1.5);
    scene.add(bookLight);

    // ROOT HIERARCHY
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // ─────────────────────────────────────────────────────────────
    // 5. CENTRAL 3D SMART TEXTBOOK (Floating & Tilted)
    // ─────────────────────────────────────────────────────────────
    const bookGroup = new THREE.Group();
    rootGroup.add(bookGroup);

    // (A) Book Cover (Deep SmartPrep Indigo)
    const coverGeo = new THREE.BoxGeometry(2.3, 3.15, 0.38);
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0x4338ca, // Rich Indigo-700
      roughness: 0.25,
      metalness: 0.15,
    });
    const coverMesh = new THREE.Mesh(coverGeo, coverMat);
    bookGroup.add(coverMesh);

    // (B) Pages Block (Crisp Off-White layered paper interior)
    const pagesGeo = new THREE.BoxGeometry(2.15, 3.0, 0.32);
    const pagesMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.55,
      metalness: 0.05,
    });
    const pagesMesh = new THREE.Mesh(pagesGeo, pagesMat);
    pagesMesh.position.set(0.08, 0, 0);
    bookGroup.add(pagesMesh);

    // (C) Front Cover Gold Foil Spine Line Accent
    const spineStripeGeo = new THREE.BoxGeometry(0.06, 3.16, 0.4);
    const spineStripeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Amber-500
      roughness: 0.2,
      metalness: 0.6,
    });
    const spineStripe = new THREE.Mesh(spineStripeGeo, spineStripeMat);
    spineStripe.position.set(-0.85, 0, 0);
    bookGroup.add(spineStripe);

    // (D) Front Cover Embossed Emblem (4-Point Diamond Sparkle)
    const emblemGeo = new THREE.OctahedronGeometry(0.28, 0);
    const emblemMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.7,
      emissive: 0x6366f1,
      emissiveIntensity: 0.3,
    });
    const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
    emblemMesh.position.set(0.2, 0.35, 0.21);
    emblemMesh.scale.set(1, 1.2, 0.2);
    bookGroup.add(emblemMesh);

    // Initial textbook angle
    bookGroup.rotation.set(0.22, -0.45, 0.12);

    // ─────────────────────────────────────────────────────────────
    // 6. FLOATING STUDY MILESTONES (Day 1 Schedule Card & MCQ Badge)
    // ─────────────────────────────────────────────────────────────

    // (A) Day 1 Schedule Card (Floating Upper-Left)
    const card1Group = new THREE.Group();
    card1Group.position.set(-2.1, 1.15, 0.9);
    card1Group.rotation.set(0.1, 0.35, -0.08);
    rootGroup.add(card1Group);

    const card1BaseGeo = new THREE.BoxGeometry(1.45, 0.95, 0.05);
    const card1BaseMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.05,
    });
    const card1Base = new THREE.Mesh(card1BaseGeo, card1BaseMat);
    card1Group.add(card1Base);

    // Card 1 mini header line (Indigo)
    const card1HeaderGeo = new THREE.BoxGeometry(0.9, 0.08, 0.06);
    const card1HeaderMat = new THREE.MeshStandardMaterial({ color: 0x4f46e5 });
    const card1Header = new THREE.Mesh(card1HeaderGeo, card1HeaderMat);
    card1Header.position.set(-0.15, 0.25, 0.01);
    card1Group.add(card1Header);

    // Card 1 mini progress bar (Emerald)
    const card1BarGeo = new THREE.BoxGeometry(1.15, 0.06, 0.06);
    const card1BarMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
    const card1Bar = new THREE.Mesh(card1BarGeo, card1BarMat);
    card1Bar.position.set(0, -0.15, 0.01);
    card1Group.add(card1Bar);

    // Card 1 badge circle (Emerald Check)
    const checkCircleGeo = new THREE.SphereGeometry(0.12, 20, 20);
    const checkCircleMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.4,
    });
    const checkCircle = new THREE.Mesh(checkCircleGeo, checkCircleMat);
    checkCircle.position.set(0.5, 0.25, 0.04);
    card1Group.add(checkCircle);

    // (B) Quiz Accuracy Badge (Floating Lower-Right)
    const card2Group = new THREE.Group();
    card2Group.position.set(2.0, -1.05, 0.85);
    card2Group.rotation.set(-0.12, -0.3, 0.08);
    rootGroup.add(card2Group);

    const card2BaseGeo = new THREE.BoxGeometry(1.35, 0.85, 0.05);
    const card2BaseMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.05,
    });
    const card2Base = new THREE.Mesh(card2BaseGeo, card2BaseMat);
    card2Group.add(card2Base);

    // Card 2 mini score circle (Amber)
    const scoreCircleGeo = new THREE.SphereGeometry(0.18, 24, 24);
    const scoreCircleMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.4,
    });
    const scoreCircle = new THREE.Mesh(scoreCircleGeo, scoreCircleMat);
    scoreCircle.position.set(-0.35, 0.05, 0.04);
    card2Group.add(scoreCircle);

    // Card 2 stat text line
    const card2LineGeo = new THREE.BoxGeometry(0.55, 0.07, 0.06);
    const card2LineMat = new THREE.MeshStandardMaterial({ color: 0x4338ca });
    const card2Line = new THREE.Mesh(card2LineGeo, card2LineMat);
    card2Line.position.set(0.2, 0.12, 0.01);
    card2Group.add(card2Line);

    // ─────────────────────────────────────────────────────────────
    // 7. ORBITAL SCIENCE ELEMENTS (Physics Atomic Orbit & Knowledge Beads)
    // ─────────────────────────────────────────────────────────────
    const orbitGroup = new THREE.Group();
    orbitGroup.position.set(1.4, 1.3, -0.3);
    rootGroup.add(orbitGroup);

    // Atomic Orbit Ellipses
    const createAtomicRing = (radius: number, tiltX: number, tiltY: number, color = 0x6366f1) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.02, 16, 80);
      const ringMat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.65,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.set(tiltX, tiltY, 0);
      return ringMesh;
    };

    const atomRing1 = createAtomicRing(0.85, Math.PI / 3, 0.2, 0x4f46e5);
    const atomRing2 = createAtomicRing(0.85, -Math.PI / 3, -0.3, 0xf59e0b);
    orbitGroup.add(atomRing1);
    orbitGroup.add(atomRing2);

    // Atomic Nucleus (Energy sphere)
    const nucleusGeo = new THREE.SphereGeometry(0.16, 24, 24);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      emissive: 0x6366f1,
      emissiveIntensity: 0.8,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    orbitGroup.add(nucleus);

    // Orbiting Electron particle
    const electronGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const electronMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
    const electron = new THREE.Mesh(electronGeo, electronMat);
    atomRing1.add(electron);
    electron.position.set(0.85, 0, 0);

    // Floating Golden Math Delta Symbol (Tetrahedron)
    const deltaGeo = new THREE.TetrahedronGeometry(0.22, 0);
    const deltaMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.6,
      roughness: 0.2,
    });
    const deltaMesh = new THREE.Mesh(deltaGeo, deltaMat);
    deltaMesh.position.set(-1.4, -1.4, 0.5);
    rootGroup.add(deltaMesh);

    // Delicate Floating Knowledge Nodes
    const particlePositions = [
      [2.5, 0.4, 0.2],
      [-2.4, -0.5, 0.1],
      [-0.8, 1.9, -0.4],
      [0.6, -2.1, 0.3],
      [-2.2, 2.0, -0.6],
    ];

    const particleGroup = new THREE.Group();
    particlePositions.forEach(([x, y, z], idx) => {
      const pGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const pMat = new THREE.MeshStandardMaterial({
        color: idx % 2 === 0 ? 0x4f46e5 : 0xf59e0b,
        emissive: idx % 2 === 0 ? 0x4338ca : 0xd97706,
        emissiveIntensity: 0.5,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.set(x, y, z);
      particleGroup.add(pMesh);
    });
    rootGroup.add(particleGroup);

    // ─────────────────────────────────────────────────────────────
    // 8. ANIMATION & GENTLE MOUSE PARALLAX
    // ─────────────────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = nx * 0.35;
      mouseY = ny * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Weightless Textbook Floating (gentle levitation)
      bookGroup.position.y = Math.sin(elapsed * 1.2) * 0.09;
      bookGroup.rotation.y = -0.45 + Math.sin(elapsed * 0.8) * 0.04;

      // Floating Schedule Card
      card1Group.position.y = 1.15 + Math.sin(elapsed * 1.4 + 0.6) * 0.07;
      card1Group.rotation.z = -0.08 + Math.cos(elapsed * 0.9) * 0.02;

      // Floating Quiz Card
      card2Group.position.y = -1.05 + Math.cos(elapsed * 1.3 + 1.2) * 0.06;

      // Atom Orbits Spinning
      orbitGroup.rotation.y = elapsed * 0.6;
      orbitGroup.position.y = 1.3 + Math.sin(elapsed * 1.1) * 0.05;

      // Math Delta facet spin
      deltaMesh.rotation.x = elapsed * 0.5;
      deltaMesh.rotation.y = elapsed * 0.7;

      // Overall tilt with mouse parallax
      rootGroup.rotation.y = targetX;
      rootGroup.rotation.x = -targetY;

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight || 520;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [shouldRender3D]);

  if (!shouldRender3D) {
    return <Textbook2DFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[440px] sm:h-[480px] lg:h-[530px] flex items-center justify-center pointer-events-auto select-none"
      style={{ touchAction: "none" }}
    />
  );
}

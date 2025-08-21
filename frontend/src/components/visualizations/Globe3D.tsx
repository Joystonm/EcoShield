import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../../styles/Globe3D.css';

interface DataLayer {
  color: number;
  name: string;
  unit: string;
}

const Globe3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const animationRef = useRef<number | null>(null);
  const [selectedData, setSelectedData] = useState<string | null>(null);
  const [dataLayer, setDataLayer] = useState<string>('pollution');

  // Environmental data layers
  const dataLayers: Record<string, DataLayer> = {
    pollution: { color: 0xff4444, name: 'Air Pollution (AQI)', unit: 'AQI' },
    temperature: { color: 0xff8800, name: 'Temperature Anomaly', unit: '°C' },
    co2: { color: 0x8844ff, name: 'CO₂ Levels', unit: 'ppm' },
    deforestation: { color: 0x44ff44, name: 'Forest Coverage', unit: '%' }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 1.5;
    controls.maxDistance = 10;

    // Create Earth globe
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Earth texture (procedural)
    const earthTexture = createEarthTexture();
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      transparent: true,
      opacity: 0.9
    });
    
    const globe = new THREE.Mesh(globeGeometry, earthMaterial);
    globe.castShadow = true;
    globe.receiveShadow = true;
    scene.add(globe);
    globeRef.current = globe;

    // Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.05, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create pollution/data overlay
    const dataOverlay = createDataOverlay(dataLayers[dataLayer]);
    scene.add(dataOverlay);

    // Wind flow particles
    const windParticles = createWindParticles();
    scene.add(windParticles);

    // Stars background
    const stars = createStars();
    scene.add(stars);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Rotate globe slowly
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.002;
      }

      // Animate wind particles
      if (windParticles) {
        windParticles.rotation.y += 0.001;
      }

      // Update stars
      if (stars) {
        stars.rotation.x += 0.0001;
        stars.rotation.y += 0.0002;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [dataLayer]);

  // Create procedural Earth texture
  const createEarthTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Create gradient for ocean/land
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, '#1e3a8a'); // Ocean blue
    gradient.addColorStop(0.3, '#059669'); // Land green
    gradient.addColorStop(0.7, '#92400e'); // Mountain brown
    gradient.addColorStop(1, '#f3f4f6'); // Ice white

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);

    // Add some noise for realistic texture
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const size = Math.random() * 3;
      ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 0.3)`;
      ctx.fillRect(x, y, size, size);
    }

    return new THREE.CanvasTexture(canvas);
  };

  // Create data overlay (pollution heatmap)
  const createDataOverlay = (layerConfig: DataLayer): THREE.Mesh => {
    const overlayGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    
    // Create heatmap texture
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Generate random pollution hotspots
    const hotspots = [
      { x: 0.2, y: 0.3, intensity: 0.8 }, // Asia
      { x: 0.1, y: 0.4, intensity: 0.6 }, // Europe
      { x: 0.8, y: 0.4, intensity: 0.7 }, // North America
      { x: 0.3, y: 0.7, intensity: 0.5 }, // Africa
      { x: 0.7, y: 0.8, intensity: 0.4 }, // South America
    ];

    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, 256, 128);

    hotspots.forEach(spot => {
      const gradient = ctx.createRadialGradient(
        spot.x * 256, spot.y * 128, 0,
        spot.x * 256, spot.y * 128, 50
      );
      
      const color = new THREE.Color(layerConfig.color);
      gradient.addColorStop(0, `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${spot.intensity})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 128);
    });

    const overlayTexture = new THREE.CanvasTexture(canvas);
    const overlayMaterial = new THREE.MeshBasicMaterial({
      map: overlayTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    return new THREE.Mesh(overlayGeometry, overlayMaterial);
  };

  // Create wind flow particles
  const createWindParticles = (): THREE.Points => {
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random position on sphere surface
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 1.1;

      positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.cos(theta);
      positions[i3 + 2] = radius * Math.sin(theta) * Math.sin(phi);

      // Random velocity
      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x88ccff,
      size: 0.005,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    return new THREE.Points(particles, particleMaterial);
  };

  // Create stars background
  const createStars = (): THREE.Points => {
    const starCount = 2000;
    const stars = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
    }

    stars.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8
    });

    return new THREE.Points(stars, starMaterial);
  };

  return (
    <div className="globe3d-container">
      {/* Controls Panel */}
      <div className="controls-panel">
        <h3>Environmental Data Layers</h3>
        {Object.entries(dataLayers).map(([key, layer]) => (
          <button
            key={key}
            className={`layer-button ${dataLayer === key ? 'active' : ''}`}
            onClick={() => setDataLayer(key)}
            style={{ borderColor: `#${layer.color.toString(16).padStart(6, '0')}` }}
          >
            <div 
              className="color-indicator"
              style={{ backgroundColor: `#${layer.color.toString(16).padStart(6, '0')}` }}
            />
            {layer.name}
          </button>
        ))}
      </div>

      {/* 3D Globe Container */}
      <div ref={mountRef} className="globe-container" />

      {/* Info Panel */}
      <div className="info-panel">
        <h4>Current Layer: {dataLayers[dataLayer].name}</h4>
        <p>Interactive 3D visualization of global environmental data</p>
        <div className="controls-info">
          <p><strong>Controls:</strong></p>
          <ul>
            <li>🖱️ Drag to rotate</li>
            <li>🔍 Scroll to zoom</li>
            <li>📱 Touch gestures on mobile</li>
          </ul>
        </div>
      </div>

      {/* Legend */}
      <div className="legend">
        <h5>Data Intensity</h5>
        <div className="legend-gradient">
          <span>Low</span>
          <div 
            className="gradient-bar"
            style={{
              background: `linear-gradient(to right, 
                rgba(${new THREE.Color(dataLayers[dataLayer].color).r * 255}, 
                     ${new THREE.Color(dataLayers[dataLayer].color).g * 255}, 
                     ${new THREE.Color(dataLayers[dataLayer].color).b * 255}, 0.2), 
                rgba(${new THREE.Color(dataLayers[dataLayer].color).r * 255}, 
                     ${new THREE.Color(dataLayers[dataLayer].color).g * 255}, 
                     ${new THREE.Color(dataLayers[dataLayer].color).b * 255}, 1))`
            }}
          />
          <span>High</span>
        </div>
      </div>
    </div>
  );
};

export default Globe3D;

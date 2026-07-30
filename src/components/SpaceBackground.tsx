import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types';

interface SpaceBackgroundProps {
  themeMode: ThemeMode;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  color: string;
}

interface Comet {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
  color: string;
}

export const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ themeMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse interactive offset
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - width / 2) * 0.03;
      targetY = (e.clientY - height / 2) * 0.03;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = (e.touches[0].clientX - width / 2) * 0.03;
        targetY = (e.touches[0].clientY - height / 2) * 0.03;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Theme color palettes for stars and comets
    const getThemeConfig = (mode: ThemeMode) => {
      switch (mode) {
        case 'light':
          return {
            bg: 'rgba(248, 250, 252, 1)',
            starColors: ['#1e293b', '#334155', '#2563eb', '#0284c7', '#4f46e5'],
            cometColor: '#2563eb',
            starAlphaMultiplier: 0.85,
            density: 220
          };
        case 'nebula':
          return {
            bg: 'rgba(13, 6, 24, 1)',
            starColors: ['#ffffff', '#f472b6', '#c084fc', '#818cf8', '#38bdf8'],
            cometColor: '#e879f9',
            starAlphaMultiplier: 0.95,
            density: 220
          };
        case 'emerald':
          return {
            bg: 'rgba(4, 16, 12, 1)',
            starColors: ['#ffffff', '#34d399', '#10b981', '#2dd4bf', '#a7f3d0'],
            cometColor: '#10b981',
            starAlphaMultiplier: 0.9,
            density: 200
          };
        case 'sunset':
          return {
            bg: 'rgba(18, 13, 10, 1)',
            starColors: ['#ffffff', '#fbbf24', '#f59e0b', '#fb923c', '#fef08a'],
            cometColor: '#f97316',
            starAlphaMultiplier: 0.9,
            density: 200
          };
        case 'dark':
        default:
          return {
            bg: 'rgba(9, 13, 22, 1)',
            starColors: ['#ffffff', '#ffffff', '#93c5fd', '#38bdf8', '#818cf8'],
            cometColor: '#38bdf8',
            starAlphaMultiplier: 0.95,
            density: 240
          };
      }
    };

    let stars: Star[] = [];
    let comets: Comet[] = [];

    const initStars = () => {
      const config = getThemeConfig(themeMode);
      stars = [];
      const numStars = Math.floor((width * height) / (1000000 / config.density));

      for (let i = 0; i < numStars; i++) {
        const baseAlpha = (Math.random() * 0.7 + 0.3) * config.starAlphaMultiplier;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * width,
          size: Math.random() * 2 + 0.5,
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
          twinkleSpeed: Math.random() * 0.03 + 0.005,
          color: config.starColors[Math.floor(Math.random() * config.starColors.length)]
        });
      }

      comets = [];
      for (let c = 0; c < 3; c++) {
        comets.push({
          x: Math.random() * width,
          y: Math.random() * (height / 2),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 6 + 4,
          angle: Math.PI / 4,
          alpha: 0,
          active: false,
          color: config.cometColor
        });
      }
    };

    initStars();

    let cometTimer = 0;

    const render = () => {
      const config = getThemeConfig(themeMode);

      // Smooth mouse follow interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Clear canvas with theme background
      ctx.fillStyle = config.bg;
      ctx.fillRect(0, 0, width, height);

      // Draw Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle update
        star.alpha += star.twinkleSpeed;
        if (star.alpha > star.baseAlpha + 0.2 || star.alpha < star.baseAlpha - 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Parallax drift based on depth (size)
        const dx = mouseX * (star.size * 0.5);
        const dy = mouseY * (star.size * 0.5);

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fillStyle = star.color;

        // Draw dotted white star
        ctx.beginPath();
        ctx.arc(star.x + dx, star.y + dy, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow around larger stars
        if (star.size > 1.8 && themeMode !== 'light') {
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color;
          ctx.beginPath();
          ctx.arc(star.x + dx, star.y + dy, star.size * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Trigger Shooting Comets / Stars
      cometTimer++;
      if (cometTimer % 180 === 0) {
        const inactiveComet = comets.find((c) => !c.active);
        if (inactiveComet) {
          inactiveComet.x = Math.random() * (width * 0.8);
          inactiveComet.y = Math.random() * (height * 0.3);
          inactiveComet.alpha = 1;
          inactiveComet.active = true;
          inactiveComet.color = config.cometColor;
        }
      }

      // Render Active Comets
      comets.forEach((comet) => {
        if (!comet.active) return;

        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;
        comet.alpha -= 0.012;

        if (comet.alpha <= 0 || comet.x > width || comet.y > height) {
          comet.active = false;
          return;
        }

        ctx.save();
        const headX = comet.x;
        const headY = comet.y;
        const tailX = comet.x - Math.cos(comet.angle) * comet.length;
        const tailY = comet.y - Math.sin(comet.angle) * comet.length;

        const gradient = ctx.createLinearGradient(headX, headY, tailX, tailY);
        gradient.addColorStop(0, comet.color);
        gradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = comet.alpha;
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [themeMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};

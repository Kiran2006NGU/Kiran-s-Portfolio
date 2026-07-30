import React, { useEffect, useState, useRef } from 'react';
import { ThemeMode } from '../types';

interface CustomCursorProps {
  themeMode: ThemeMode;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ themeMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Mouse positions for lerp animation
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch-only screens
    const checkTouch = () => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('a, button, input, textarea, select, [role="button"], .interactive-target');
        setIsHovered(isClickable);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth Lerp loop for fluid trailing outer ring
    const render = () => {
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0px) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0px) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  // Theme accent colors for ring cursor
  const getCursorAccent = () => {
    switch (themeMode) {
      case 'light':
        return 'border-blue-600 bg-blue-500/10 shadow-blue-500/30';
      case 'nebula':
        return 'border-purple-400 bg-purple-500/15 shadow-purple-500/40';
      case 'emerald':
        return 'border-emerald-400 bg-emerald-500/15 shadow-emerald-500/40';
      case 'sunset':
        return 'border-amber-400 bg-amber-500/15 shadow-amber-500/40';
      case 'dark':
      default:
        return 'border-cyan-400 bg-cyan-500/15 shadow-cyan-500/40';
    }
  };

  const getDotBg = () => {
    switch (themeMode) {
      case 'light':
        return 'bg-blue-600';
      case 'nebula':
        return 'bg-purple-400';
      case 'emerald':
        return 'bg-emerald-400';
      case 'sunset':
        return 'bg-amber-400';
      case 'dark':
      default:
        return 'bg-cyan-400';
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* Outer Glowing Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-opacity-80 transition-all duration-150 ease-out backdrop-blur-[1px] shadow-lg ${getCursorAccent()} ${
          isHovered
            ? 'w-12 h-12 scale-125 border-2 bg-opacity-30'
            : isClicked
            ? 'w-6 h-6 scale-90 opacity-90'
            : 'w-8 h-8 opacity-75'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Inner Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full shadow-sm transition-transform duration-75 ease-out ${getDotBg()} ${
          isHovered ? 'scale-150' : isClicked ? 'scale-75' : 'scale-100'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

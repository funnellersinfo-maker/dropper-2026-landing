'use client';

import { useEffect, useRef, useState } from "react";

export default function LogisticTruck() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const distortionAmount = 15;
  const distX = (mousePos.x - 200) / 200 * distortionAmount;
  const distY = (mousePos.y - 150) / 150 * distortionAmount;

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
      <svg ref={svgRef} viewBox="0 0 400 300" className="w-full h-full max-w-2xl" style={{ filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))" }}>
        <path d="M 0 150 Q 100 140 200 150 T 400 150" stroke="rgba(100, 150, 200, 0.3)" strokeWidth="60" fill="none" strokeLinecap="round" />
        <path d="M 0 150 Q 100 140 200 150 T 400 150" stroke="rgba(100, 150, 200, 0.2)" strokeWidth="2" fill="none" strokeDasharray="20,20" strokeLinecap="round" />
        <g style={{ transform: `translate(${distX}px, ${distY}px)`, transition: "transform 0.1s ease-out" }}>
          <rect x="80" y="120" width="50" height="40" rx="8" fill="rgba(59, 130, 246, 0.6)" />
          <rect x="85" y="125" width="40" height="20" rx="4" fill="rgba(100, 150, 255, 0.4)" />
          <rect x="135" y="110" width="120" height="50" rx="8" fill="rgba(100, 150, 246, 0.5)" />
          <rect x="140" y="115" width="30" height="15" fill="rgba(59, 130, 246, 0.3)" />
          <rect x="175" y="115" width="30" height="15" fill="rgba(59, 130, 246, 0.3)" />
          <rect x="210" y="115" width="30" height="15" fill="rgba(59, 130, 246, 0.3)" />
          <circle cx="110" cy="165" r="12" fill="rgba(50, 100, 200, 0.7)" />
          <circle cx="110" cy="165" r="8" fill="rgba(30, 60, 150, 0.5)" />
          <circle cx="220" cy="165" r="12" fill="rgba(50, 100, 200, 0.7)" />
          <circle cx="220" cy="165" r="8" fill="rgba(30, 60, 150, 0.5)" />
          <circle cx="240" cy="165" r="12" fill="rgba(50, 100, 200, 0.7)" />
          <circle cx="240" cy="165" r="8" fill="rgba(30, 60, 150, 0.5)" />
          <circle cx="85" cy="135" r="3" fill="rgba(255, 200, 0, 0.8)" />
          <circle cx="250" cy="155" r="3" fill="rgba(255, 100, 0, 0.8)" />
        </g>
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
      </svg>
    </div>
  );
}

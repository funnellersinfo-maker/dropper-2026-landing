'use client';

import { useEffect, useRef } from "react";

export default function DistortionChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mousePosRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const animate = () => {
      timeRef.current += 0.01;
      const mousePos = mousePosRef.current;

      ctx.fillStyle = "rgba(3, 3, 3, 0.1)";
      ctx.fillRect(0, 0, width, height);

      const barCount = 8;
      const barWidth = width / (barCount + 2);
      const baseHeight = height * 0.6;

      for (let i = 0; i < barCount; i++) {
        const x = (i + 1) * barWidth;
        const dx = mousePos.x - x;
        const dy = mousePos.y - baseHeight / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const distortionStrength = Math.max(0, 100 - distance) / 100;

        const baseBarHeight = baseHeight * (0.3 + 0.4 * (i / barCount)) + Math.sin(timeRef.current + i * 0.5) * 20;
        const distortedHeight = baseBarHeight + distortionStrength * 40;

        const hue = (i / barCount) * 60 + 180;
        const saturation = 70 + distortionStrength * 30;
        const lightness = 50 + distortionStrength * 10;

        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const barRadius = 8;
        ctx.beginPath();
        ctx.moveTo(x - barWidth / 2 + barRadius, height - distortedHeight);
        ctx.lineTo(x + barWidth / 2 - barRadius, height - distortedHeight);
        ctx.quadraticCurveTo(x + barWidth / 2, height - distortedHeight, x + barWidth / 2, height - distortedHeight + barRadius);
        ctx.lineTo(x + barWidth / 2, height);
        ctx.lineTo(x - barWidth / 2, height);
        ctx.lineTo(x - barWidth / 2, height - distortedHeight + barRadius);
        ctx.quadraticCurveTo(x - barWidth / 2, height - distortedHeight, x - barWidth / 2 + barRadius, height - distortedHeight);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness + 20}%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(0, 122, 255, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
      style={{ filter: "blur(1px)", mixBlendMode: "screen" }}
    />
  );
}

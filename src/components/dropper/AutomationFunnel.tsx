'use client';

import { useEffect, useRef, useState } from "react";
import ChatBot from "./ChatBot";

export default function AutomationFunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    ctx.clearRect(0, 0, width, height);

    const stages = [
      { label: "META", x: width * 0.1, y: height * 0.5, color: "rgba(59, 130, 246, 0.8)" },
      { label: "IA", x: width * 0.3, y: height * 0.5, color: "rgba(168, 85, 247, 0.8)" },
      { label: "LOGÍSTICA", x: width * 0.5, y: height * 0.5, color: "rgba(34, 197, 94, 0.8)" },
      { label: "ENTREGA", x: width * 0.7, y: height * 0.5, color: "rgba(249, 115, 22, 0.8)" },
      { label: "$$$", x: width * 0.9, y: height * 0.5, color: "rgba(34, 197, 94, 0.9)" },
    ];

    for (let i = 0; i < stages.length - 1; i++) {
      const from = stages[i];
      const to = stages[i + 1];
      const distToMouse = Math.sqrt(Math.pow(mousePos.x - (from.x + to.x) / 2, 2) + Math.pow(mousePos.y - from.y, 2));
      const lineIntensity = Math.max(0, 1 - distToMouse / 150);
      const lineWidth = 2 + lineIntensity * 4;

      ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 + lineIntensity * 0.6})`;
      ctx.lineWidth = lineWidth + 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(from.x + 35, from.y);
      ctx.lineTo(to.x - 35, to.y);
      ctx.stroke();

      ctx.strokeStyle = `rgba(100, 200, 255, ${0.4 + lineIntensity * 0.6})`;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(from.x + 35, from.y);
      ctx.lineTo(to.x - 35, to.y);
      ctx.stroke();

      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      const arrowSize = 6;
      ctx.fillStyle = `rgba(100, 200, 255, ${0.4 + lineIntensity * 0.6})`;
      ctx.beginPath();
      ctx.moveTo(to.x - 35, to.y);
      ctx.lineTo(to.x - 35 - arrowSize * Math.cos(angle - Math.PI / 6), to.y - arrowSize * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(to.x - 35 - arrowSize * Math.cos(angle + Math.PI / 6), to.y - arrowSize * Math.sin(angle + Math.PI / 6));
      ctx.fill();
    }

    stages.forEach((stage) => {
      const distToMouse = Math.sqrt(Math.pow(mousePos.x - stage.x, 2) + Math.pow(mousePos.y - stage.y, 2));
      const hoverScale = Math.max(1, 1 + (1 - Math.min(1, distToMouse / 100)) * 0.2);
      const radius = 35 * hoverScale;

      ctx.fillStyle = `rgba(59, 130, 246, ${0.1 + (1 - Math.min(1, distToMouse / 100)) * 0.3})`;
      ctx.beginPath();
      ctx.arc(stage.x, stage.y, radius + 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = stage.color;
      ctx.beginPath();
      ctx.arc(stage.x, stage.y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.arc(stage.x, stage.y, radius * 0.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.font = `bold ${12 * hoverScale}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(stage.label, stage.x, stage.y);
    });

    const time = Date.now() / 1000;
    for (let i = 0; i < 8; i++) {
      const progress = (time * 0.3 + i * 0.125) % 1;
      const stageIndex = Math.floor(progress * (stages.length - 1));
      const nextStageIndex = Math.min(stageIndex + 1, stages.length - 1);
      const localProgress = (progress * (stages.length - 1)) % 1;
      const from = stages[stageIndex];
      const to = stages[nextStageIndex];
      const x = from.x + (to.x - from.x) * localProgress;
      const y = from.y + (to.y - from.y) * localProgress;
      ctx.fillStyle = `rgba(100, 200, 255, ${0.7 - progress * 0.7})`;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [mousePos]);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-black via-blue-950/5 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            PILOTO AUTOMÁTICO <span className="text-gradient-blue">EVERGREEN</span>
          </h2>
          <p className={`text-gray-400 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.1s" }}>
            Tu infraestructura trabaja 24/7. Tú solo generas tráfico. El sistema hace el resto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`liquid-glass rounded-3xl p-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.2s" }}>
            <canvas ref={canvasRef} className="w-full h-64 rounded-2xl" style={{ background: "rgba(15, 23, 42, 0.5)" }} />
          </div>
          <div className={`hidden lg:block transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.3s" }}>
            <ChatBot />
          </div>
        </div>

        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.4s" }}>
          {[
            { emoji: "📱", title: "Tráfico", desc: "Generas tráfico con Meta, TikTok o Google Ads" },
            { emoji: "🤖", title: "IA Inteligente", desc: "Convierte visitantes en clientes automáticamente" },
            { emoji: "📦", title: "Logística", desc: "Pedidos, inventario y envíos sin intervención" },
            { emoji: "💰", title: "Ganancias", desc: "Cobra cada venta. Dinero pasivo real." },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

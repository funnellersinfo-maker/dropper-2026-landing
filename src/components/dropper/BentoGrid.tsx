'use client';

import { ArrowUpRight, Bot, Layout, Package, ShoppingBag, Truck, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LogisticTruck from "./LogisticTruck";

export default function BentoGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="motor" className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative" ref={sectionRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 -z-10">
        <LogisticTruck />
      </div>
      <div className="text-center mb-20">
        <h2 className={`text-4xl md:text-6xl font-black tracking-tighter mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          EL MOTOR DE <span className="text-gradient-blue">DROPPER</span>
        </h2>
        <p className={`text-gray-400 max-w-xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.1s" }}>
          Cinco pilares tecnológicos diseñados para eliminar la fricción operativa y maximizar tus márgenes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
        {/* Tienda Pro */}
        <div className={`md:col-span-8 liquid-glass rounded-[40px] p-10 flex flex-col justify-between overflow-hidden relative group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.1s" }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-600/20 transition-colors" />
          <div>
            <Layout className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-3xl font-bold mb-4">Tienda Pro 2026</h3>
            <p className="text-gray-400 max-w-md">Diseño de ultra-alta conversión optimizado por IA. Carga instantánea y arquitectura psicológica de venta.</p>
          </div>
          <div className="mt-10 flex items-end justify-between">
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold border border-white/10">MOBILE FIRST</span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold border border-white/10">SEO OPTIMIZED</span>
            </div>
            <ArrowUpRight className="w-8 h-8 text-gray-600 group-hover:text-blue-500 transition-colors" />
          </div>
        </div>

        {/* Catálogo */}
        <div className={`md:col-span-4 liquid-glass rounded-[40px] p-10 flex flex-col justify-between transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.2s" }}>
          <div>
            <ShoppingBag className="w-12 h-12 text-yellow-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Catálogo Curado</h3>
            <p className="text-gray-400 text-sm">Productos ganadores validados por algoritmos de tendencia global.</p>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
              <span>WINNING RATE</span>
              <span className="text-yellow-500">94%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full w-[94%]" />
            </div>
          </div>
        </div>

        {/* Logística */}
        <div className={`md:col-span-4 liquid-glass rounded-[40px] p-10 flex flex-col justify-between transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.3s" }}>
          <div>
            <Truck className="w-12 h-12 text-pink-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Logística Directa</h3>
            <p className="text-gray-400 text-sm">Conexión directa con bodegas locales e internacionales. Envíos en 24-48h.</p>
          </div>
          <div className="mt-10 flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-white/10"><Zap className="w-4 h-4 text-blue-400" /></div>
            <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center border border-white/10"><Package className="w-4 h-4 text-pink-400" /></div>
          </div>
        </div>

        {/* IA Brain */}
        <div className={`md:col-span-8 liquid-glass rounded-[40px] p-10 flex flex-col justify-between overflow-hidden relative group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.4s" }}>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10" />
          <div className="flex flex-col md:flex-row gap-10 h-full">
            <div className="flex-1">
              <Zap className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Cerebro de IA</h3>
              <p className="text-gray-400">Un agente autónomo configurado para cerrar ventas, resolver dudas y gestionar pedidos 24/7 sin intervención humana.</p>
            </div>
            <div className="flex-1 liquid-glass rounded-3xl p-6 border-white/5 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                <span className="text-xs font-bold text-blue-400">AI AGENT ACTIVE</span>
              </div>
              <div className="space-y-3">
                <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-[10px] max-w-[80%]">¿Tienen este producto en azul?</div>
                <div className="bg-blue-600/20 p-3 rounded-2xl rounded-tr-none text-[10px] max-w-[80%] ml-auto border border-blue-500/20">¡Hola! Sí, nos quedan 3 unidades en azul. ¿Deseas que reserve una para ti?</div>
                <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-[10px] max-w-[80%]">Sí, por favor.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

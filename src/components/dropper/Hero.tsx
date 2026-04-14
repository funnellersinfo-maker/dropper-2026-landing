'use client';

import DistortionChart from "./DistortionChart";
import { TrendingUp, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663361269490/cXGEtqbGKFmipAQG4FeQQt/dropper-hero-bg-6sWmgkrRkBqYiaUDwrEqYm.webp";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40" style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute inset-0 w-full h-1/2 z-0">
        <DistortionChart />
      </div>

      <div className="max-w-5xl text-center z-10 relative">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs font-bold tracking-widest text-blue-400 mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          EST. 2026 | PROTOCOLO IA ACTIVO
        </div>

        <h1 className={`text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 md:mb-10 leading-[1.1] sm:leading-[0.95] md:leading-[0.9] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.1s" }}>
          TU ECOSISTEMA DE <br />
          <span className="text-gradient-blue">E-COMMERCE CON IA</span>. <br />
          PAGO ÚNICO.
        </h1>

        <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10 md:mb-14 px-4 sm:px-2 leading-relaxed transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.2s" }}>
          Sin mensualidades. Sin complicaciones. Solo escala. La infraestructura definitiva para el
          dropshipping del futuro, conectada y automatizada.
        </p>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.3s" }}>
          <a href="https://wa.link/li0vhy" target="_blank" rel="noopener noreferrer" className="btn-dopamine-blue w-full sm:w-auto inline-block text-center py-3 px-8 rounded-full">ADQUIRIR ACCESO ÉLITE</a>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?u=1" className="w-10 h-10 rounded-full border-2 border-black" alt="User" />
              <img src="https://i.pravatar.cc/100?u=2" className="w-10 h-10 rounded-full border-2 border-black" alt="User" />
              <img src="https://i.pravatar.cc/100?u=3" className="w-10 h-10 rounded-full border-2 border-black" alt="User" />
            </div>
            <span>+2,400 Droppers activos</span>
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 left-10 animate-float opacity-20 md:opacity-100 hidden lg:block">
        <div className="liquid-glass p-4 rounded-2xl rotate-12">
          <TrendingUp className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      <div className="absolute bottom-1/4 right-10 animate-float opacity-20 md:opacity-100 hidden lg:block" style={{ animationDelay: "1s" }}>
        <div className="liquid-glass p-4 rounded-2xl -rotate-12">
          <Zap className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <div className="w-full mt-32 border-y border-white/5 py-10 overflow-hidden bg-white/[0.02]">
        <div className="flex gap-20 items-center animate-marquee">
          {["COORDINADORA", "INTERRAPIDÍSIMO", "ENVÍA", "SWAYP", "TCC", "INVIMA"].map((brand, idx) => (
            <span key={idx} className="text-2xl font-black text-gray-700 whitespace-nowrap">{brand}</span>
          ))}
          {["COORDINADORA", "INTERRAPIDÍSIMO", "ENVÍA", "SWAYP", "TCC", "INVIMA"].map((brand, idx) => (
            <span key={`repeat-${idx}`} className="text-2xl font-black text-gray-700 whitespace-nowrap">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

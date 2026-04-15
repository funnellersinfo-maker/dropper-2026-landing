'use client';

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PRICING_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663361269490/cXGEtqbGKFmipAQG4FeQQt/dropper-pricing-bg-kVVAb9PKKcxbvYw8eXHAb7.webp";

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const plans = [
    { name: "Core", price: 290, color: "blue", link: "https://wa.link/j36ape", features: ["1 Nicho de Mercado", "1 Asistente de IA base", "Catálogo Ganador Base", "Logística Nacional", "Grupo de soporte"], badge: null },
    { name: "Boost", price: 390, color: "gold", link: "https://wa.link/74hk5o", features: ["Hasta 2 nichos ganadores", "1 Asistente ($50 USD asistente extra)", "Catálogo Ganador Base", "Logística Nacional", "Capacitación marketing dopamínico", "Grupo de Soporte"], badge: "MÁS POPULAR" },
    { name: "Scale", price: 490, color: "pink", link: "https://wa.link/nqhs4k", features: ["Hasta 4 nichos", "1 Asistente ($100 USD promo x3 asistentes extras)", "Catálogo Ganador Base", "Logística Nacional", "Consultoría 1-on-1", "Capacitación marketing dopamínico y landing pages con IA", "Grupo y Soporte prioritario"], badge: null },
  ];

  return (
    <section id="precios" className="py-16 md:py-32 px-4 md:px-6 relative" ref={sectionRef} style={{ backgroundImage: `url(${PRICING_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-black/60 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[150px] -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-6xl font-black tracking-tighter mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            INVERSIÓN EN TU <span className="text-gradient-gold">LIBERTAD</span>
          </h2>
          <p className={`text-gray-400 max-w-xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.1s" }}>
            Sin mensualidades. Un solo pago para desbloquear tu infraestructura de por vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={plan.name} className={`liquid-glass rounded-[40px] p-10 flex flex-col relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${plan.badge ? "md:scale-105 border-blue-500/30" : ""}`} style={{ transitionDelay: `${0.2 + idx * 0.1}s` }}>
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-1 rounded-full text-[10px] font-black tracking-widest text-black">{plan.badge}</div>
              )}
              <div className="mb-8">
                <span className={`font-bold text-xs tracking-widest uppercase ${plan.color === "blue" ? "text-blue-500" : plan.color === "gold" ? "text-yellow-500" : "text-pink-500"}`}>
                  Plan {plan.name}
                </span>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className={`text-5xl font-black ${plan.color === "blue" ? "" : plan.color === "gold" ? "text-gradient-gold" : "text-gradient-pink"}`}>
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 font-bold">USD</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.color === "blue" ? "text-blue-500" : plan.color === "gold" ? "text-yellow-500" : "text-pink-500"}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href={plan.link} target="_blank" rel="noopener noreferrer" className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 inline-block text-center ${plan.badge ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/20" : "border border-white/10 hover:bg-white/5"}`}>
                SELECCIONAR {plan.name.toUpperCase()}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

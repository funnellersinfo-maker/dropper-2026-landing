'use client';

import { Globe, Banknote, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FLAG_COLORS = {
  yellow: "#FCD116",
  blue: "#003893",
  red: "#CE1126",
};

export default function ColombiaMarket() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: <MapPin className="w-7 h-7" />,
      title: "Mercado #1 de E-commerce en la Región",
      desc: "Colombia lidera el crecimiento de comercio electrónico en Latinoamérica. +$40 billones COP en ventas anuales y una penetración digital que no para de crecer. El mercado perfecto para escalar.",
      color: FLAG_COLORS.yellow,
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Opera Desde Cualquier Parte del Mundo",
      desc: "No importa si estás en Medellín, Buenos Aires, Madrid o Miami. Dropper es 100% remoto. Solo necesitas conexión a internet y una computadora para gestionar tu imperio digital desde cualquier latitud.",
      color: FLAG_COLORS.blue,
    },
    {
      icon: <Banknote className="w-7 h-7" />,
      title: "Gana en Tu Moneda Local Automáticamente",
      desc: "Todas tus comisiones se convierten y depositan directamente en la moneda de tu país. Sin intermediarios, sin complicaciones cambiarias. COP, MXN, ARS, PEN, USD, EUR y más de 50 monedas disponibles.",
      color: FLAG_COLORS.red,
    },
  ];

  const stats = [
    { value: "50M+", label: "Población Digital" },
    { value: "73%", label: "Crecimiento Anual" },
    { value: "24h", label: "Despacho Nacional" },
    { value: "50+", label: "Monedas Automáticas" },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Colombian flag gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: `linear-gradient(90deg, ${FLAG_COLORS.yellow} 0%, ${FLAG_COLORS.yellow} 50%, ${FLAG_COLORS.blue} 50%, ${FLAG_COLORS.blue} 75%, ${FLAG_COLORS.red} 75%, ${FLAG_COLORS.red} 100%)` }} />

      {/* Background glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px] -z-10" style={{ background: `${FLAG_COLORS.yellow}10` }} />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[180px] -z-10" style={{ background: `${FLAG_COLORS.blue}10` }} />
      <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full blur-[150px] -z-10" style={{ background: `${FLAG_COLORS.red}08` }} />

      <div className="max-w-7xl mx-auto">
        {/* Header with flag */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Colombian flag badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="flex h-8 w-1 rounded-full" style={{ background: `linear-gradient(180deg, ${FLAG_COLORS.yellow} 50%, ${FLAG_COLORS.blue} 75%, ${FLAG_COLORS.red} 100%)` }} />
            <span className="text-xs font-black tracking-[0.2em] uppercase text-yellow-500">Hecho para Colombia</span>
            <div className="flex h-8 w-1 rounded-full" style={{ background: `linear-gradient(180deg, ${FLAG_COLORS.yellow} 50%, ${FLAG_COLORS.blue} 75%, ${FLAG_COLORS.red} 100%)` }} />
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.95]">
            <span style={{ color: FLAG_COLORS.yellow }}>EL PODER</span> DEL MERCADO
            <br />
            <span style={{ color: FLAG_COLORS.blue }}>COLOMBIANO</span> EN TUS MANOS
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Colombia es la mina de oro del e-commerce latinoamericano. Dropper te da la infraestructura
            completa para capturar ese mercado, sin importar desde dónde operes ni en qué moneda cobres.
          </p>
        </div>

        {/* Stats row */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.1s" }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="liquid-glass rounded-2xl p-5 md:p-6 text-center group hover:scale-[1.03] transition-transform duration-300">
              <p className="text-2xl md:text-3xl font-black mb-1" style={{ color: [FLAG_COLORS.yellow, FLAG_COLORS.blue, FLAG_COLORS.red, "#00D4FF"][idx] }}>
                {stat.value}
              </p>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`liquid-glass rounded-[32px] p-8 md:p-10 flex flex-col relative group hover:scale-[1.02] transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${0.2 + idx * 0.15}s` }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full" style={{ background: benefit.color }} />

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${benefit.color}15` }}>
                <span style={{ color: benefit.color }}>{benefit.icon}</span>
              </div>

              <h3 className="text-xl font-bold mb-4 leading-tight">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

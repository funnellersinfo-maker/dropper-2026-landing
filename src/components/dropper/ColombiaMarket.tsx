'use client';

import { Globe, Banknote, Shield, TrendingUp, MapPin, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FLAG_COLORS = {
  yellow: "#FCD116",
  blue: "#003893",
  red: "#CE1126",
};

const currencies = [
  { code: "COP", symbol: "$", name: "Peso Colombiano", flag: "🇨🇴" },
  { code: "MXN", symbol: "$", name: "Peso Mexicano", flag: "🇲🇽" },
  { code: "ARS", symbol: "$", name: "Peso Argentino", flag: "🇦🇷" },
  { code: "PEN", symbol: "S/", name: "Sol Peruano", flag: "🇵🇪" },
  { code: "USD", symbol: "$", name: "Dólar USA", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "CLP", symbol: "$", name: "Peso Chileno", flag: "🇨🇱" },
  { code: "BRL", symbol: "R$", name: "Real Brasilero", flag: "🇧🇷" },
];

export default function ColombiaMarket() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCurrency((prev) => (prev + 1) % currencies.length);
    }, 2500);
    return () => clearInterval(interval);
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

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-bold" style={{ color: benefit.color }}>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>VER MÁS</span>
              </div>
            </div>
          ))}
        </div>

        {/* Currency ticker + Global reach */}
        <div className={`liquid-glass rounded-[32px] p-8 md:p-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.5s" }}>
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Left: Currency auto-conversion */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${FLAG_COLORS.yellow}15` }}>
                  <Banknote className="w-5 h-5" style={{ color: FLAG_COLORS.yellow }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Conversión Automática a Tu Moneda</h3>
                  <p className="text-xs text-gray-500">Gana en la tuya, siempre.</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Tus comisiones se procesan y convierten automáticamente al tipo de cambio del día. Sin comisiones ocultas, sin esperas bancarias, sin dolores de cabeza. Solo ves tus ganancias reflejadas en tu moneda local.
              </p>

              {/* Rotating currency display */}
              <div className="relative h-16 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
                {currencies.map((currency, idx) => (
                  <div
                    key={currency.code}
                    className="absolute inset-0 flex items-center justify-between px-6 transition-all duration-500"
                    style={{
                      transform: activeCurrency === idx ? "translateY(0) opacity(1" : activeCurrency > idx ? "translateY(-100%) opacity-0" : "translateY(100%) opacity-0",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{currency.flag}</span>
                      <div>
                        <p className="font-bold text-sm">{currency.code}</p>
                        <p className="text-[10px] text-gray-500">{currency.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-xs font-bold text-green-400">ACTIVO</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Currency dots */}
              <div className="flex gap-1.5 mt-4 justify-center">
                {currencies.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCurrency(idx)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: activeCurrency === idx ? "24px" : "6px",
                      height: "6px",
                      background: activeCurrency === idx ? "#FCD116" : "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Global reach visual */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${FLAG_COLORS.blue}15` }}>
                  <Globe className="w-5 h-5" style={{ color: FLAG_COLORS.blue }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Desde Cualquier País</h3>
                  <p className="text-xs text-gray-500">Sin fronteras, sin límites.</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Operadores de Dropper están activos en más de 15 países. La plataforma se adapta completamente a tu zona horaria, idioma y moneda. Tú pones la ambición, Dropper pone la infraestructura.
              </p>

              {/* World map dots visual */}
              <div className="relative h-48 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Simplified continent outlines - dots pattern */}
                  {/* South America */}
                  <circle cx="180" cy="130" r="3" fill={FLAG_COLORS.yellow} opacity="0.6">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="195" cy="120" r="2.5" fill={FLAG_COLORS.yellow} opacity="0.8">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="190" cy="140" r="2" fill={FLAG_COLORS.blue} opacity="0.6">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="135" r="1.5" fill={FLAG_COLORS.red} opacity="0.5" />
                  <circle cx="175" cy="145" r="1.5" fill={FLAG_COLORS.yellow} opacity="0.4" />
                  <circle cx="185" cy="155" r="2" fill={FLAG_COLORS.blue} opacity="0.5" />
                  <circle cx="195" cy="150" r="1" fill={FLAG_COLORS.red} opacity="0.6" />

                  {/* Colombia highlight */}
                  <circle cx="185" cy="128" r="8" fill="none" stroke={FLAG_COLORS.yellow} strokeWidth="1" opacity="0.4">
                    <animate attributeName="r" values="6;12;6" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="185" cy="128" r="4" fill={FLAG_COLORS.yellow} opacity="0.9">
                    <animate attributeName="r" values="3.5;4.5;3.5" dur="1.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Central America & Mexico */}
                  <circle cx="155" cy="100" r="1.5" fill={FLAG_COLORS.yellow} opacity="0.5" />
                  <circle cx="140" cy="90" r="2" fill={FLAG_COLORS.yellow} opacity="0.6" />
                  <circle cx="148" cy="95" r="1" fill={FLAG_COLORS.blue} opacity="0.4" />

                  {/* North America */}
                  <circle cx="120" cy="65" r="2" fill={FLAG_COLORS.blue} opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="110" cy="55" r="1.5" fill={FLAG_COLORS.blue} opacity="0.4" />
                  <circle cx="130" cy="60" r="1" fill={FLAG_COLORS.red} opacity="0.3" />

                  {/* Europe */}
                  <circle cx="280" cy="50" r="2" fill={FLAG_COLORS.blue} opacity="0.6">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" begin="0.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="290" cy="45" r="1.5" fill={FLAG_COLORS.yellow} opacity="0.4" />
                  <circle cx="275" cy="55" r="1" fill={FLAG_COLORS.red} opacity="0.3" />
                  <circle cx="300" cy="60" r="1.5" fill={FLAG_COLORS.blue} opacity="0.5" />

                  {/* Connection lines */}
                  <line x1="185" y1="128" x2="140" y2="90" stroke={FLAG_COLORS.yellow} strokeWidth="0.5" opacity="0.15" strokeDasharray="4 4">
                    <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="185" y1="128" x2="120" y2="65" stroke={FLAG_COLORS.blue} strokeWidth="0.5" opacity="0.1" strokeDasharray="4 4">
                    <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" begin="0.3s" repeatCount="indefinite" />
                  </line>
                  <line x1="185" y1="128" x2="280" y2="50" stroke={FLAG_COLORS.blue} strokeWidth="0.5" opacity="0.1" strokeDasharray="4 4">
                    <animate attributeName="stroke-dashoffset" values="0;8" dur="3s" repeatCount="indefinite" />
                  </line>
                </svg>

                {/* Labels */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: FLAG_COLORS.yellow }} />
                  <span className="text-[10px] font-bold text-gray-500">15+ PAÍSES ACTIVOS</span>
                </div>
                <div className="absolute bottom-3 right-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: FLAG_COLORS.blue }} />
                  <span className="text-[10px] font-bold text-gray-500">24/7 GLOBAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA with Colombian flag */}
        <div className={`mt-12 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.7s" }}>
          <div className="inline-flex items-center gap-4 liquid-glass rounded-full px-6 py-3">
            <div className="flex gap-0.5">
              <div className="w-3 h-8 rounded-l-sm" style={{ background: FLAG_COLORS.yellow }} />
              <div className="w-3 h-8" style={{ background: FLAG_COLORS.blue }} />
              <div className="w-3 h-8 rounded-r-sm" style={{ background: FLAG_COLORS.red }} />
            </div>
            <span className="text-sm font-bold text-gray-300">
              Potencia tu negocio en el mercado que más crece de la región
            </span>
            <div className="flex gap-0.5">
              <div className="w-3 h-8 rounded-l-sm" style={{ background: FLAG_COLORS.red }} />
              <div className="w-3 h-8" style={{ background: FLAG_COLORS.blue }} />
              <div className="w-3 h-8 rounded-r-sm" style={{ background: FLAG_COLORS.yellow }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    { name: "Carlos Mendoza", role: "Dropper Élite", text: "En 3 meses pasé de $0 a $15,000 USD mensuales. Dropper automatizó todo lo que no sabía cómo hacer.", image: "/testimonials/carlos.jpg" },
    { name: "María Rodríguez", role: "Emprendedora Digital", text: "La IA hace el trabajo que antes me tomaba 40 horas semanales. Ahora solo genero tráfico y gano.", image: "/testimonials/maria.jpg" },
    { name: "Juana Pérez", role: "Emprendedora E-commerce", text: "Pago una sola vez y tengo infraestructura vitalicia. Es el mejor ROI que he hecho en mi vida.", image: "/testimonials/juana.jpg" },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-black to-blue-950/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            CASOS DE ÉXITO
          </h2>
          <p className={`text-gray-400 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0.1s" }}>
            Lo que dicen nuestros Droppers más exitosos
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className={`liquid-glass rounded-3xl p-8 flex flex-col transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${0.2 + idx * 0.1}s` }}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />))}
              </div>
              <p className="text-gray-300 mb-6 flex-1 leading-relaxed">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-blue-500" />
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

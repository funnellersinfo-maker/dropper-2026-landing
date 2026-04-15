'use client';

import { Plus } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: "¿Por qué no hay mensualidades?", answer: "Creemos en la propiedad real. Al adquirir Dropper, compras la licencia vitalicia de tu infraestructura. Solo pagas una vez, vendes para siempre, sin 'impuestos' de plataforma mensuales, solo generas tu tráfico y listo." },
    { question: "¿Necesito experiencia previa?", answer: "No. El 'Cerebro de IA' y el catálogo curado están diseñados para que cualquier persona, sin importar su nivel técnico, pueda lanzar y operar una tienda exitosa en cuestión de horas." },
    { question: "¿Qué tan inteligente es realmente la IA?", answer: "Utilizamos modelos de lenguaje de última generación (2026-2027 stack) entrenados específicamente en psicología de ventas y atención al cliente. No solo responde dudas, sino que aplica técnicas de upselling y cross-selling de forma orgánica." },
  ];

  return (
    <section id="faq" className="py-16 md:py-32 px-4 md:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">DUDAS FRECUENTES</h2>
        <p className="text-gray-400">Todo lo que necesitas saber sobre la revolución Dropper.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="liquid-glass rounded-3xl p-6">
            <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex items-center justify-between text-left font-bold text-lg hover:text-blue-400 transition-colors">
              <span>{faq.question}</span>
              <Plus className={`w-6 h-6 text-blue-500 transition-transform duration-300 ${openIndex === idx ? "rotate-45" : ""}`} />
            </button>
            {openIndex === idx && (
              <div className="mt-4 text-gray-400 text-sm leading-relaxed animate-reveal">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

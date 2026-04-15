'use client';

import { Send, MessageCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// ──────────────────────────────────────────────
// MOTOR DE RESPUESTAS — AGENTE ÉLITE DE VENTAS
// ──────────────────────────────────────────────

type ResponseRule = {
  keywords: string[];
  response: string;
  typingDelay: number; // ms — simula tiempo de "escribiendo..."
};

const RESPONSE_RULES: ResponseRule[] = [
  {
    keywords: ["hola", "buenas", "saludos", "hey", "hi", "buenos dias", "buenas tardes", "buenas noches"],
    response: "¡Hola! Soy el Agente de IA de Dropper 🤖. Estoy aquí para demostrarte cómo puedo cerrar ventas por ti 24/7 mientras tú duermes. ¿Qué te gustaría saber sobre nuestro ecosistema automatizado?",
    typingDelay: 900,
  },
  {
    keywords: ["precio", "precios", "costo", "costa", "cuanto", "cuánto", "cuanto vale", "cuánto vale", "planes", "plan", "pagar", "pago", "inversion", "inversión", "dinero"],
    response: "¡Vamos al grano! 💸 Tenemos 3 planes de implementación (Core, Boost y Scale) desde $290 USD. Y lo mejor: PAGO ÚNICO. CERO MENSUALIDADES. Todo el ecosistema es tuyo. ¿Te muestro qué incluye el plan favorito?",
    typingDelay: 1100,
  },
  {
    keywords: ["como funciona", "cómo funciona", "informacion", "información", "dropshipping", "drop", "logistica", "logística", "colombia", "envio", "envío", "funciona", "sistema", "que es", "qué es", "que incluye", "qué incluye"],
    response: "Es simple: Nosotros te armamos una tienda pro, te conectamos con bodegas locales, configuramos tu catálogo y me instalan a mí (tu Cerebro IA) para atender a tus clientes de inmediato. Tú solo traes el tráfico, nosotros ponemos el sistema. 🚀",
    typingDelay: 1300,
  },
  {
    keywords: ["humano", "asesor", "hablar con alguien", "persona", "agente real", "soporte", "contacto", "ayuda", "whatsapp", "whats", "wa"],
    response: "¡Por supuesto! Como soy una demo de la landing, mi conocimiento es limitado. Pero si comentas 'YO' en nuestras redes o haces clic en el botón de abajo, Alejo y el equipo te darán atención VIP. 🤝",
    typingDelay: 1000,
  },
  {
    keywords: ["ganancia", "ganancias", "ganar", "sueldo", "ingreso", "ingresos", "renta", "rentabilidad", "roi", "retorno", "cuanto gano", "cuánto gano"],
    response: "Nuestros Droppers generan entre $2,000 y $50,000 USD mensuales. Todo depende de tu inversión en tráfico. La belleza del modelo: el sistema escala contigo sin pagar mensualidades extras. 💰",
    typingDelay: 1100,
  },
  {
    keywords: ["ia", "inteligencia", "chatbot", "bot", "cerebro", "automat", "robot", "cerebro de ia"],
    response: "Yo soy tu Cerebro IA 🧠. En la versión real, estoy entrenado con psicología de ventas, conozco cada producto de tu catálogo, aplico upselling orgánico, resuelto dudas al instante y cierro pedidos sin que levantes un dedo. Pago único, beneficios infinitos.",
    typingDelay: 1200,
  },
  {
    keywords: ["tienda", "pagina", "página", "web", "diseño", "ecommerce", "e-commerce", "shopify", "tienda online"],
    response: "Tu Tienda Pro 2026 viene lista para vender: diseño mobile-first de ultra-alta conversión, SEO optimizado, velocidad de carga brutal y arquitectura psicológica de venta. Todo incluido en tu pago único. 🏪",
    typingDelay: 1100,
  },
  {
    keywords: ["catalogo", "catálogo", "producto", "productos", "proveedor", "bodega", "inventario"],
    response: "Nuestro catálogo está curado por algoritmos de tendencia global. Cada producto tiene un winning rate del 94%. Nosotros manejamos inventario y conexión directa con bodegas locales e internacionales. Tú solo eliges tu nicho. 📦",
    typingDelay: 1200,
  },
  {
    keywords: ["si", "sip", "claro", "dale", "ok", "vale", "bueno", "interesa", "me interesa", "quiero", "dime"],
    response: "¡Excelente actitud! 🎯 La mejor forma de empezar es seleccionando tu plan ideal. Recuerda: CERO mensualidades. Pagas una vez y escalas para siempre. ¿Prefieres el plan Core ($290), Boost ($390) o Scale ($490)?",
    typingDelay: 1000,
  },
  {
    keywords: ["no", "nop", "nah", "duda", "dudo", "inseguro", "miedo", "riesgo", "estafa", "fraude"],
    response: "Totalmente válido sentir eso al inicio. Por eso Dropper está diseñado para eliminar fricción: sin mensualidades, con soporte real, IA que trabaja por ti y resultados medibles. Carlos pasó de $0 a $15K en 3 meses. Tu inversión es segura. 🛡️",
    typingDelay: 1300,
  },
  {
    keywords: ["core", "boost", "scale", "plan"],
    response: "Aquí tienes el resumen rápido:\n• Core ($290) — 1 nicho, IA base, logística nacional\n• Boost ($390) — 2 nichos, marketing dopamínico, grupo soporte\n• Scale ($490) — 4 nichos, consultoría 1-on-1, soporte VIP\n\nTodos: PAGO ÚNICO. CERO MENSUALIDADES. ¿Cuál resuena contigo?",
    typingDelay: 1500,
  },
  {
    keywords: ["gracias", "gracia", "genial", "increible", "perfecto", "excelente", "wow"],
    response: "¡Para eso estamos! 💪 Recuerda: el futuro del e-commerce es automatizado y Dropper ya lo tiene listo para ti. Cuando estés decidido, da clic en cualquiera de nuestros botones de WhatsApp. ¡Nos vemos del otro lado! 🚀",
    typingDelay: 1000,
  },
];

const FALLBACK_RESPONSE: ResponseRule = {
  keywords: [],
  response: "¡Interesante! 🥵 En un entorno real, yo estaría conectado a toda la base de conocimientos de tu tienda para responder eso con precisión milimétrica y cerrar la venta. ¿Ves el potencial de tener un clon tuyo trabajando sin descanso?",
  typingDelay: 1000,
};

const INITIAL_MESSAGE = "¡Hola! Soy el Agente de IA de Dropper 🤖. Soy una demo interactiva de lo que sería tu Cerebro de IA atendiendo clientes 24/7. Pregúntame sobre precios, cómo funciona, ganancias, la IA, planes o cualquier cosa. ¡Vamos! 🚀";

function getBotResponse(userMessage: string): { response: string; delay: number } {
  const lower = userMessage.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove accents for matching

  for (const rule of RESPONSE_RULES) {
    for (const keyword of rule.keywords) {
      const normalizedKeyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (lower.includes(normalizedKeyword)) {
        return { response: rule.response, delay: rule.typingDelay };
      }
    }
  }

  return { response: FALLBACK_RESPONSE.response, delay: FALLBACK_RESPONSE.typingDelay };
}

// ──────────────────────────────────────────────
// COMPONENTE CHATBOT
// ──────────────────────────────────────────────

const QUICK_PROMPTS = [
  "¿Cómo funciona?",
  "¿Cuánto cuesta?",
  "¿Cuánto puedo ganar?",
  "Quiero hablar con un humano",
  "¿Qué plan me recomiendas?",
];

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", text: INITIAL_MESSAGE, sender: "bot", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (overrideText?: string) => {
    const textToSend = overrideText || input.trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), text: textToSend, sender: "user", timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const { response, delay } = getBotResponse(textToSend);

    // Variable delay to simulate realistic typing
    await new Promise((resolve) => setTimeout(resolve, delay));

    const botMsg: Message = { id: (Date.now() + 1).toString(), text: response, sender: "bot", timestamp: new Date() };
    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="liquid-glass rounded-3xl p-6 h-[420px] flex flex-col bg-gradient-to-br from-blue-950/20 to-purple-950/20">
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <h3 className="font-bold text-white flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          Agente de Ventas IA — Demo Interactiva
        </h3>
        <p className="text-xs text-gray-500 mt-1">Responde a: precios, funcionamiento, IA, planes, logística, ganancias y más</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 scrollbar-thin">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-reveal`}>
            {msg.sender === "bot" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
              msg.sender === "user"
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-white/[0.08] text-gray-200 rounded-bl-sm border border-white/[0.05]"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="bg-white/[0.08] border border-white/[0.05] px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1.5 items-center">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.15s" }} />
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.3s" }} />
                <span className="text-[10px] text-gray-500 ml-1">escribiendo...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {QUICK_PROMPTS.map((q) => (
          <button
            key={q}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="text-[11px] bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-40 border border-white/[0.08] rounded-full px-3 py-1 text-gray-400 hover:text-white transition-all duration-200"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe tu pregunta aquí..."
          className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all duration-200"
          disabled={isLoading}
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-40 rounded-full p-2.5 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

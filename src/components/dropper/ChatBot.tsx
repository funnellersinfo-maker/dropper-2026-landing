'use client';

import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const BOT_RESPONSES: { [key: string]: string } = {
  hola: "¡Hola! Bienvenido a Dropper. Soy tu agente de ventas IA. ¿Quieres saber cómo ganar dinero con dropshipping sin experiencia?",
  "como funciona": "Es simple: 1️⃣ Generas tráfico a tu tienda 2️⃣ La IA convierte visitantes en clientes 3️⃣ Nosotros manejamos logística y envíos 4️⃣ Tú cobras ganancias. Sin mensualidades, pago único vitalicio.",
  precio: "Tenemos 3 planes: Core ($290), Boost ($390) y Scale ($490). Todos incluyen catálogo ganador, logística nacional e IA. ¿Cuál te interesa?",
  "cuanto gano": "Nuestros Droppers ganan entre $5,000 a $50,000 USD mensuales dependiendo de tráfico generado. Carlos pasó de $0 a $15,000 en 3 meses.",
  asistente: "Incluyes 1 asistente IA base en todos los planes. En Boost puedes agregar más a $50 USD c/u. En Scale a $100 USD promo (x3).",
  trafico: "Tú generas tráfico con Meta Ads, TikTok, Google o cualquier canal. Nosotros convertimos ese tráfico en ventas. El sistema hace el resto.",
  default: "Excelente pregunta. Eso es exactamente lo que hace Dropper: automatizar todo. ¿Quieres conocer más detalles sobre algún plan específico?",
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "¡Hola! Soy tu agente de ventas Dropper. ¿En qué puedo ayudarte hoy? Pregunta sobre precios, cómo funciona, ganancias potenciales, o cualquier cosa. 🚀", sender: "bot", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const getBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    for (const [keyword, response] of Object.entries(BOT_RESPONSES)) {
      if (keyword !== "default" && lower.includes(keyword)) return response;
    }
    return BOT_RESPONSES.default;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), text: input, sender: "user", timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const botResponse: Message = { id: (Date.now() + 1).toString(), text: getBotResponse(input), sender: "bot", timestamp: new Date() };
    setMessages((prev) => [...prev, botResponse]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="liquid-glass rounded-3xl p-6 h-96 flex flex-col bg-gradient-to-br from-blue-950/20 to-purple-950/20">
      <div className="mb-4 pb-4 border-b border-white/10">
        <h3 className="font-bold text-white flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          Agente de Ventas IA
        </h3>
        <p className="text-xs text-gray-500">Prueba cómo funciona nuestro sistema</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${msg.sender === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white/10 text-gray-200 rounded-bl-none"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-gray-200 px-4 py-2 rounded-2xl rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} placeholder="Pregunta sobre precios, ganancias, cómo funciona..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50" disabled={isLoading} />
        <button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-full p-2 transition-colors">
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {["¿Cómo funciona Dropper?", "¿Cuál es el precio?", "¿Cuánto puedo ganar?"].map((q) => (
          <button key={q} onClick={() => setInput(q)} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 text-gray-400 transition-colors">
            {q.replace("¿", "").replace("?", "")}
          </button>
        ))}
      </div>
    </div>
  );
}

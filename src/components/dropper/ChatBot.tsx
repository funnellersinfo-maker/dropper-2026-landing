'use client';

import { Send, MessageCircle, Sparkles } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const QUICK_PROMPTS = [
  "¿Cómo funciona Dropper?",
  "¿Cuánto cuestan los planes?",
  "¿Cuánto puedo ganar?",
  "¿Cómo funciona la logística?",
  "¿Qué plan me recomiendas?",
];

const INITIAL_MESSAGE = "¡Hola! Soy el Agente de IA de Dropper 🤖\n\nEstoy conectado a un motor de inteligencia artificial con memoria. Puedes preguntarme cualquier cosa sobre Dropper, los planes, la IA, logística, ganancias, o incluso temas fuera de esto — siempre encontraré una forma natural de ayudarte.\n\n¡Pruébame! Escribe lo que quieras. 🚀";

// Unique session per page load for conversation memory
const SESSION_ID = `dropper_session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", text: INITIAL_MESSAGE, sender: "bot", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendToAI = useCallback(async (userText: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          sessionId: SESSION_ID,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      if (data.reply) {
        setIsOnline(true);
        return data.reply;
      }
      throw new Error("Empty reply");
    } catch (error) {
      console.error("Chat fetch error:", error);
      setIsOnline(false);
      return "Hubo un problema de conexión. ¡Intenta de nuevo o escríbenos por WhatsApp! 📱";
    }
  }, []);

  const handleSendMessage = async (overrideText?: string) => {
    const textToSend = overrideText || input.trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Call real AI backend
    const botReply = await sendToAI(textToSend);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: botReply,
      sender: "bot",
      timestamp: new Date(),
    };
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
          <span className="flex items-center gap-1.5">
            Agente IA Dropper
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </span>
          <span className={`ml-auto text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full ${isOnline ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
            {isOnline ? "IA ONLINE" : "OFFLINE"}
          </span>
        </h3>
        <p className="text-xs text-gray-500 mt-1">Con memoria y conocimiento total de Dropper. Pregunta lo que sea.</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-reveal`}>
            {msg.sender === "bot" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white/[0.08] text-gray-200 rounded-bl-sm border border-white/[0.05]"
              }`}
            >
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
                <span className="text-[10px] text-gray-500 ml-1">pensando...</span>
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
          placeholder="Escribe cualquier pregunta..."
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

'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, MessageCircle, Sparkles, Smile, X } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const QUICK_PROMPTS = [
  "¿Cómo funciona Dropper?",
  "¿Cuánto cuestan los planes?",
  "¿Cuánto puedo ganar?",
];

const EMOJI_CATEGORIES = [
  { name: "Populares", emojis: ["👍", "❤️", "😂", "🔥", "🚀", "💯", "✅", "💪", "🤑", "💰", "⭐", "🙏", "😎", "🤩", "👏"] },
  { name: "Caras", emojis: ["😀", "😃", "😄", "😁", "😅", "🤣", "😂", "🙂", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "😌", "😔", "😪", "😴", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", "😮", "😯", "😲", "😳", "🥺", "🥹", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😤", "😡", "🤬", "💀", "🤡", "👻", "🤖"] },
  { name: "Manos", emojis: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "🫶", "🤲", "🤝", "🙏", "✍️", "💪"] },
  { name: "Corazones", emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "♥️"] },
  { name: "Cosas", emojis: ["⌚", "📱", "💻", "📷", "📞", "📺", "⚡", "💡", "📦", "📧", "💰", "💎", "🔑", "🛒", "🎁", "🏆", "🎯", "📊", "📈", "📉"] },
  { name: "Negocio", emojis: ["💼", "👔", "🏛️", "📊", "📈", "📉", "💰", "💵", "💎", "🏦", "🧾", "📋", "📅", "🤝", "💪", "🚀", "⭐", "✅", "❌", "⚠️"] },
];

const INITIAL_MESSAGE = "¡Hola! Soy el Agente de IA de Dropper 🤖\n\nPuedes preguntarme cualquier cosa sobre Dropper, planes, IA, logística o ganancias.\n\nToca una pregunta rápida o escribe lo que quieras. 🚀";

const SESSION_ID = `mob_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

export default function MobileChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", text: INITIAL_MESSAGE, sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showPrompts, setShowPrompts] = useState(true);
  const [showEmojis, setShowEmojis] = useState(false);
  const [emojiCat, setEmojiCat] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 50);
  }, [messages, isLoading, showPrompts]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const sendToAI = useCallback(async (text: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: SESSION_ID }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      if (data.reply) { setIsOnline(true); return data.reply; }
      throw new Error("empty");
    } catch {
      setIsOnline(false);
      return "Hubo un problema de conexión. ¡Intenta de nuevo o escríbenos por WhatsApp! 📱";
    }
  }, []);

  const handleSend = async (overrideText?: string) => {
    const text = overrideText || input.trim();
    if (!text || isLoading) return;

    // INSTANTLY hide prompts and emojis
    setShowPrompts(false);
    setShowEmojis(false);

    setMessages(prev => [...prev, { id: Date.now().toString(), text, sender: "user" }]);
    setInput("");
    setIsLoading(true);

    const reply = await sendToAI(text);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: reply, sender: "bot" }]);
    setIsLoading(false);
  };

  const addEmoji = (e: string) => {
    setInput(prev => prev + e);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* FAB Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/40 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
        </button>
      )}

      {/* Full Screen Chat */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black">

          {/* ===== HEADER ===== */}
          <div className="flex-shrink-0 flex items-center gap-2.5 px-4 pt-[env(safe-area-inset-top,12px)] pb-3 bg-gradient-to-r from-blue-950 to-black border-b border-white/10">
            <button onClick={() => setIsOpen(false)} className="p-1 text-gray-400 active:scale-90">
              <X className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm leading-tight">Agente IA Dropper</p>
              <p className="text-[10px] text-green-400">En línea</p>
            </div>
            <span className="text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">IA ONLINE</span>
          </div>

          {/* ===== SCROLLABLE MESSAGES + PROMPTS ===== */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pt-4 pb-2" style={{ minHeight: 0, WebkitOverflowScrolling: 'touch' }}>

            {/* Messages */}
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                      : "bg-white/[0.08] text-gray-200 rounded-2xl rounded-bl-sm border border-white/5"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing */}
              {isLoading && (
                <div className="flex justify-start items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white/[0.08] border border-white/5 px-4 py-3 rounded-2xl rounded-bl-sm">
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

            {/* Suggested prompts - INSIDE scrollable area */}
            {showPrompts && !isLoading && (
              <div className="mt-4 mb-2 space-y-2">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="w-full text-left text-[13px] bg-white/[0.06] active:bg-blue-500/25 border border-white/10 active:border-blue-500/30 rounded-2xl px-4 py-3 text-gray-300 active:text-white transition-colors duration-100"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===== EMOJI PICKER ===== */}
          {showEmojis && (
            <div className="flex-shrink-0 mx-3 mb-2 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex gap-1 px-2 pt-2 pb-1 overflow-x-auto">
                {EMOJI_CATEGORIES.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setEmojiCat(i)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      emojiCat === i ? "bg-blue-500/30 text-blue-300" : "text-gray-500"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <div className="h-[120px] overflow-y-auto px-2 py-1 grid grid-cols-8 gap-0.5">
                {EMOJI_CATEGORIES[emojiCat]?.emojis.map((e, i) => (
                  <button
                    key={i}
                    onClick={() => addEmoji(e)}
                    className="aspect-square flex items-center justify-center text-xl active:scale-90"
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ===== INPUT BAR - always at bottom ===== */}
          <div className="flex-shrink-0 px-3 pt-1 pb-[max(env(safe-area-inset-bottom,8px),8px)]">
            <div className="flex items-center gap-1.5 bg-white/[0.05] border border-white/10 rounded-full px-2 py-1">
              <button
                onClick={() => setShowEmojis(!showEmojis)}
                className={`p-2 rounded-full flex-shrink-0 ${showEmojis ? "bg-blue-500/20 text-blue-400" : "text-gray-400"}`}
              >
                <Smile className="w-5 h-5" />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                onFocus={() => setShowEmojis(false)}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-transparent py-2 text-sm text-white placeholder-gray-500 focus:outline-none min-w-0"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 disabled:opacity-30 active:scale-90 rounded-full p-2 flex-shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

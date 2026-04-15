'use client';

import { Send, MessageCircle, Sparkles, Smile, X } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const EMOJI_CATEGORIES = [
  { name: "Populares", emojis: ["👍", "❤️", "😂", "🔥", "🚀", "💯", "✅", "💪", "🤑", "💰", "⭐", "🙏", "😎", "🤩", "👏"] },
  { name: "Caras", emojis: ["😀", "😃", "😄", "😁", "😅", "🤣", "😂", "🙂", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "😌", "😔", "😪", "😴", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", "😮", "😯", "😲", "😳", "🥺", "🥹", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😤", "😡", "🤬", "💀", "🤡", "👻", "🤖"] },
  { name: "Manos", emojis: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "🫶", "🤲", "🤝", "🙏", "✍️", "💪"] },
  { name: "Corazones", emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "♥️"] },
  { name: "Cosas", emojis: ["⌚", "📱", "💻", "📷", "📞", "📺", "⚡", "💡", "📦", "📧", "💰", "💎", "🔑", "🛒", "🎁", "🏆", "🎯", "📊", "📈", "📉"] },
  { name: "Negocio", emojis: ["💼", "👔", "🏛️", "📊", "📈", "📉", "💰", "💵", "💎", "🏦", "🧾", "📋", "📅", "🤝", "💪", "🚀", "⭐", "✅", "❌", "⚠️"] },
];

const INITIAL_MESSAGE = "¡Hola! Soy el Agente de IA de Dropper 🤖\n\nPregúntame lo que quieras sobre Dropper, planes, IA, logística, ganancias... o cualquier tema. ¡Escribe y te respondo! 🚀";

const SESSION_ID = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", text: INITIAL_MESSAGE, sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showEmojis, setShowEmojis] = useState(false);
  const [emojiCat, setEmojiCat] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const emojiScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 50);
  }, [messages, isLoading]);

  useEffect(() => {
    if (emojiScrollRef.current) emojiScrollRef.current.scrollTop = 0;
  }, [emojiCat]);

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
    <div className="liquid-glass rounded-3xl p-4 md:p-6 h-[380px] md:h-[460px] flex flex-col bg-gradient-to-br from-blue-950/20 to-purple-950/20">
      {/* Header */}
      <div className="mb-3 pb-3 border-b border-white/10 flex-shrink-0">
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
        <p className="text-[11px] text-gray-500 mt-1">Con memoria y conocimiento total de Dropper</p>
      </div>

      {/* Messages - scrollable */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1 min-h-0">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-reveal`}>
            {msg.sender === "bot" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div
              className={`max-w-[85%] px-3.5 py-2.5 text-[13px] md:text-sm leading-relaxed whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                  : "bg-white/[0.08] text-gray-200 rounded-2xl rounded-bl-sm border border-white/[0.05]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing */}
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

      {/* Emoji Picker */}
      {showEmojis && (
        <div className="mb-2 flex-shrink-0 animate-reveal bg-black/40 backdrop-blur-md rounded-2xl border border-white/[0.08] overflow-hidden">
          <div className="flex gap-1 px-2 pt-2 pb-1 overflow-x-auto">
            {EMOJI_CATEGORIES.map((cat, idx) => (
              <button
                key={cat.name}
                onClick={() => setEmojiCat(idx)}
                className={`text-[9px] md:text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition-all duration-200 ${
                  emojiCat === idx
                    ? "bg-blue-500/30 text-blue-300 border border-blue-500/30"
                    : "text-gray-500 hover:text-gray-300 border border-transparent"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div ref={emojiScrollRef} className="h-[100px] md:h-[110px] overflow-y-auto px-2 py-1.5 grid grid-cols-8 md:grid-cols-10 gap-0.5 auto-rows-min">
            {EMOJI_CATEGORIES[emojiCat]?.emojis.map((emoji, i) => (
              <button
                key={`${emojiCat}-${i}`}
                onClick={() => addEmoji(emoji)}
                className="w-full aspect-square flex items-center justify-center text-lg md:text-xl hover:bg-white/10 rounded-lg active:scale-90 transition-all duration-100"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="flex gap-1.5 items-center flex-shrink-0">
        <button
          onClick={() => setShowEmojis(!showEmojis)}
          className={`p-2.5 rounded-full transition-all duration-200 flex-shrink-0 ${
            showEmojis ? "bg-blue-500/20 text-blue-400" : "text-gray-500 hover:text-gray-300"
          }`}
        >
          {showEmojis ? <X className="w-5 h-5" /> : <Smile className="w-5 h-5" />}
        </button>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
          onFocus={() => setShowEmojis(false)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all duration-200 min-w-0"
          disabled={isLoading}
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-40 active:scale-95 rounded-full p-2.5 transition-all duration-300 shadow-lg shadow-blue-500/20 flex-shrink-0"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

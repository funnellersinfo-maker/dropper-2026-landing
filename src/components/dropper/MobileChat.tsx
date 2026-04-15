'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, MessageCircle, Sparkles, Smile, X } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const QUICK_PROMPTS_MOBILE = [
  "¿Cómo funciona Dropper?",
  "¿Cuánto cuestan los planes?",
  "¿Cuánto puedo ganar?",
];

const EMOJI_CATEGORIES = [
  {
    name: "Frecuentes",
    emojis: ["👍", "❤️", "😂", "🔥", "🚀", "💯", "✅", "💪", "🤑", "💰", "⭐", "🙏", "😎", "🤩", "👏"],
  },
  {
    name: "Caras",
    emojis: ["😀", "😃", "😄", "😁", "😅", "🤣", "😂", "🙂", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🫡", "🤐", "🤨", "😐", "😑", "😶", "🫥", "😏", "😒", "🙄", "😬", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐", "😕", "🫤", "😟", "🙁", "😮", "😯", "😲", "😳", "🥺", "🥹", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖"],
  },
  {
    name: "Manos",
    emojis: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "🫶", "👐", "🤲", "🤝", "🙏", "✍️", "💪", "👀", "👅", "👄"],
  },
  {
    name: "Corazones",
    emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "♥️", "🫶", "😍", "🥰"],
  },
  {
    name: "Objetos",
    emojis: ["⌚", "📱", "💻", "⌨️", "🖥️", "📷", "📹", "🎥", "📞", "📺", "⚡", "🔋", "💡", "📦", "📧", "💰", "💳", "💎", "🔑", "🔒", "🛒", "🛍️", "🎁", "🏆", "🎯", "📊", "📈", "📉"],
  },
  {
    name: "Negocio",
    emojis: ["💼", "👔", "🏛️", "📊", "📈", "📉", "💰", "💵", "💴", "💶", "💷", "🪙", "💎", "🏦", "🧾", "📋", "📁", "📅", "📇", "🗳️", "🤝", "💪", "🚀", "⭐", "✅", "❌", "⚠️", "🔔", "📣"],
  },
];

const INITIAL_MESSAGE = "¡Hola! Soy el Agente de IA de Dropper 🤖\n\nPuedes preguntarme cualquier cosa sobre Dropper, los planes, la IA, logística, ganancias, o cualquier tema.\n\n¡Pruébame! Escribe o toca una pregunta rápida. 🚀";

const SESSION_ID = `mobile_dropper_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export default function MobileChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", text: INITIAL_MESSAGE, sender: "bot", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showPrompts, setShowPrompts] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeEmojiCategory, setActiveEmojiCategory] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const emojiScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, showPrompts]);

  useEffect(() => {
    if (emojiScrollRef.current) {
      emojiScrollRef.current.scrollTop = 0;
    }
  }, [activeEmojiCategory]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const sendToAI = useCallback(async (userText: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, sessionId: SESSION_ID }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      if (data.reply) { setIsOnline(true); return data.reply; }
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

    // Hide prompts instantly on any send
    setShowPrompts(false);
    setShowEmojiPicker(false);

    const userMsg: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

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

  const insertEmoji = (emoji: string) => {
    setInput((prev) => prev + emoji);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating FAB button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/40 active:scale-95 transition-transform duration-200"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
      </button>

      {/* Chat Overlay - Full screen */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black animate-reveal">
          {/* Header */}
          <div className="flex-shrink-0 bg-gradient-to-r from-blue-950 to-black border-b border-white/[0.08] px-4 pt-[env(safe-area-inset-top,12px)] pb-3">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 -ml-1 text-gray-400 hover:text-white active:scale-90 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm">Agente IA Dropper</h3>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-[10px] text-gray-400">{isOnline ? "En línea" : "Desconectado"}</span>
                </div>
              </div>
              <span className="text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                IA ONLINE
              </span>
            </div>
          </div>

          {/* Messages area + Quick Prompts (all scrollable together) */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-reveal`}>
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                      : "bg-white/[0.08] text-gray-200 rounded-2xl rounded-bl-sm border border-white/[0.05]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick Prompts - INSIDE scrollable area, only 3, disappear on tap */}
            {showPrompts && (
              <div className="flex flex-col gap-2 pt-2 pb-1">
                {QUICK_PROMPTS_MOBILE.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="w-full text-left text-[13px] bg-white/[0.06] active:bg-blue-500/25 disabled:opacity-40 border border-white/[0.1] active:border-blue-500/30 rounded-2xl px-4 py-3 text-gray-300 active:text-white transition-all duration-150"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
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

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="flex-shrink-0 mx-3 mb-2 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden animate-reveal">
              <div className="flex gap-1 px-2 pt-2 pb-1 overflow-x-auto">
                {EMOJI_CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveEmojiCategory(idx)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition-all duration-200 ${
                      activeEmojiCategory === idx
                        ? "bg-blue-500/30 text-blue-300 border border-blue-500/30"
                        : "text-gray-500 hover:text-gray-300 border border-transparent"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              <div
                ref={emojiScrollRef}
                className="h-[130px] overflow-y-auto px-2 py-1.5 grid grid-cols-8 gap-0.5 auto-rows-min"
              >
                {EMOJI_CATEGORIES[activeEmojiCategory]?.emojis.map((emoji, i) => (
                  <button
                    key={`${activeEmojiCategory}-${i}`}
                    onClick={() => insertEmoji(emoji)}
                    className="w-full aspect-square flex items-center justify-center text-xl hover:bg-white/10 rounded-lg active:scale-90 transition-all duration-100"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input bar - always fixed at bottom, never overlaps */}
          <div className="flex-shrink-0 px-3 pb-[env(safe-area-inset-bottom,8px)] pt-2">
            <div className="flex gap-1.5 items-center bg-white/[0.05] border border-white/[0.1] rounded-full px-2 py-1">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`p-2 rounded-full transition-all duration-200 flex-shrink-0 ${
                  showEmojiPicker
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-400 hover:text-gray-200 active:scale-90"
                }`}
              >
                {showEmojiPicker ? <X className="w-5 h-5" /> : <Smile className="w-5 h-5" />}
              </button>

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                onFocus={() => setShowEmojiPicker(false)}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-transparent py-2 text-sm text-white placeholder-gray-500 focus:outline-none min-w-0"
                disabled={isLoading}
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 active:from-blue-600 active:to-cyan-600 disabled:opacity-30 active:scale-90 rounded-full p-2 transition-all duration-200 flex-shrink-0"
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

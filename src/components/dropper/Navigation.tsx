'use client';

import { Crown, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 px-4 sm:px-6 py-4 transition-all duration-300 ${
      isScrolled ? "bg-black/40 backdrop-blur-xl" : ""
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between liquid-glass rounded-full px-6 sm:px-8 py-3">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <Shield className="w-8 h-8 text-blue-500 absolute -top-1 -left-1 opacity-50 blur-sm group-hover:opacity-100 transition-opacity" />
            <Crown className="w-8 h-8 text-blue-400" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tighter">
            DROPPER<span className="text-blue-500">.</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
            Ecosistema
          </a>
          <a href="#motor" className="hover:text-white transition-colors">
            El Motor
          </a>
          <a href="#precios" className="hover:text-white transition-colors">
            Precios
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </div>

        <a href="https://wa.link/li0vhy" target="_blank" rel="noopener noreferrer" className="hidden md:inline-block btn-dopamine-blue py-2 px-6 rounded-full text-center">EMPEZAR AHORA</a>
      </div>
    </nav>
  );
}

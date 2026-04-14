import { Crown, Instagram, Linkedin, Shield, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 md:py-20 px-4 md:px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-6 h-6 text-blue-500 opacity-50 blur-sm" />
            <Crown className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-xl font-black tracking-tighter">DROPPER<span className="text-blue-500">.</span></span>
        </div>
        <div className="text-gray-600 text-xs font-medium tracking-widest">
          © 2026 DROPPER ECOSISTEMA GLOBAL. TODOS LOS DERECHOS RESERVADOS.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
}

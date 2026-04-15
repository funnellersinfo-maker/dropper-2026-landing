import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a href="https://wa.link/li0vhy" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-transform duration-300 animate-pulse" title="Contacta por WhatsApp">
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}

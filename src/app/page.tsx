'use client';

import Navigation from "@/components/dropper/Navigation";
import Hero from "@/components/dropper/Hero";
import BentoGrid from "@/components/dropper/BentoGrid";
import AutomationFunnel from "@/components/dropper/AutomationFunnel";
import Pricing from "@/components/dropper/Pricing";
import FAQ from "@/components/dropper/FAQ";
import Testimonials from "@/components/dropper/Testimonials";
import Footer from "@/components/dropper/Footer";
import FloatingWhatsApp from "@/components/dropper/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />
      <main>
        <Hero />
        <BentoGrid />
        <AutomationFunnel />
        <Pricing />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

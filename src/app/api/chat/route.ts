import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

const SYSTEM_PROMPT = `Eres el Agente de Ventas IA de Dropper, el ecosistema de e-commerce con IA más avanzado de 2026. Tu personalidad es:

PERSPECTIVA Y TONO:
- Eres el mejor closer de ventas B2B del mundo latinoamericano.
- Persuasivo pero nunca agresivo. Directo pero empático.
- Lenguaje moderno, dopamínico, enfocado en rentabilidad y automatización.
- Usas emojis estratégicamente (no en exceso, 2-3 por respuesta máximo).
- Siempre recalcas que Dropper NO tiene mensualidades — es PAGO ÚNICO.
- Hablas de "nosotros" (el equipo Dropper) y de "tú" (el prospecto).
- Mantienes un tono de exclusividad y urgencia sutil.

BASE DE CONOCIMIENTO DE DROPPER (datos reales que debes usar):
- Dropper es un ecosistema de e-commerce con IA para dropshipping.
- 3 planes: Core ($290 USD), Boost ($390 USD), Scale ($490 USD) — TODOS pago único, cero mensualidades.
- Plan Core: 1 nicho, 1 asistente IA base, catálogo ganador, logística nacional, grupo soporte.
- Plan Boost (MÁS POPULAR): 2 nichos ganadores, 1 asistente IA, catálogo ganador, logística nacional, capacitación marketing dopamínico, grupo soporte. Asistentes extras a $50 USD c/u.
- Plan Scale: 4 nichos, 1 asistente IA, catálogo ganador, logística nacional, consultoría 1-on-1, capacitación marketing dopamínico y landing pages con IA, grupo y soporte prioritario. Promo x3 asistentes extras a $100 USD.
- Cerebro de IA: agente autónomo que cierra ventas, resuelve dudas, gestiona pedidos 24/7. Usa psicología de ventas, upselling y cross-selling orgánico.
- Tienda Pro 2026: diseño mobile-first de ultra-alta conversión, SEO optimizado, carga instantánea, arquitectura psicológica de venta.
- Catálogo curado: productos ganadores validados por algoritmos de tendencia global. Winning rate del 94%.
- Logística directa: conexión con bodegas locales e internacionales. Envíos 24-48h en Colombia.
- Transportadoras aliadas: Coordinadora, Interrapidísimo, Envía, Swayp, TCC.
- INVIMA: productos con registro sanitario válido.
- Testimonios reales: Carlos Mendoza pasó de $0 a $15,000 USD/mes en 3 meses. María Rodríguez redujo 40h semanales a cero. Juan Pérez mejoró su ROI radicalmente.
- Los Droppers ganan entre $2,000 y $50,000 USD mensuales según tráfico.
- El modelo es simple: usuario genera tráfico → IA convierte → Dropper maneja logística → usuario cobra.
- Contacto real: WhatsApp y redes sociales. El equipo (Alejo y otros) da atención VIP.
- Empresa: Dropper Ecosistema Global. Est. 2026.

REGLAS DE CONVERSACIÓN:
1. Nunca inventes datos que no estén en tu base de conocimiento. Si no sabes algo, redirige a WhatsApp.
2. Si el usuario pregunta algo fuera de tema (clima, deportes, etc.), responde brevemente pero siempre conecta de vuelta a Dropper de forma natural.
3. Maneja objeciones con empatía y datos reales.
4. Siempre intenta avanzar la conversación hacia una venta o próxima acción.
5. Si el usuario quiere hablar con un humano, redirige amablemente a WhatsApp o redes.
6. Las respuestas deben ser concisas (2-4 oraciones) pero contundentes. No escribas ensayos.
7. Recuerda el contexto de la conversación. Si ya hablaron de precios y preguntan de nuevo, no repitas exactamente lo mismo — hazlo natural.
8. Usa variación en tus respuestas. No seas robótico ni repetitivo.
9. El idioma principal es español. Si el usuario escribe en inglés, responde en inglés pero con el mismo tono.`;

// In-memory conversation store (per session)
const conversationHistories = new Map<string, Array<{ role: string; content: string }>>();

function getOrCreateHistory(sessionId: string): Array<{ role: string; content: string }> {
  if (!conversationHistories.has(sessionId)) {
    conversationHistories.set(sessionId, [
      { role: "system", content: SYSTEM_PROMPT },
    ]);
  }
  return conversationHistories.get(sessionId)!;
}

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId = "default" } = await request.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Get or create conversation history with memory
    const history = getOrCreateHistory(sessionId);

    // Add user message to history
    history.push({ role: "user", content: message.trim() });

    // Keep last 20 messages max (to avoid token limits while maintaining memory)
    if (history.length > 22) {
      const systemMsg = history[0];
      const recent = history.slice(-21);
      conversationHistories.set(sessionId, [systemMsg, ...recent]);
    }

    // Initialize ZAI SDK
    const zai = await ZAI.create();

    // Call AI for response
    const completion = await zai.chat.completions.create({
      messages: history.map((msg) => ({
        role: msg.role as "system" | "user" | "assistant",
        content: msg.content,
      })),
      temperature: 0.8,
      max_tokens: 300,
    });

    const botReply = completion.choices[0]?.message?.content || "Lo siento, hubo un problema. ¿Podrías repetir tu pregunta?";

    // Add bot response to history (memory)
    history.push({ role: "assistant", content: botReply });

    return NextResponse.json({ reply: botReply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Momentáneamente no puedo responder. ¡Por favor intenta de nuevo o escríbenos por WhatsApp! 🔄" },
      { status: 200 }
    );
  }
}

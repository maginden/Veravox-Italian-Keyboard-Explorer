
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getKeyTips = async (keyLabel: string) => {
  if (!process.env.API_KEY) return "Configura la chiave API per ricevere suggerimenti intelligenti.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Spiega in breve 2-3 scorciatoie da tastiera comuni e utili che coinvolgono il tasto "${keyLabel}" su una tastiera italiana. Sii conciso e rispondi in italiano.`,
      config: {
        systemInstruction: "Sei un esperto di produttività al computer specializzato in scorciatoie da tastiera italiane.",
        temperature: 0.7,
      },
    });

    return response.text || "Nessun suggerimento disponibile per questo tasto.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Impossibile caricare suggerimenti al momento.";
  }
};

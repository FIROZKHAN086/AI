import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = "AIzaSyDplk_K-Gq7-ahYtSsWLarTHddM96DCZL8";

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

async function main(prompt, onChunk) {
  const model = 'models/gemini-1.5-flash';

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    contents,
    generationConfig: {
      temperature: 0.7,
    },
  });

  let fullText = '';

  for await (const chunk of response) {
    if (chunk.text) {
  
      fullText += chunk.text;
      if (onChunk) {
        onChunk(chunk.text); 
      }
    }
  }

  return fullText;
}

export default main;

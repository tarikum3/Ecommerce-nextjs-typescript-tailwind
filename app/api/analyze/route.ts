import OpenAI from 'openai';
import { storeImage } from '@/lib/storage';

export const maxDuration = 30;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) return new Response('No image provided', { status: 400 });

    // 1. Upload the user's input image to Supabase immediately
    // We do this in parallel with the AI call if you want speed, 
    // but here we await it to ensure we return the URL with the result.
    const storedImageUrl = await storeImage(image, 'images');

    // 2. Perform AI Analysis
    const systemPrompt = `
      You are an expert fashion analysis agent for an e-commerce custom design tool.
      Analyze the provided image and return a JSON object strictly following this schema:
      {
        "isValid": boolean, 
        "itemType": string, 
        "confidence": number, 
        "reasoning": string
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this image. Is this a valid fashion product?" },
            { type: "image_url", image_url: { url: image } }
          ]
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content received from OpenAI");

    const result = JSON.parse(content);

    // 3. Return Analysis + The Permanent URL
    return Response.json({
      ...result,
      storedImageUrl // Frontend can now use this URL instead of the base64 string
    });

  } catch (error) {
    console.error('Analysis Error:', error);
    return new Response(JSON.stringify({ error: 'Analysis or Storage failed' }), { status: 500 });
  }
}
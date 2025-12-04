import { generateObject } from 'ai';
// import { openai } from '@ai-sdk/openai'; // or google('gemini-1.5-pro')
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) return new Response('No image provided', { status: 400 });

    // The Agent's Schema: We strictly define what we want back
    const schema = z.object({
      isValid: z.boolean().describe('True only if the image is a clear photo of clothing, footwear, or fashion accessory.'),
      itemType: z.string().describe('The specific type of item (e.g., "Sneaker", "Denim Jacket", "Handbag"). Return "Unknown" if invalid.'),
      confidence: z.number().describe('Confidence score between 0 and 1'),
      reasoning: z.string().describe('Short explanation of why this item was accepted or rejected.')
    });

    const result = await generateObject({
    //   model: openai('gpt-4o'), // Multimodal model is required
    model: 'openai/gpt-4o',
      schema,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Analyze this image for an e-commerce custom design tool. Is this a valid fashion product that we can customize?' },
            { type: 'image', image } // base64 or URL
          ]
        }
      ]
    });

    return Response.json(result.object);

  } catch (error) {
    console.error('Analysis Error:', error);
    return new Response(JSON.stringify({ error: 'Agent analysis failed' }), { status: 500 });
  }
}
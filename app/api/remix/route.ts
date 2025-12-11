import Replicate from 'replicate';
import { storeImage } from '@/lib/storage';

export const maxDuration = 60;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { image, prompt, itemType } = await req.json();

    if (!image) {
      return new Response(JSON.stringify({ error: 'No image provided' }), { status: 400 });
    }

    const strictPrompt = `Design variation of ${itemType}. ${prompt}. 
    STRICTLY preserve the original shape, outline, and perspective of the input image. 
    Only change materials, colors, and textures. Photorealistic, 8k.`;

    // 1. Generate images with Replicate
    // The output is an array of temporary URLs hosted by Replicate
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image: image,
          prompt: strictPrompt,
          strength: 0.65,
          guidance_scale: 9.0,
          num_outputs: 4,
          scheduler: "K_EULER",
          num_inference_steps: 50
        }
      }
    ) as string[];

    // 2. Upload generated images to Supabase Storage in parallel
    const storedImagePromises = output.map(async (tempUrl) => {
      return await storeImage(tempUrl, 'images'); 
    });

    const storedUrls = await Promise.all(storedImagePromises);

    // 3. Return the permanent Supabase URLs
    return Response.json({
      images: storedUrls
    });

  } catch (error) {
    console.error('Remix Error:', error);
    return new Response(JSON.stringify({ error: 'Generation or Storage failed' }), { status: 500 });
  }
}
import { experimental_generateImage as generateImage } from 'ai';
// import { runware } from '@ai-sdk/runware'; 

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { image, prompt, itemType } = await req.json();

    // Enhanced prompt to enforce structure retention
    const strictPrompt = `Design variation of ${itemType}. ${prompt}. 
    STRICTLY preserve the original shape, outline, and perspective of the input image. 
    Only change materials, colors, and textures. Photorealistic, 8k.`;

    // Request 4 images
    const { images } = await generateImage({
    //   model: runware.image('runware:100@1'), 
    model: 'google/imagen-4.0-ultra-generate-001',
      prompt: strictPrompt,
      n: 4, // Generate 4 variations
      size: '1024x1024',
      providerOptions: {
        runware: {
          seedImage: image,
          strength: 0.65, // 0.65 balances staying true to shape vs allowing material changes
          guidanceScale: 9.0 // Higher guidance forces strict prompt adherence
        },
      },
    });

    // Return array of URLs
    return Response.json({
    //   images: images.map(img => img.url || `data:image/png;base64,${img.base64}`)
    images
    });

  } catch (error) {
    console.error('Remix Error:', error);
    return new Response(JSON.stringify({ error: 'Generation failed' }), { status: 500 });
  }
}

import { v4 as uuidv4 } from 'uuid';

import { supabase } from "@/lib/supabaseClient";
/**
 * Uploads an image (URL or Base64) to Supabase Storage and returns the public URL.
 */
export async function storeImage(imageInput: string, bucket: string = 'images'): Promise<string> {
  try {
    const fileName = `${uuidv4()}.png`;
    let fileBody: ArrayBuffer | Buffer;
    let contentType = 'image/png';

    // Handle Image URL (from Replicate/External)
    if (imageInput.startsWith('http')) {
      const response = await fetch(imageInput);
      if (!response.ok) throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
      const blob = await response.blob();
      fileBody = await blob.arrayBuffer();
      contentType = response.headers.get('content-type') || 'image/png';
    } 
    // Handle Base64 Data URI (from Client)
    else if (imageInput.startsWith('data:image')) {
      const matches = imageInput.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string format');
      }
      contentType = matches[1];
      fileBody = Buffer.from(matches[2], 'base64');
    } 
    else {
      throw new Error('Unsupported image format. Must be http URL or Base64 Data URI.');
    }

    // Upload to Supabase
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, fileBody, {
        contentType,
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get Public URL
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;

  } catch (error) {
    console.error('Error in storeImage:', error);
    throw error;
  }
}
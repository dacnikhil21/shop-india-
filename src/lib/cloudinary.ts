/**
 * Utility for uploading files to Cloudinary using Signed Uploads from the browser.
 * Note: Exposing the API_SECRET in frontend code poses security risks, but is implemented as requested.
 */

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

const generateSHA1 = async (message: string) => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export const uploadMediaToCloudinary = async (file: File): Promise<string | null> => {
  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Cloudinary configuration is missing in .env');
    return null;
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  
  // Create timestamp
  const timestamp = Math.round(new Date().getTime() / 1000).toString();
  
  // To create a signature, we must alphabetize the parameters.
  // We only have timestamp.
  const stringToSign = `timestamp=${timestamp}${apiSecret}`;
  const signature = await generateSHA1(stringToSign);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary upload error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

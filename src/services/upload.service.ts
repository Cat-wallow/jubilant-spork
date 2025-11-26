import api from '@/lib/api';

/**
 * Uploads a logo file to the tenant service.
 * @param file The file to upload.
 * @returns The URL of the uploaded file.
 */
export const uploadTenantLogo = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post<{ success: boolean; data: { url: string } }>(
      '/tenant/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (!response.data.success || !response.data.data.url) {
      throw new Error('File upload failed: Invalid response from server.');
    }

    return response.data.data.url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload tenant logo.');
  }
};

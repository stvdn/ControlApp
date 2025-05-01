import axios from "axios";
import apiClient from "./apiClient";

export const getPresignedUploadURL = async (filename: string, contentType: string) => {
    const response = await apiClient.post('/get-presigned-upload', {
        filename,
        contentType
    });
    return response.data;
};

export const uploadImageToS3 = async (signedUrl: string, file: File) => {
    try{
        await axios.put(signedUrl, file, {
            headers: {
                "Content-Type": file.type
            }
        });
        return true
    } catch (error: any) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
}

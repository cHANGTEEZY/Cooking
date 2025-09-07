import imageCompression from "browser-image-compression";

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  initialQuality?: number;
  fileType?: string;
}

export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<File> => {
  const defaultOptions = {
    maxSizeMB: 10,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.8,
    fileType: file.type,
    ...options,
  };

  try {
    console.log(`🔄 Compressing image: ${file.name}`);
    console.log(
      `📁 Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`
    );

    const compressedFile = await imageCompression(file, defaultOptions);

    console.log(
      `✅ Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(
        2
      )} MB`
    );
    console.log(
      `📊 Compression ratio: ${(
        (1 - compressedFile.size / file.size) *
        100
      ).toFixed(2)}%`
    );

    return compressedFile;
  } catch (error) {
    console.error("❌ Error compressing image:", error);
    // Return original file if compression fails
    return file;
  }
};

export const validateImageFile = (
  file: File
): { isValid: boolean; error?: string } => {
  if (!file.type.startsWith("image/")) {
    return {
      isValid: false,
      error: "Please select an image file (JPEG, PNG, WebP)",
    };
  }

  const maxSizeBeforeCompression = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSizeBeforeCompression) {
    return {
      isValid: false,
      error: `File size too large. Please select a file under ${
        maxSizeBeforeCompression / 1024 / 1024
      }MB`,
    };
  }

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid file type. Only JPEG, PNG, and WebP files are allowed",
    };
  }

  return { isValid: true };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

import { fileTypeFromBuffer } from "file-type";

const allowedExtensions = [".pdf", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];

/**
 * Check file format
 * @param {string} filePath - Đường dẫn file
 * @returns {Promise<boolean>}
 */
const fileFormatValidation = async (file) => {
    try {
        const buffer = file.buffer;
        const type = await fileTypeFromBuffer(buffer);

        if (!type) return false;

        return allowedExtensions.includes(`.${type.ext}`);
    } catch (error) {
        console.error("Lỗi khi đọc file:", error);
        return false;
    }
};

export default fileFormatValidation;
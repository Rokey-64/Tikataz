import imageCompression from "browser-image-compression";

/**
 * Compress the image before uploading
 * @param {*} file - The image file
 * @param {*} options - The options for the compression. Default is {maxSizeMB: 0.1, maxWidthOrHeight: 300, useWebWorker: true}
 * @returns 
 */
const CompressImage = async (file, options) => {
    let compressOptions = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: undefined,
        useWebWorker: true,
        initialQuality: 0.8
    };

    // Override the default options
    if (options) {
        compressOptions = options;
    }

    // Return if the file is empty
    if (!file) return;

    // If the file size is less than 0.1MB, return the object URL
    if (file.size < compressOptions.maxSizeMB * 1024 * 1024) {
        return URL.createObjectURL(file);
    }

    // Compress the image
    let compressedFile = null;
    const TIMEOUT = 500;
    while ((compressedFile?.size || file.size) / 1024 / 1024 > compressOptions.maxSizeMB && compressOptions.initialQuality > 0.2) {
        compressOptions.initialQuality -= 0.3;
        try {
            compressedFile = await Promise.race(
                [
                    new Promise((resolve) => setTimeout(() => resolve("timeout"), TIMEOUT)),
                    imageCompression(file, compressOptions)
                ]
            );
        }
        catch (e) {
            break;
        }
    }


    if (compressedFile === "timeout" && file.size > compressOptions.maxSizeMB * 1024 * 1024) {
        alert("Không thể tiến hành nén ảnh này, vui lòng chọn ảnh có kích thước nhỏ hơn 0.1MB");
        return;
    }

    const imgUrl = URL.createObjectURL(compressedFile);
    return imgUrl;
}

export default CompressImage;
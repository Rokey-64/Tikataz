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
    if(!file) return;

    if(file.size > 0.5 * 1024 * 1024) {
        alert("Kích thước hình ảnh vượt quá 0.5MB. Vui lòng chọn hình ảnh khác");
        return;
    }

    // If the file size is less than 0.1MB, return the object URL
    if (file.size < 0.1 * 1024 * 1024) {
        return URL.createObjectURL(file);
    }
    

    let compressedFile = await imageCompression(file, compressOptions);

    // If the compressed file is still larger than 0.1MB, reduce the quality
    while (compressedFile.size / 1024 / 1024 > compressOptions.maxSizeMB && compressOptions.initialQuality > 0.2) {
        compressOptions.initialQuality -= 0.1;
        compressedFile = await imageCompression(file, compressOptions);
    }

    const imgUrl = URL.createObjectURL(compressedFile);
    return imgUrl;
}

export default CompressImage;
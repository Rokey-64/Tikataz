import e from "express";
import sharp from "sharp";

/**
 * Resize an image to a maximum size and convert it to WebP format.
 * @param {*} buffer - The image buffer to resize.
 * @param {*} maxSize - The maximum size of the image.
 * @param {*} revolutions -  The number of revolutions to apply to the image.
 */
const resizeImage = async(buffer, maxSize, revolutions) => {
    const sizeOptions = {};
    try {
        const image = sharp(buffer);

        const metadata = await image.metadata();

        /**
         * * Create the size options for the image based on its orientation.
         * * If the image is wider than it is tall, set the width to the maximum size.
         * * If the image is taller than it is wide, set the height to the maximum size.
         */
        if (metadata.width > metadata.height) {
            sizeOptions.width = maxSize;
        }
        else {
            sizeOptions.height = maxSize;
        }

        /**
         * * Resize the image to the sizeOptions and convert it to WebP format.
         * * The quality of the image is set to the number of revolutions.
         * * * The image is returned as a buffer.
         */
        const result = await image
            .resize(sizeOptions)
            .webp({ quality:  revolutions})
            .toBuffer({ resolveWithObject: true });

        return result.data
    } catch (error) {
        throw error;
    }
}

export default resizeImage;
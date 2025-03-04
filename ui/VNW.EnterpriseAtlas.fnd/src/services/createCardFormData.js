
/**
 * Create a FormData object to send the card data to the server
 * @param {*} card - The card data 💦💤 check from redux/cardsSlice.js
 * @returns 
 */
const CreateCardFormData = async (card) => {
    const formData = new FormData();

    const mimeToExtension = {
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/webp": "webp",
        "image/gif": "gif"
    };

    /**
     * Whether the image is an instance of Blob
     * @param {*} blob 
     * @returns 
     */
    const CheckBlob = (blob) => {
        return blob.startsWith("blob:");
    }

    const convertBlobUrlToFile = async (blobUrl, fileName) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const fileFullName = `${fileName}.${mimeToExtension[blob.type] || "png"}`;
        return new File([blob], fileFullName, { type: blob.type});
    }

    /** Get and Set Logo */
    if (CheckBlob(card.general.logo)) {
        const logo = await convertBlobUrlToFile(card.general.logo, "logo");
        formData.append("image", logo);
    }

    /** Get and Set Products */
    for (const item of card.products.items) {
        if (CheckBlob(item.image)) {
            const imageFile = await convertBlobUrlToFile(item.image, `products_${item.id}`);
            formData.append("image", imageFile);
        }
    }

    /** Get and Set customer */
    for (const item of card.customers.manual) {
        if (CheckBlob(item.custLogo)) {
            const customerLogo = await convertBlobUrlToFile(item.custLogo, `customers_${item.id}`);
            formData.append("image", customerLogo);
        }
    }

    /** 
     * Check if the formData is empty
     * @returns
     */
    for (const _ of formData.entries()) {
        return formData;
    }

    return null;
}

export default CreateCardFormData;


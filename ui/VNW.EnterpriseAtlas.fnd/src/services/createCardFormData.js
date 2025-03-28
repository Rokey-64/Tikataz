
/**
 * Create a FormData object to send the card data to the server, mainly for uploading images
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
        "image/gif": "gif",
        "image/svg+xml": "svg",
    };

    /**
     * Whether the image is an instance of Blob
     * @param {*} blob 
     * @returns 
     */
    const CheckBlob = (blob) => {
        return blob.startsWith("blob:");
    }

    const checkHistory = (card, path) => {
        return card.history.includes(path);
    }

    const convertBlobUrlToFile = async (blobUrl, fileName) => {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const fileFullName = fileName;
        return new File([blob], fileFullName, { type: blob.type});
    }

    /** Get and Set Logo */
    if (CheckBlob(card.general.logo) && !checkHistory(card, card.general.logo)) {
        const logo = await convertBlobUrlToFile(card.general.logo, "logo");
        formData.append("logo", logo);
    }

    /** Get and Set Products */
    for (const item of card.products) {
        if (CheckBlob(item.image) && !checkHistory(card, item.image)) {
            const imageFile = await convertBlobUrlToFile(item.image, item.id);
            formData.append("products", imageFile);
        }
    }

    /** Get and Set customer */
    for (const item of card.customers) {
        if (CheckBlob(item.custLogo) && !checkHistory(card, item.custLogo)) {
            const customerLogo = await convertBlobUrlToFile(item.custLogo, item.id);
            formData.append("customers", customerLogo);
        }
    }

    /** 
     * Check if the formData is empty
     * @returns
     */
    // for (const _ of formData.entries()) {
    //     return formData;
    // }

    return formData;
}

export default CreateCardFormData;


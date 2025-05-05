
/**
 * Create a blob from a url
 * @param {*} url 
 * @returns 
 */
const createBlobFromUrl = async (url) => {
    if (!url) return;
    if (!url.startsWith("blob")) return null;
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return blob;
    }
    catch (error) {
        return null;
    }
}

export default createBlobFromUrl;
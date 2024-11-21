const userLanguage = navigator.language || navigator.userLanguage;

const supportedLang = ['vi', 'en']; // supported languages


const getLang = () => {

    const lang = userLanguage.substring(0, 2);

    if (!supportedLang.includes(lang) && lang.length < 2)
        return 'vi'; // default language

    return lang;
}


export default getLang;
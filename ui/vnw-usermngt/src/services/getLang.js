
const getLang = () => {
    const savedLanguage = getCookie('next-intl') || 'vi';
    return savedLanguage;
}

const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  };


export default getLang;
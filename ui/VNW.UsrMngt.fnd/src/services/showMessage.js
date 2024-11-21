import getLang from './getLang';

const userLanguage = getLang();


/**
 * Show a message to user when call API
 * @param {string} message 
 * @returns 
 */
const showMessage = (message) => {
    if (message) {
        alert(message);
        return;
    }

    alert(userLanguage == 'vi' ? 'Có lỗi xảy ra, vui lòng thử lại sau' : 'An error occurred, please try again later');
}

export default showMessage;
import ejs from 'ejs';

export const templateType = { link: 'link', otp: 'otp'};
export const sendType = { email: 'mail', phone: 'phone', app: 'app' };
const views = {
    otp: { 'vi': './src/views/emailReceivedOTP.ejs', 'en': './src/views/emailReceivedOTP-eng.ejs' },
    link: { 'vi': './src/views/emailConfirmByLink.ejs', 'en': './src/views/emailConfirmByLink-eng.ejs' }
};

/**
 *  Create the subject for the email
 * @param {*} lang 
 * @param {*} templateT 
 * @returns 
 */
const createSubject = (lang, templateT) => {
    if (templateT === templateType.otp) return lang === 'vi' ? 'Mã OTP' : 'Login OTP';
    if (templateT === templateType.link) return lang === 'vi' ? 'Liên kết xác nhận' : 'Link confirm';
}

/**
 * Create the email template
 * @param {*} templateT 
 * @param {*} sendT 
 * @param {*} reqID 
 * @param {*} destination 
 * @param {*} value 
 * @param {*} lang 
 * @returns 
 */
const createMailTemplate = async (templateT, reqID, destination, value, lang) => {
    const path = views[templateT][lang];
    const content = await ejs.renderFile(path, { value: value })
    
    return {
        requestID: reqID,
        type: sendType.email,
        to: destination,
        subject: createSubject(lang, templateT),
        content: content
    }
}

export default createMailTemplate;
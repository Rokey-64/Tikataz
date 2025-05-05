import React, { useState } from 'react'
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3'

const GoogleCaptcha = () => {
    const [token, setToken] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (token) {
          // Gửi token reCAPTCHA và các dữ liệu biểu mẫu đến máy chủ để xác thực
          console.log('reCAPTCHA Token:', token);
          // Tiếp tục xử lý dữ liệu biểu mẫu
        } else {
          // Hiển thị thông báo lỗi hoặc yêu cầu xác thực reCAPTCHA
          console.log('Please verify reCAPTCHA!');
        }
    };

    const handleRecaptchaChange = (recaptchaToken) => {
        setToken(recaptchaToken);
    };
    return (
        <GoogleReCaptchaProvider
        reCaptchaKey='6LdW5fMpAAAAAM-wEYLbO762E4Ah7Lz_6KP7NHP8'
        
        onChange={handleRecaptchaChange}
        //size="invisible" // Ẩn reCAPTCHA, không cần người dùng click
      />
    )
}


export default GoogleCaptcha;
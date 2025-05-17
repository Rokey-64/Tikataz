import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
// import 'tailwindcss/tailwind.css';
import style from './OtpTextInput.module.scss'

export default function OtpTextInput({numInputs, otp, onChange}) {

    return (
        <div className={style.main_div}>
            <OTPInput
                value={otp}
                onChange={onChange}
                numInputs={numInputs || 6}
                separator={<span className="mx-2">-</span>}
                isInputNum
                shouldAutoFocus
                renderInput={(props) => (
                    <input
                        {...props}
                        className={style.render_input}
                        style={{ width: '2rem', height: '2rem' }} // Thiết lập chiều rộng và chiều cao bằng nhau
                    />
                )}
            />
        </div>
    );
}

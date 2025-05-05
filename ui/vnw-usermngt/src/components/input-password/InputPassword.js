import React from 'react';
import './InputPassword.scss';

/**
|--------------------------------------------------
| A input element is used for user text input
|--------------------------------------------------
*/
const InputPassword = ({text_holder, value, onChange}) => {
    return (
        <div className='input-text-div'>
            <input type="password" className="input-text" placeholder={text_holder} value={value} onChange={onChange}/>
        </div>
    )
}

export default InputPassword;
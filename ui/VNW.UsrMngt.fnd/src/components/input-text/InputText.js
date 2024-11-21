import React from 'react';
import './InputTest.scss';

/**
|--------------------------------------------------
| A input element is used for user text input
|--------------------------------------------------
*/
const InputText = ({text_holder, value, onChange}) => {
    return (
        <div className='input-text-div '>
            <input type="text" className="input-text " placeholder={text_holder} value={value} onChange={onChange}/>
        </div>
    )
}


export default InputText;

import React from 'react'
import './GoogleButton.scss'
/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
export default function GoogleButton({content}) {


    const handleClick = () => {
        window.location.href = `http://localhost:5050${process.env.REACT_APP_ROOT_PATH}/google`;
    }

    return (
        <div>
            <div className='google-main-dev'>
                <button type="button" className="google-button" onClick={handleClick}>
                    <img src='./icons8-google.svg' className='google-img' crossorigin="anonymous"/>
                    <p className='text-center'>{content}</p>
                </button>
            </div>
        </div>
    )
}

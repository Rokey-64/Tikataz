import React from 'react'
import './GoogleButton.scss'
/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
export default function GoogleButton({content}) {
    return (
        <div>
            <div className='google-main-dev'>
                <button type="button" className="google-button">
                    <img src='./icons8-google.svg' className='google-img' crossorigin="anonymous"/>
                    <p className='text-center'>{content}</p>
                </button>
            </div>
        </div>
    )
}

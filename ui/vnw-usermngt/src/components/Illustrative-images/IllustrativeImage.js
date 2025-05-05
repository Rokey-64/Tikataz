import React from 'react'
import stype from './IllustrativeImage.module.scss'

/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
export default function IllustrativeImage({ textContent }) {
    return (
        <div className={`${stype.top}`}>
            <div className={`${stype.main_dev}`}>
                <div className={`${stype.main_dev_1}`}>
                    <div className={`${stype.main_dev_1a}`}>
                        <img className={`${stype.img_0}`} alt="service" src='./Human-service.png' crossorigin="anonymous"></img>
                        <img className={`${stype.img_0}`} alt="Saler" src='./Human-Saler.png' crossorigin="anonymous"></img>
                    </div>
                    <div className={`${stype.main_dev_1b}`} />
                    <div className={`${stype.main_dev_1c}`}>
                        <div >
                            <img className={`${stype.img_1}`} alt="production" src='./Human-production.png' crossorigin="anonymous"></img>
                        </div>
                        <div >
                            <div className={`${stype.div_catche}`}></div>
                            <img className={`${stype.img_1}`} alt="Quantity Controll" src='./Human-QC.png' crossorigin="anonymous"></img>
                        </div>
                        <div >
                            <img className={`${stype.img_2}`} alt="Transport" src='./Human-truck.png' crossorigin="anonymous"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${stype.text_case}`}>
                <span>
                    {textContent}
                </span>
            </div>
        </div>
    )
}

import React from 'react'
import { Outlet } from 'react-router-dom'
import IllustrativeImage from '../Illustrative-images/IllustrativeImage';
import style from './SCLayout.module.scss';
import MenuList from '../footer-menu-list/MenuList';
/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
export default function SCLayout() {
    return (
        <div className='grid grid-cols-1 grid-flow-row'>
            <div className={`${style.main_div}`}>
                <div className={`${style.main_div_1}`}>
                    <div className={`${style.main_div_1a}`}>
                        <Outlet />
                    </div>

                </div>
                <div >
                    <div id='captcha-google' className={`${style.main_div_2a}`}>
                        <img className={style.img_0} src='./polygon.svg' alt='' crossorigin="anonymous"></img>
                    </div>
                    <div className={`${style.main_div_2b}`}>
                        <img className={`${style.img_1}`} src='./Tikataz.logo2.svg' alt="Tikataz Logo" crossorigin="anonymous"></img>
                    </div>
                    <div className={`${style.main_div_2c}`}>
                        <IllustrativeImage textContent={<>Need to set up a factory?<br /> Let <span translate='no'>Tikataz</span> do it for you.</>} />
                    </div>

                </div>
            </div>
            <MenuList/>
        </div>
    )
}
import React from 'react'
import { Link } from 'react-router-dom'
import style from './TikatazIcon.module.scss'

export default function TikatazIcon() {
    return (
        <div className={style.main_div }>
            <div>
                <Link to='/'>
                    <img className={style.img_logo} src='./Tikataz.logo2.svg' alt="Tikataz Logo" crossorigin="anonymous"></img>
                </Link>
            </div>
            <div className={style.main_div_1}>
                <span className={style.span_title} translate='no'>TIKATAZ</span>
            </div>
        </div>
    )
}

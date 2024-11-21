import React from 'react'
import style from './ServicesTerm.module.scss'
import { Link } from 'react-router-dom'

export default function ServicesTerm() {
    return (
        <>
            <div className={`${style.main_div}`}>
                <span className={`${style.text}`}>
                    Bằng cách nhấp vào tiếp tục, bạn đồng ý với
                    <Link>
                        <strong className={`${style.strong}`}> Điều khoản dịch vụ</strong>
                    </Link>
                    và
                    <Link>
                        <strong className={`${style.strong}`}> Chính sách quyền riêng tư </strong>
                    </Link>
                    của chúng tôi.
                </span>
            </div>
        </>
    )
}

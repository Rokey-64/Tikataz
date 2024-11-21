import React from 'react'
import TikatazIcon from '../tikataz-icon/TikatazIcon'
import { Outlet } from 'react-router-dom'
import IllustrativeImage from '../Illustrative-images/IllustrativeImage'
import style from './MdLayout.module.scss'
import MenuList from '../footer-menu-list/MenuList'

export default function MdLayout() {
    return (
        <div className={`${style.main_div}`}>
            <div>
                {/* Left side */}
            </div>
            <div className='flex flex-col items-center'>
                <div className={`${style.main_div2}`}>
                    {/* center */}
                    <div className={`${style.main_div2a}`}>
                        <div >
                            <div>
                                <IllustrativeImage textContent={<><b>Tikataz</b> - Khởi tạo nhà máy chỉ với vài bước.</>} />
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className={`${style.main_div2a2}`}>
                            <TikatazIcon />
                            <div className={`${style.main_div2a2b}`}>
                                <Outlet />
                            </div>
                        </div>
                    </div>

                </div>

                <MenuList />
            </div>
            <div>
                {/* right side */}
            </div>
        </div>
    )
}

import React from 'react'
import TikatazIcon from '../tikataz-icon/TikatazIcon'
import { Link, Outlet } from 'react-router-dom'
import IllustrativeImage from '../Illustrative-images/IllustrativeImage'
import style from './XlLayout.module.scss'
import MenuList from '../footer-menu-list/MenuList'
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from 'react-i18next'

export default function XlLayout() {
    const { t } = useTranslation();

    return (
        <div className={`${style.main_div} `}>
            <LanguageSelector/>
            <div className='flex flex-col items-center'>
                <div className={`${style.main_div2}`}>
                    {/* center */}
                    <div className={`${style.main_div2a} `}>
                        <div >
                            <div>
                                <IllustrativeImage textContent={<><b>Tikataz</b> - {t("layout.title")}.</>} />
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
            <div >
                {/* right side */}
            </div>
        </div>
    )
}

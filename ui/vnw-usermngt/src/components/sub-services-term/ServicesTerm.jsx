import React from 'react'
import style from './ServicesTerm.module.scss'
import { Link } from 'react-router-dom'
import { Trans } from 'react-i18next'

export default function ServicesTerm() {
    return (
        <>
            <div className={`${style.main_div}`}>
                <span className={`${style.text}`}>
                    <Trans
                        i18nKey="agree_terms"
                        components={{
                            1: <a href="https://support.tikataz.com/" className="text-blue-700 underline hover:text-blue-900 font-normal" target="_blank" rel="noopener noreferrer"></a>,
                            3: <strong className={style.strong}></strong>,
                            5: <a href="https://support.tikataz.com/" className="text-blue-700 underline hover:text-blue-900 font-normal" target="_blank" rel="noopener noreferrer"></a>,
                            7: <strong className={style.strong}></strong>,
                        }}
                    />
                </span>
            </div>
        </>
    )
}

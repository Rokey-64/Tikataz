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
                            1: <Link to="/terms" />,
                            3: <strong className={style.strong} />,
                            5: <Link to="/privacy" />,
                            7: <strong className={style.strong} />
                        }}
                    />
                </span>
            </div>
        </>
    )
}

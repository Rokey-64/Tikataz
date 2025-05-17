import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import style from './VerfMsg.module.scss'
import { useTranslation } from 'react-i18next';

export default function VerificationMessg() {
    const { t } = useTranslation();
    return (
        <div className={`${style.main_div}`} role="alert">
            <AiOutlineCheckCircle className={`${style.circle}`} />
            <span className={`${style.span}`}>{t('robot_verified')}</span>
        </div>
    );
}

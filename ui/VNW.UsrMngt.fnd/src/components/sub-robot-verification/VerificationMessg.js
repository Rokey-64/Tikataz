import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import style from './VerfMsg.module.scss'

export default function VerificationMessg() {
    return (
        <div className={`${style.main_div}`} role="alert">
            <AiOutlineCheckCircle className={`${style.circle}`} />
            <span className={`${style.span}`}>Verification successful. You are not a robot.</span>
        </div>
    );
}

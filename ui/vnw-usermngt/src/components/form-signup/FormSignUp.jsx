import React, { useState } from 'react'
import InputText from '../input-text/InputText';
import CustomButton from '../button-custom/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import InputPassword from '../input-password/InputPassword';
import ServicesTerm from '../sub-services-term/ServicesTerm';
import registerHandleClick from '../../events/registerHandleClick';
import FormMassage from '../form-massage/FormMassage';
import { useSelector, useDispatch } from 'react-redux';
import { signupSlice } from './signupSlice';
import { useTranslation } from 'react-i18next';

export default function FormSignUp() {
    const { t, i18n} = useTranslation();
    const navigate = useNavigate();

    const [content, setContent] = useState('');
    const [isLoggingIn, setIssLoggingIn] = useState(false);
    const dispatch = useDispatch();
    const {email, password, confirmPassword, userName} = useSelector((state) => state.signup);

    const onChangeEmail = (e) => {
        dispatch(signupSlice.actions.signup({email: e.target.value}));
    }

    const onChangePassword = (e) => {
        dispatch(signupSlice.actions.signup({password: e.target.value}));
    }

    const onChangeConfirmPassword = (e) => {
        dispatch(signupSlice.actions.signup({confirmPassword: e.target.value}));
    }

    const onChangeUserName = (e) => {
        dispatch(signupSlice.actions.signup({userName: e.target.value}));
    }

    const handleClick = async () => {
        if(isLoggingIn) return;
        setIssLoggingIn(true);

        const body = {
            id: '125de0-1b3b-4b6d-8c7b-0f1f1f1f1f1f',
            lang: i18n.language,
            deviceID: 'deviceID',
            email: email,
            userName: userName,
            password: password,
            confirmPassword: confirmPassword
        };

        await registerHandleClick(navigate, setContent, body)
        .finally(() => {
            setIssLoggingIn(false);
        });
    }

    return (
        <>
            <form autocomplete="one-time-code">
                <div className='w-[95%] max-w-[20rem] min-w-full'>
                    <div className='grid grid-rows-4 grid-flow-col'>
                        <InputText text_holder={"Email**"} value={email} onChange={onChangeEmail} />
                        <InputPassword className="h-4" text_holder={`${t("signup.enter_password")} **`} value={password} onChange={onChangePassword}/>
                        <InputPassword className="h-4" text_holder={`${t("signup.confirm_password")} **`} value={confirmPassword} onChange={onChangeConfirmPassword} />
                        <InputText className="h-4" text_holder={`${t("signup.full_name")} **`} value={userName} onChange={onChangeUserName}/>
                    </div>
                    <div className="text-right my-4">
                        <Link to="/login" className="text-blue-500 hover:text-blue-700 underline font-light text-lg">{t("login_with_account")}?</Link>
                    </div>
                    <div className='grid grid-flow-row'>
                        <div className='flex justify-end'>
                            <div>
                                <CustomButton content={t("signup.register")} handleClick={handleClick}/>
                            </div>
                        </div>
                        <ServicesTerm />
                    </div>
                    <div className='hidden'>
                        <FormMassage content={content}/>
                    </div>
                </div>
            </form>
        </>
    )
}

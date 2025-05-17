import React, { useState } from 'react'
import CustomButton from '../button-custom/CustomButton'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormMassage from '../form-massage/FormMassage'
import InputPassword from '../input-password/InputPassword'
import changePasswordHandleClick from '../../events/changePasswordHandleClick'
import { useSelector, useDispatch } from 'react-redux'
import { passwordResetSlice } from './passwordResetSlice'
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next'

export default function PasswordReset() {
    const { t, i18n} = useTranslation();
    const [clicking, setClicking] = useState(false);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('tk');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {password, confirmPassword} = useSelector((state) => state.passwordReset);

    const passwordChange = (e) => {
        dispatch(passwordResetSlice.actions.passwordReset({password: e.target.value}));
    }

    const confirmPasswordChange = (e) => {
        dispatch(passwordResetSlice.actions.passwordReset({confirmPassword: e.target.value}));
    }

    const handleClick = async () => {
        // prevent double click
        if (clicking) return;
        setClicking(true);

        const body = {
            id: uuidv4(),
            lang: i18n.language,
            password: password,
            confirmPassword: confirmPassword,
            token: token
        }

        await changePasswordHandleClick(navigate, body).finally(() => {
            setClicking(false);
        });
    }

    return (
        <>
            <form>
                <div className='w-[95%] max-w-[20rem] min-w-full'>
                    <div className=' flex justify-center mt-2'>
                        <div className='w-64'>
                            <p className='text-sm'>{t("password_reset.description")}</p>
                        </div>
                    </div>
                    <div className="text-right my-4">
                        <InputPassword text_holder={t("password_reset.enter_new")} value={password} onChange={passwordChange}/>
                        <InputPassword text_holder={t("password_reset.confirm")} value={confirmPassword} onChange={confirmPasswordChange}/>
                    </div>
                    <div className='grid grid-flow-col'>
                        <div className='mr-5 mb-4'>
                            <Link to="/" className="text-blue-500 hover:text-blue-700 underline font-light text-base">{t("login_with_account")}?</Link>
                        </div>
                        <CustomButton content={t("password_reset.change")} handleClick={handleClick}/>
                    </div>
                </div>
                <div className='hidden'>
                    <FormMassage content={t("password_reset.message")} />
                </div>
            </form>
        </>
    )
}

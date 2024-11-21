import React, { useState } from 'react'
import InputText from '../input-text/InputText';
import CustomButton from '../button-custom/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import VerificationMessg from '../sub-robot-verification/VerificationMessg';
import FormMassage from '../form-massage/FormMassage';
import forgotPasswordHandleClick from '../../events/resetPasswordClick.js';
import { v4 as uuidv4 } from 'uuid';
import getDeviceIDSVC from '../../services/getDeviceID.js';
import getLang from '../../services/getLang';
import { useSelector, useDispatch } from 'react-redux';
import { authsSlice } from './authsSlice.js';

const userLanguage = getLang();

export default function FormAuthn() {
    const [isClicked, setIsClicked] = useState(false);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loginName} = useSelector((state) => state.auths);

    const onChangeLoginName = (e) => {
        dispatch(authsSlice.actions.auths({loginName: e.target.value}));
    }

    /**
     * When the button is clicked, this function will be called to request the verification code
     */
    const buttonClick = async () => {
        if(isClicked) return;
        setIsClicked(true);

        const body = {
            id: uuidv4(),
            lang: userLanguage,
            deviceID: getDeviceIDSVC(),
            loginName: loginName
        };

        // call the API to request the verification code
        await forgotPasswordHandleClick(navigate, setContent, body).finally(() => {
            setIsClicked(false);
        });
    }

    return (
        <>
            <form>
                <div className=' w-[95%] max-w-[20rem] min-w-full'>
                    <InputText text_holder={"Enter your phone number or email"} value={loginName} onChange={onChangeLoginName}/>
                    <div className="text-right my-4">
                        <VerificationMessg />
                    </div>
                    <div className='grid grid-flow-row'>
                        <div className='flex ml-4 my-4'>
                            <Link to="/" className="text-blue-500 hover:text-blue-700 underline font-light text-lg">Login with account?</Link>
                            <div className='ml-5'>
                                <CustomButton content={"Continue"} handleClick={buttonClick}/>
                            </div>
                        </div>
                    </div>
                    <div className='hidden'>
                        <FormMassage content={'Enter code that we have sent to your email your...@domain.com'} />
                    </div>
                </div>
            </form>
        </>
    )
}

import React, { useId, useState } from 'react'
import InputText from '../input-text/InputText';
import CustomButton from '../button-custom/CustomButton';
import GoogleButton from '../button-google/GoogleButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormMassage from '../form-massage/FormMassage';
import InputPassword from '../input-password/InputPassword';
import ServicesTerm from '../sub-services-term/ServicesTerm';
import signupHandleClick from '../../events/signupHandleClick.js';
import signinHandleClick from '../../events/loginHandleClick.js';
import { v4 as uuidv4 } from 'uuid';
import getDeviceIDSVC from '../../services/getDeviceID.js';
import getLang from '../../services/getLang';
import { useSelector, useDispatch } from 'react-redux';
import { loginSlice } from './loginSlice';


const userLanguage = getLang();


export default function FormLogin() {
    const [content, setContent] = useState('');
    const [isLoggingIn, setIssLoggingIn] = useState(false);
    const dispatch = useDispatch();
    const {loginName, password} = useSelector((state) => state.login);

    const navigate = useNavigate();

    // when the loginName or password change, update the redux store
    const onChangeLoginName = (e) => {
        dispatch(loginSlice.actions.login({loginName: e.target.value}));
    }

    // when the loginName or password change, update the redux store
    const onChangePassword = (e) => {
        dispatch(loginSlice.actions.login({password: e.target.value}));
    }
    const useSignupHandleClick = () => {
        signupHandleClick(navigate);
    }

    /**
     * The login button click event
     * @returns 
     */
    const useSigninHandleClick = async () => {
        // prevent multiple click
        if(isLoggingIn) return;
        setIssLoggingIn(true);

        // create login body
        const body = {
            id: uuidv4(),
            lang: userLanguage,
            deviceID: getDeviceIDSVC(),
            loginName: loginName,
            password: password,
        };

        // call login event
        await signinHandleClick(navigate, setContent, body).finally(() => {
            setIssLoggingIn(false);
        });
    }


    return (
        <>
            <form >
                <div className='w-[95%] max-w-[20rem] min-w-80'>
                    <div>
                        <InputText text_holder={"Nhập số điện thoại hoặc email"} value={loginName} onChange={onChangeLoginName} />
                        <InputPassword text_holder={"Mật khẩu"} value={password} onChange={onChangePassword} />
                    </div>
                    <div className="text-right my-4">
                        <Link to="/identity" className="text-blue-500 hover:text-blue-700 underline font-light text-lg">Quên mật khẩu?</Link>
                    </div>
                    <div className='grid grid-flow-row'>
                        <div className='grid grid-flow-col'>
                            <div className="flex items-center justify-center">
                                <CustomButton content={"Đăng nhập"} handleClick={useSigninHandleClick}/>
                            </div>
                            <div className="flex items-center justify-center ml-1">
                                <GoogleButton content={"Sử dụng Google"}/>
                            </div>
                        </div>
                        <div>
                            <div className='grid grid-cols-3 grid-flow-col items-center my-6'>
                                <hr className='w-28 divide-zinc-400'></hr>
                                <p className='px-1 text-[#464646] text-sm text-center'>or with</p>
                                <hr className='w-28'></hr>
                            </div>
                            <div className='grid grid-flow-col content-start'>
                                <div className="pl-1">
                                    <CustomButton content={"Đăng ký"} handleClick={useSignupHandleClick}/>
                                </div>
                            </div>
                            <ServicesTerm/>
                        </div>
                    </div>
                    <div className='hidden'>
                        <FormMassage content={content}/>
                    </div>
                </div>
            </form>
        </>
    )
}

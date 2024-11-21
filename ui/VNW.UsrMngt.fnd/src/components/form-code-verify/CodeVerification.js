import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OtpTextInput from '../sub-otp-box/OtpTextInput';
import FormMassage from '../form-massage/FormMassage';
import style from './CodeVerification.module.scss'
import resendOTPHandleClick from '../../events/resentOTPHandleClick';
import getLang from '../../services/getLang';
import { useSelector, useDispatch } from 'react-redux';
import { verifyOTPSlice } from './verifyOTPSlice';


const userLanguage = getLang();


export default function CodeVerification({handleClick}) {
    const [content, setContent] = useState('Nhập mã code được gửi tới địa chỉ mail của bạn...@domain.com')
    const numInputs = 6 // default 6 inputs
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('tk');
    const key = queryParams.get('k');
    const dispatch = useDispatch();
    const {otp} = useSelector((state) => state.verifyOTP);

    // Submit OTP code
    useEffect(() => {
        if (otp.length === numInputs) {
            const timeout = setTimeout(async () => {
                handleClick(navigate, otp, token);
            }, 0);

            return () => clearTimeout(timeout);
        }
    }, [otp])

    // When the OTP code changes, update the redux store
    const onChange = (newOtp) => {
        dispatch(verifyOTPSlice.actions.verifyOTP({otp: newOtp}));
    }


    // Resend code
    const resendHandle = resendOTPHandleClick(token, key);

    return (
        <>
            <form>
                <div className={style.main_dev}>
                    <div className={style.main_dev_1}>
                        <div className={style.main_dev_1a}>
                            <p className={style.main_dev_1a1}>{content}</p>
                        </div>
                    </div>
                    <div className={style.main_dev_2}>
                        <OtpTextInput otp={otp} onChange={onChange} numInputs={numInputs} />
                    </div>
                    <div className={style.main_dev_3}>
                        <div className={style.main_dev_3a }>
                            {/* <CustomButton content={"Submit"} /> */}
                            <Link to="/" className={style.link_1} onClick={resendHandle}>Resend code?</Link>
                        </div>
                       
                    </div>
                    {/* <div>
                        <Link to="/login" className={style.link_1}>Login with account?</Link>
                    </div> */}

                    <div className='hidden'>
                        <FormMassage content={content} />
                    </div>
                </div>
            </form>
        </>
    )
}

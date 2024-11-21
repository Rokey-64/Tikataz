import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { confirmOtpToken } from '../../api/confirmOtpToken';
import showMessage from '../../services/showMessage';

/**
|--------------------------------------------------
| 
|-------------------------------------------------- { item, title }
*/
export default function FormContainer({ item, title, isNeedsToken }) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('tk');

    //check if token is valid or not
    useEffect(() => {
        if (!isNeedsToken) return;

        if (!token) {
            navigate('/');
            return
        }
        
        const checkToken = async () => {
            try {
                const res = await confirmOtpToken(token);
                
                if (res.status !== 200) {
                    navigate('/');
                    return;
                }
            } catch (error) {
                
            }
        }
        checkToken();
    }, [token]);


    return (
        <div className='flex justify-center bg-white rounded-[2rem] w-[22rem] mt-6 mb-24 min-h-64'>
            <div className='w-80'>
                <div className='flex justify-center font-semibold text-2xl mt-4'>
                    <div>
                        <p>{title}</p>
                        <hr></hr>
                    </div>
                </div>
                {item}
            </div>
        </div>
    )
}

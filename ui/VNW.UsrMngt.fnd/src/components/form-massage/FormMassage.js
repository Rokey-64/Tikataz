import React from 'react';
import FormContainer from '../form-container/FormContainer';
import CustomButton from '../button-custom/CustomButton';

export default function FormMassage({ content }) {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='fixed inset-0 bg-black opacity-50'></div>
            <div className='relative z-10 bg-white rounded-2xl shadow-lg p-1'>
                <div className='flex flex-col justify-center items-center bg-red-300 rounded-2xl p-6'>
                    <div>
                        <div className='flex flex-col justify-center items-center font-semibold text-2xl mt-4'>
                            <p>Notification</p>
                            <hr className='w-72 border-red-500 mt-2'></hr>
                        </div>
                        <div className='w-72 mt-4'>
                            <div className='flex justify-center mt-2'>
                                <div className='w-full text-center mt-4 h-20'>
                                    <p className='text-sm text-red-600 font-semibold'>{content}</p>
                                </div>
                            </div>
                            <div className='flex justify-around mt-4'>
                                <div className='mx-1'><CustomButton content={'Yes'} className="bg-red-500 text-white" /></div>
                                <div className='mx-1'><CustomButton content={'No'} className="bg-red-500 text-white" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './MenuList.module.scss'
import { menuDataTest } from './MenuDataTest'

export default function MenuList() {
    const { t } = useTranslation()

    return (
        <div className='xl:max-w-[75%] max-w-[95%] text-sm'>
            <div className={`${styles.main_div}`}>
                <div className='w-44 md:w-60'>
                    <span>
                        <h2 className='font-bold text-xl my-4'>{t("customerCare")}</h2>
                        <ul>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>{t('supportCenter')}</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>{t('blogs')}</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>{t('userGuide')}</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>{t('trainingProgram')}</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>{t('updates')}</Link></li>
                        </ul>
                    </span>
                </div>
                <div className='w-40 md:w-40'>
                    <span>
                        <h2 className='font-bold text-xl my-4'>{t('about')}</h2>
                        <ul>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>{t('aboutUs')}</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>{t('recruitment')}</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>{t('terms')}</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>{t('privacyPolicy')}</Link></li>
                        </ul>
                    </span>
                </div>
                <div className='w-32 md:w-40'>
                    <h2 className='font-bold text-xl my-4'>{t('payment')}</h2>
                    <div className='grid grid-cols-3 gap-1 w-32'>
                        <span className="icon"><img src='./visa.svg' alt="visa" crossOrigin='anonymous' /></span>
                        <span className="icon"><img src='./mastercard.svg' alt="mastercard" crossOrigin='anonymous' /></span>
                        <span className="icon"><img src='./jbc.svg' alt="jbc" crossOrigin='anonymous' /></span>
                        <span className="icon"><img src='./atm.svg' alt="atm" crossOrigin='anonymous' /></span>
                        <span className="icon"><img src='./momo.svg' alt="momo" crossOrigin='anonymous' /></span>
                        <span className="icon"><img src='./zalopay.svg' alt="zalopay" crossOrigin='anonymous' /></span>
                        <span className="icon viettelpay"><img src='./viettelpay.svg' alt="viettelpay" crossOrigin='anonymous' /></span>
                    </div>
                </div>
                <div className='w-36 md:w-60'>
                    <span>
                        <h2 className='font-bold text-xl my-4'>{t('followUs')}</h2>
                        <ul>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>Facebook</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>Youtube</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>Tiktok</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>Zalo</Link></li>
                        </ul>
                    </span>
                </div>
            </div>

            <div><hr className='my-5' /></div>

            <div className='flex ml-5 md:ml-11 mb-10'>
                <div className='grid grid-flow-row opacity-75'>
                    <span><strong className='text-xl'>{t('contact')}</strong></span>
                    {/* <span className='pt-2 text-yellow-600'>{t('hotline')}</span> */}
                    <span className='pt-2 text-yellow-600'>{t('support')}</span>
                    <span className='pt-2 text-yellow-600'>{t('emailContact')}</span>
                    <span className='pt-2 text-yellow-600'>{t('workTime')}</span>
                </div>
                <div className='grid grid-flow-row ml-2 mt-10 md:ml-20 '>
                    <span>
                        {/* <img src='./blue-gov.svg' alt='' crossOrigin='anonymous' />
                        <img src='./red-gov.svg' alt='' crossOrigin='anonymous' /> */}
                    </span>
                </div>
            </div>

            <div><hr className='mt-5' /></div>

            <div>
                <div className='grid grid-cols-1 grid-flow-row ml-5 md:ml-11 text-sm text-[#6d6c6c] py-5 '>
                    <span>
                        {/* {menuDataTest.copyRight}. {menuDataTest.companyName}. {t('businessCode')} {menuDataTest.bussinessLicence}
                        {t('issuedBy')} {menuDataTest.licenceBy} {t('issuedDate')} {menuDataTest.licenceDate}. 
                        {t('ecommerceLicense')} {menuDataTest.ecomerceLicent} {t('issuedBy')} {menuDataTest.ecomerceLicentBy} 
                        {t('issuedDate')} {menuDataTest.ecomerceLicentDate}. {t('address')} {menuDataTest.adress}. 
                        {t('contactAddress')} {menuDataTest.adress}. {t('phone')} {menuDataTest.phoneNumber}. 
                        {t('email')} {menuDataTest.email}. {t('responsiblePerson')} {menuDataTest.inChargeContentPerson}. 
                        {t('email')} {menuDataTest.inChargeContentEmail}. <Link className='hover:text-blue-700 text-blue-500 underline'>{t('viewPolicy')}</Link> */}
                    </span>
                </div>
            </div>
        </div>
    )
}

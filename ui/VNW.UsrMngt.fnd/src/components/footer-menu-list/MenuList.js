import React from 'react'
import { Link } from 'react-router-dom'
import styles from './MenuList.module.scss'
import { menuDataTest } from './MenuDataTest'


export default function MenuList() {



    return (
        <div className='xl:max-w-[75%] max-w-[95%] text-sm'>
            <div className={`${styles.main_div}`}>
                <div className='w-44 md:w-60'>
                    <span>
                        <h2 className='font-bold text-xl my-4'>Chăm sóc khách hàng</h2>
                        <ul>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>• Trung Tâm Trợ Giúp</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>• Tikataz Blogs</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>• Hướng dẫn khách hàng</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>• Chương trình đào tạo</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>• Thông báo cập nhật</Link></li>
                        </ul>
                    </span>
                </div>
                <div className='w-40 md:w-40'>
                    <span>
                        <h2 className='font-bold text-xl my-4'>Về Tikataz</h2>
                        <ul>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>• Giới thiệu</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>• Tuyển dụng</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>• Điều khoản</Link></li>
                            <li className='mx-1 mb-2'><Link className='hover:text-blue-600'>• Chính sách bảo mật</Link></li>
                        </ul>
                    </span>
                </div>
                <div className='w-32 md:w-40'>
                    <h2 className='font-bold text-xl my-4'>Thanh toán</h2>
                    <div className='grid grid-cols-3 gap-1 w-32'>
                        <span className="icon">
                            <img src='./visa.svg' alt="visa" crossOrigin='anonymous'></img>
                        </span>
                        <span className="icon">
                            <img src='./mastercard.svg' alt="visa" crossOrigin='anonymous'></img>
                        </span>
                        <span className="icon">
                            <img src='./jbc.svg' alt="visa" crossOrigin='anonymous'></img>
                        </span>
                        <span className="icon">
                            <img src='./atm.svg' alt="visa" crossOrigin='anonymous'></img>
                        </span>
                        <span className="icon">
                            <img src='./momo.svg' alt="visa" crossOrigin='anonymous'></img>
                        </span>
                        <span className="icon">
                            <img src='./zalopay.svg' alt="visa" crossOrigin='anonymous'></img>
                        </span>
                        <span className="icon viettelpay">
                            <img src='./viettelpay.svg' alt="visa" crossOrigin='anonymous'></img>
                        </span>
                    </div>
                </div>
                <div className='w-36 md:w-60'>
                    <span>
                        <h2 className='font-bold text-xl my-4'>Theo dõi chúng tôi trên</h2>
                        <ul>
                            <li className='mx-1 mb-2'>
                                <Link className='hover:text-blue-600'>
                                    Facebook
                                </Link>
                            </li>
                            <li className='mx-1 mb-2'>
                                <Link className='hover:text-blue-600'>
                                    Youtube
                                </Link>
                            </li>
                            <li className='mx-1 mb-2'>
                                <Link className='hover:text-blue-600'>
                                    Tiktok
                                </Link>
                            </li>
                            <li className='mx-1 mb-2'>
                                <Link className='hover:text-blue-600'>
                                    Zalo
                                </Link>
                            </li>
                        </ul>
                    </span>
                </div>
            </div>
            <div>
                <hr className='my-5' />
            </div>
            <div className='flex ml-5 md:ml-11 mb-10'>
                <div className='grid grid-flow-row opacity-75'>
                    <span><strong className='text-xl'>Liên lạc</strong></span>
                    <span className='pt-2 text-yellow-600'>• Hostline CSKH - 18009061</span>
                    <span className='pt-2 text-yellow-600'>• Hỗ trợ kỹ thuật - 0333462905 (Mr Linh)</span>
                    <span className='pt-2 text-yellow-600'>• Email liên hệ - goltime604@gmail.com</span>
                    <span className='pt-2 text-yellow-600'>• Hoạt động 24/24 (Kể cả T7/CN)</span>
                </div>
                <div className='grid grid-flow-row ml-2 mt-10 md:ml-20 '>
                    <span>
                        <img src='./blue-gov.svg' alt='' crossOrigin='anonymous'/>
                        <img src='./red-gov.svg' alt='' crossOrigin='anonymous'/>
                    </span>
                </div>
            </div>
            <div >
                <hr className='mt-5' />
            </div>
            <div>
                <div className='grid grid-cols-1 grid-flow-row ml-5 md:ml-11 text-sm  text-[#6d6c6c] py-5 '>
                    <span>
                        {menuDataTest.copyRight}. {menuDataTest.companyName}.
                        GPDKKD: {menuDataTest.bussinessLicence}
                        do {menuDataTest.licenceBy} cấp ngày {menuDataTest.licenceDate}.
                        GPMXH: {menuDataTest.ecomerceLicent} do {menuDataTest.ecomerceLicentBy}
                        cấp ngày {menuDataTest.ecomerceLicentDate}.
                        Địa chỉ:{menuDataTest.adress}.
                        Địa chỉ liên hệ và gửi chứng từ: {menuDataTest.adress}.
                        Điện thoại: {menuDataTest.phoneNumber}.
                        Email: {menuDataTest.email}.
                        Chịu trách nhiệm nội dung: {menuDataTest.inChargeContentPerson}.
                        Email:{menuDataTest.inChargeContentEmail}. <Link className='hover:text-blue-700 text-blue-500 underline'>Xem chính sách sử dụng</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

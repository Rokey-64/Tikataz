import React, {useEffect,useState} from 'react'
import MenuBar from './Menu.js'
import { Outlet } from 'react-router-dom';

import FootLayout from './FootLayout.js';

const HomePage = (props) => {
    return (
        <div className='grid justify-items-center max-w-full'>
            {/* Header */}
            <div className='h-auto flex'>
                <div className='py-4 flex-none w-96 px-3'>
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="../Tikataz.logo2.svg" className="h-8" alt="Flowbite Logo" />


                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tikataz - docs</span>
                    </a>
                </div>
                <div className='py-4 flex-[2_1_0%] px-40  content-center'>
                    <MenuBar data={props.data}/>
                </div>
                <div className='py-4 flex-none w-96 content-center px-3 hidden lg:block'>
                    <div className="flex flex-wrap items-end justify-end max-w-screen-xl mx-auto p-4">
                        <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Login</a>
                            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign up</a>
                            <button data-collapse-toggle="mega-menu" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
            <FootLayout/>
        </div>
    )
}
export default HomePage

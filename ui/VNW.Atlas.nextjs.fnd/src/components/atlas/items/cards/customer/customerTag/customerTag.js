import { useState } from 'react';
import { useTranslation } from 'react-i18next';


import TagElement from './tagElement';
import { TbView360 } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa6";
import { FcShipped } from "react-icons/fc";
import { IoPricetags } from "react-icons/io5";
import { FaWarehouse } from "react-icons/fa6";
import { FaSitemap } from "react-icons/fa";
import { TbCoinEuro } from "react-icons/tb";
import { GiAchievement } from "react-icons/gi";
import Badge from '../../generals/Badge';
import Cert from '../../generals/Cert';
import Partner from '../../generals/Partner';
import { MdCenterFocusWeak } from 'react-icons/md';

/**
 * This component is used to display the customer tag.
 * @returns 
 */
const CustomerTag = ({ card }) => {
    const [isSetElement, setIsSetElement] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="w-[290px] sm:w-[38rem] h-[20rem] sm:h-[17rem] rounded-2xl  border border-[#e2e2e2]  m-2">
            <div className="flex relative -top-[0.35rem] ml-5">
                <button className="w-3 h-3 bg-[#3eb8ff] rounded-full mr-1 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:bg-[#a4ddfc]" />
                <button className="w-3 h-3 bg-[#E8E8E8] rounded-full mr-1 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:bg-[#E8E8E8]" />
                <button className="w-3 h-3 bg-[#E8E8E8] rounded-full mr-1 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:bg-[#E8E8E8]" />
            </div>
            <hr className="relative top-36 left-1/2 w-full  border-[#e2e2e2] border-t-1 transform -translate-x-1/2 -translate-y-1/2" />

            <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-5 sm:grid-rows-3 grid-flow-row justify-center w-full h-[60%] sm:h-[50%] ml-2">
                <TagElement icon={<TbView360 className='size-4 sm:size-7 text-slate-500' />} content={t("atlas.tags.overall")} isActive={true} />
                <TagElement icon={<FaHandshake className='size-4 sm:size-7 text-green-500' />} content={t("atlas.tags.representative")} />
                <TagElement icon={<TbCoinEuro className='size-4 sm:size-7 text-yellow-500' />} content={t("atlas.tags.promotion")} />
                <TagElement icon={<FcShipped className='size-4 sm:size-7' />} content={t("atlas.tags.dilivery")} />
                <TagElement icon={<FaWarehouse className='size-4 sm:size-7 text-lime-900' />} content={t("atlas.tags.storage")} />
                <TagElement icon={<FaSitemap className='size-4 sm:size-7' />} content={t("atlas.tags.merged_product")} />
                <TagElement icon={<IoPricetags className='size-4 sm:size-7 text-indigo-500' />} content={t("atlas.tags.pricing")} />

                <div className='ct:hidden block'>
                    <TagElement icon={<GiAchievement className='size-4 sm:size-7 text-red-700' />} content={t("atlas.tags.achievements")} />
                </div>
            </div>

            {/* viewport */}
            {/* viewport */}
            {/* viewport */}
            <div class="w-[290px] sm:w-[38rem] h-[9rem] sm:h-[7rem]  p-3 flex flex-col justify-between text-sm overflow-hidden">
                <div class="flex justify-between">
                    <div class="flex items-center w-[48%] truncate">
                        <svg class="w-4 h-4 mr-1 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                        </svg>
                        <span class="truncate">abc.com</span>
                    </div>

                    <div class="flex items-center w-[48%] truncate">
                        <svg class="w-4 h-4 mr-1 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span class="truncate">contact@abc.com</span>
                    </div>
                </div>

                <div class="flex justify-between">
                    <div class="flex items-center w-[48%] truncate">
                        <svg class="w-4 h-4 mr-1 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>012***789</span>
                    </div>

                    <div class="flex items-center w-[48%] truncate">
                        <svg class="w-4 h-4 mr-1 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                        </svg>
                        <span class="truncate">fb.com/abc</span>
                    </div>
                </div>

                <div class="flex justify-between">
                    <div class="flex items-center w-[48%] truncate">
                        <svg class="w-4 h-4 mr-1 text-blue-500 flex-shrink-0" viewBox="0 0 24 24">
                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" fill="#03A5FA" />
                            <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" fill="#03A5FA" />
                            <path d="M12 10c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" fill="#03A5FA" />
                        </svg>
                        <span>zalo.me/***</span>
                    </div>

                    <div class="flex items-center w-[48%] truncate">
                        <svg class="w-4 h-4 mr-1 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        <span class="truncate">CÔNG TY ABC</span>
                    </div>
                </div>

                <div class="flex justify-between">
                    <div class="flex items-center w-[48%] truncate">
                        <svg class="w-4 h-4 mr-1 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path>
                        </svg>
                        <span>MST: 012***789</span>
                    </div>

                    <div class="flex items-center w-[48%] truncate">
                        <svg class="w-4 h-4 mr-1 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Việt Nam</span>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default CustomerTag;
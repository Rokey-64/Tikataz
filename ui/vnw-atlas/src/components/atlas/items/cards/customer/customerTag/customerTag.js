import { useState } from 'react';
import { useTranslations } from "next-intl";


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
    const t = useTranslations('trans');

    return (
        <div className="w-[290px] sm:w-[38rem] h-[20rem] sm:h-[17rem] rounded-2xl  m-2">
            {/* <div className="flex relative -top-[0.35rem] ml-5">
                <button className="w-3 h-3 bg-[#3eb8ff] rounded-full mr-1 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:bg-[#a4ddfc]" />
                <button className="w-3 h-3 bg-[#E8E8E8] rounded-full mr-1 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:bg-[#E8E8E8]" />
                <button className="w-3 h-3 bg-[#E8E8E8] rounded-full mr-1 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:bg-[#E8E8E8]" />
            </div> */}
            {/* <hr className="relative top-36 left-1/2 w-full  border-[#e2e2e2] border-t-1 transform -translate-x-1/2 -translate-y-1/2" /> */}
            {/* <hr className='mb-5'/> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-5 sm:grid-rows-3 grid-flow-row justify-center w-full h-[55%] sm:h-[50%] ml-2">
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

        </div>
    );
};

export default CustomerTag;
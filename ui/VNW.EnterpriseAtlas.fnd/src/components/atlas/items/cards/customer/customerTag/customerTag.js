import { useState } from 'react';


import TagElement from './tagElement';
import { TbView360 } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa6";
import { FcShipped } from "react-icons/fc";
import { IoPricetags } from "react-icons/io5";
import { FaWarehouse } from "react-icons/fa6";
import { FaSitemap } from "react-icons/fa";
import { TbCoinEuro } from "react-icons/tb";

/**
 * This component is used to display the customer tag.
 * @returns 
 */
const CustomerTag = () => {
    const [isSetElement, setIsSetElement] = useState(false);

    return (
        <div className="w-[290px] sm:w-[38rem] h-[20rem] sm:h-[17rem] rounded-2xl  border border-[#e2e2e2] bg-white  m-2">
            <div className="flex relative -top-[0.35rem] ml-5">
                <button className="w-3 h-3 bg-[#3eb8ff] rounded-full mr-1 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:bg-[#a4ddfc]" />
                <button className="w-3 h-3 bg-[#E8E8E8] rounded-full mr-1 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:bg-[#E8E8E8]" />
                <button className="w-3 h-3 bg-[#E8E8E8] rounded-full mr-1 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:bg-[#E8E8E8]" />
            </div>
            <hr className="relative top-36 left-1/2 w-full  border-[#e2e2e2] border-t-1 transform -translate-x-1/2 -translate-y-1/2" />

            <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-5 sm:grid-rows-3 grid-flow-row justify-center w-full h-[60%] sm:h-[50%] ml-2">
                <TagElement icon={<TbView360 className='size-4 sm:size-7 text-slate-500'/>} content="Tổng quan" isActive={true}/>
                <TagElement icon={<FaHandshake className='size-4 sm:size-7 text-green-500'/>} content="Đại diện" />
                <TagElement icon={<TbCoinEuro className='size-4 sm:size-7 text-yellow-500'/>} content="Khuyến mãi" />
                <TagElement icon={<FcShipped className='size-4 sm:size-7'/>} content="Giao hàng" />
                <TagElement icon={<FaWarehouse className='size-4 sm:size-7 text-lime-900'/>} content="Kho bãi" />
                <TagElement icon={<FaSitemap className='size-4 sm:size-7'/>} content="Ghép hàng" />
                <TagElement icon={<IoPricetags className='size-4 sm:size-7 text-indigo-500'/>} content="Báo giá" />
            </div>
        </div>
    );
};

export default CustomerTag;
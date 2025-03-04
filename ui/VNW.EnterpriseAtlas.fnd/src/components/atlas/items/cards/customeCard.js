import Rating from "./rating/rating";
import CustomerBody from "./customer/CustomerBody";
import Certification from "./certification/certification";
import ItemBox from "./items/itemBox";
import Status from "./status/status";
import LeftToolBox from "./leftToolBox/leftToolBox";
import ShowDistance from "./distance/distance";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

const CustomCard = ({ tag, index }) => {

    return (
        <div className='flex'>
            <div className="mt-32 mr-1">
                <LeftToolBox />
            </div>
            <div className="mb-32">
                <div className="flex items-end">
                    <div>
                        <Rating />
                    </div>
                    <div className="ml-auto mr-3 mb-1 opacity-85">
                        <Status index={index} />
                    </div>
                </div>
                <div className="flex w-[305px] sm:w-[39rem] xl:w-[49rem] h-[25.5rem] rounded-2xl  bg-white">
                    <div>
                        <CustomerBody tag={tag} />
                    </div>
                    <div className="ml-16 hidden md:block">
                        <hr className="w-0 h-full border-[#e7e7e7] border-r-[1px] opacity-50" />
                    </div>
                    <div className="w-full h-full hidden xl:block">
                        <Certification />
                    </div>
                </div>
                <div className="ml-7 mt-1 block sm:hidden">
                    <ShowDistance />
                </div>
                <div>
                    <div className="w-full">
                        <div className="mt-1 hidden sm:block ml-auto mr-5 w-fit">
                            <ShowDistance />
                        </div>
                    </div>
                    <ItemBox products={tag.productions} />
                </div>

            </div>
        </div>
    );
};
export default CustomCard;
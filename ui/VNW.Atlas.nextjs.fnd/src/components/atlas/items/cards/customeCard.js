import Rating from "./rating/rating";
import CustomerBody from "./customer/CustomerBody";
import LeftBar from "./LeftBar";
import ItemBox from "./items/itemBox";
import Status from "./status/status";
import LeftToolBox from "./leftToolBox/leftToolBox";
import ShowDistance from "./distance/distance";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

const CustomCard = ({ card, index }) => {

    return (
        <div className='flex justify-center'>
            <div className="mt-32 mr-1">
                <LeftToolBox />
            </div>
            <div className="mb-32 w-[305px] sm:w-[39rem] ct:w-[49rem]">
                <div className="flex items-end">
                    <div>
                        <Rating rating={card.rating}/>
                    </div>
                    <div className="ml-auto mr-3 mb-1 opacity-85">
                        <Status card={card} />
                    </div>
                </div>
                <div className="flex w-[305px] sm:w-[39rem] ct:w-[49rem] h-[25.5rem] rounded-2xl bg-white">
                    <div>
                        <CustomerBody card={card} />
                    </div>
                    <div className=" hidden md:block">
                        <hr className="w-0 h-full border-[#e7e7e7] border-r-[1px] opacity-50" />
                    </div>
                    <div className="w-full h-full hidden ct:block">
                        <LeftBar card={card}/>
                    </div>
                </div>
                <div className="ml-7 mt-1 block sm:hidden">
                    <ShowDistance data={card.data}/>
                </div>
                <div>
                    <div className="w-full">
                        <div className="mt-1 hidden sm:block ml-auto mr-5 w-fit">
                            <ShowDistance data={card.data}/>
                        </div>
                    </div>
                    <ItemBox card={card} />
                </div>

            </div>
        </div>
    );
};
export default CustomCard;
'use client'
import React, { useRef, useState, useCallback } from "react";
import InsideSearch from './searching-box/insideSearch';
import OutSideSearch from './searching-box/outsideSearch';
import Navbar from "../../common/Navbar";
import TikatazLogo from "../../common/TikatazLogo";
import getAtlasCardAPI from "@/api/getAtlasCard";
import { setAtlas } from "@/redux/atlasSlice";
import { setOfset } from "@/redux/searchSlice";
import { setSearchValue } from "@/redux/searchSlice";
import { throttle } from "lodash";
import { useSelector, useDispatch } from "react-redux";

/**
 * Toolbar component that displays the header toolbar of the application
 * @returns 
 */
const Toolbar = () => {
    const [insideSearch, setInsideSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchValue = useSelector((state) => state.search);
    const dispatch = useDispatch();

    const searchChange = (e) => {
        if (e.target.value === searchValue.value) return;
        dispatch(setSearchValue(e.target.value));
    }

    const searchCallback = useCallback(async () => {
        setLoading(true);
        if (searchValue.value) {
            const cards = await getAtlasCardAPI("", "manual", undefined, searchValue.value, "csr");
            if (!cards) return;

            dispatch(setAtlas(cards));
            dispatch(setOfset(1));
        }
        setLoading(false);
    }, [searchValue.value]);

    // Function to handle the search icon click
    const searchClick = async () => {
        await searchCallback();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div>
            {loading && (
                <div className="fixed top-[4rem] left-0 right-0 h-0.5 z-50 bg-gray-200 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-amber-100 via-orange-200 to-red-200 origin-left animate-[scaleX_5s_linear_infinite]"></div>
                </div>
            )}
            <div className="grid grid-cols-[70%_30%] md:grid-cols-[80%_20%] items-center justify-center bg-white shadow">
                <div className="flex items-center ">
                    <div className="mx-1 sm:mx-3 my-3"><TikatazLogo /></div>
                    <div className=""><InsideSearch searchClick={searchClick} value={searchValue.value} onChange={searchChange} /></div>
                </div>
                <div className="flex items-center ml-auto">
                    <div className="flex justify-center">
                        {/* <Toolbox /> */}
                        <Navbar />
                    </div>
                    {/* <div className="hidden md:block mt-2 mr-10 ml-5"><Profile /></div> */}
                </div>
            </div>
            {
                insideSearch ? (
                    <div className="block sm:hidden "><OutSideSearch searchClick={searchClick} value={searchValue.value} onChange={searchChange} /></div>
                ) : null
            }
        </div>
    );
};

export default Toolbar;
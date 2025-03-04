import React, { useState } from "react";
import Logo from './logo/logo';
import Toolbox from "./toolbox/toolbox";
import InsideSearch from './searching-box/insideSearch';
import OutSideSearch from './searching-box/outsideSearch';
import Profile from './profiles/profile';

/**
 * Toolbar component that displays the header toolbar of the application
 * @returns 
 */
const Toolbar = () => {
    const [insideSearch, setInsideSearch] = useState(false);
    const [search, setSearch] = useState('');

    const searchChange = (e) => {
        setSearch(e.target.value);
    }

    // Function to handle the search icon click
    const insideSearchIconClick = () => {
        setInsideSearch(!insideSearch);

    }

    const outsideSearchIconClick = () => {
        setInsideSearch(!insideSearch);
    }


    return (
        <div>
            <div className="grid grid-cols-[80%_20%] md:grid-cols-[70%_30%] items-center justify-center bg-white shadow">
                <div className="flex items-center ">
                    <div className="mx-1 sm:mx-3 my-3"><Logo /></div>
                    <div className=""><InsideSearch searchClick={insideSearchIconClick} value={search} onchange={searchChange} /></div>
                </div>
                <div className="flex items-center ml-auto ">
                    <div className="flex justify-center"><Toolbox /></div>
                    <div className="hidden md:block mt-2 mr-10 ml-5"><Profile /></div>
                </div>
            </div>
            {
                insideSearch ? (
                    <div className="block sm:hidden "><OutSideSearch searchClick={outsideSearchIconClick} value={search} onchange={searchChange} /></div>
                ) : null
            }
        </div>
    );
};

export default Toolbar;
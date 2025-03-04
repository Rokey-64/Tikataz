import React from "react";
import Chatbox from "./chatbox/chatbox";
import Contacts from "./contacts/contacts";
import Home from "./home/home";
import { GoListUnordered } from "react-icons/go";

/**
 * Toolbox component for the toolbar that contains the home, contacts, and chatbox components
 * @returns 
 */
const Toolbox = () => {
    return (
        <div>
            <div className="hidden lg:block">
                <div className="flex items-center align-middle pt-2 ">
                    <div className="m-1">
                        <Home />
                    </div>
                    <div className="m-1">
                        <Contacts />
                    </div>
                    <div className="m-1">
                        <Chatbox />
                    </div>
                </div>

            </div>
            <div className="block lg:hidden">
                <button className="hover:bg-[#e1e1e2] py-2 px-2 rounded-full">
                    <GoListUnordered className="size-8 text-[#848484]" />
                </button>
            </div>
        </div>
    );
};

export default Toolbox;
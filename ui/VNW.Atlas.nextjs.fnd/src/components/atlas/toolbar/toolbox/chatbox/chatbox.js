import React from "react";
import { IoChatbox } from "react-icons/io5";

/**
 * Chatbox component for the toolbar
 * @returns 
 */
const Chatbox = () => {
    return (
        <div>
            <button className='hover:bg-[#e1e1e2] py-2 px-2 rounded-xl'>
                <IoChatbox className='size-8 text-[#A79018]' />
            </button>
        </div>
    );
};

export default Chatbox;
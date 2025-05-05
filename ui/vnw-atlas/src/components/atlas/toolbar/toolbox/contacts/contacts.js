import React from "react";
import { IoMdContacts } from "react-icons/io";

/**
 * A component that displays a tool item in the toolbar
 * @returns 
 */
const Contacts = () => {
    return (
        <div >
            <button className='hover:bg-[#e1e1e2] py-2 px-2 rounded-xl'>
                <IoMdContacts className='size-8 text-[#848484]' />
            </button>
        </div>
    );
};

export default Contacts;
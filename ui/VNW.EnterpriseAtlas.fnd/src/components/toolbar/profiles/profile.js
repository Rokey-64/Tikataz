import React from "react";
import { RiAccountPinCircleFill } from "react-icons/ri";

// Profile component that displays the profile of the user
const Profile = () => {
    return (
        <div >
            <button className='hover:bg-[#e1e1e2]  rounded-xl'>
                <RiAccountPinCircleFill  className='size-8 text-[#848484] hover:text-blue-600' />
            </button>
        </div>
    );
};

export default Profile;
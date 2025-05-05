import React from "react";
import BranchInfo from "./BranchInfo";
import Contacts from "./Contacts";
import AddressList from "./AddressList";
import SocialWebsite from "./SocialWebsite";
import BussinessMajor from "./BussinessMajor";
import WorkingSchedule from "./WorkingSchedule";

/**
 * This component is used to get the common information of a company
 * @returns 
 */
const CardGeneral = () => {
    return (
        <div className="xl:flex gap-10 p-4">
            <div className="bg-[#fcfbfb]">
                {/* Header Section */}
                <BranchInfo />

                {/* Info Section */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Contacts />
                    <AddressList />
                    <SocialWebsite />
                    <BussinessMajor />                    
                </div>
            </div>
            <WorkingSchedule />
        </div>
    );
};

export default CardGeneral;
import React from "react";
import BranchNameGroup from "./branchNameGroup";
import ContactInfoGroup from "./contactInfoGroup";
import AddressInfoGroup from "./addressInfoGroup";
import SocialNetworkGroup from "./socialNetworkGroup";
import BussinessMajorGroup from "./bussinessMajorGroup";
import WorkingTimeGroup from "./workingTimeGroup";

/**
 * This component is used to get the common information of a company
 * @returns 
 */
const IFCommon = () => {
    return (
        <div className="xl:flex gap-10 p-4">
            <div className="bg-[#fcfbfb]">
                {/* Header Section */}
                <BranchNameGroup />

                {/* Info Section */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <ContactInfoGroup />
                    <AddressInfoGroup />
                    <SocialNetworkGroup />
                    <BussinessMajorGroup />                    
                </div>
            </div>
            <WorkingTimeGroup />
        </div>
    );
};

export default IFCommon;
import React from "react";
import { useState } from "react";
import { useSearchParams } from 'react-router-dom';
import BranchContainer from "./branch_container/branchContainer";
import CommonInfoDisplay from "./common_information_display";
import ManagerContainer from "./manager_container"



const CompanyInfoForm = () => {

    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab');

    const setActiveTab = () => {
        switch (tab) {
            case "info":
                return <CommonInfoDisplay />
            case "branch":
                return <BranchContainer />
            case "manager":
                return <ManagerContainer />
            default:
                return <></>
        }
    }
    return (
        <div>
            <div className="flex pt-6">
                <div className="md:pl-10">
                    {setActiveTab()}
                </div>
            </div>
        </div>
    );
};

export default CompanyInfoForm;

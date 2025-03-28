import React from "react";
import { useState } from "react";
import { useSearchParams } from 'react-router-dom';
import BranchList from "./BranchList";
import CompanyInfo from "./CompanyInfo";
import ManagerList from "./ManagerList"



const Profiles = () => {

    const [searchParams] = useSearchParams();
    const tab = searchParams.get('tab');

    const setActiveTab = () => {
        switch (tab) {
            case "info":
                return <CompanyInfo />
            case "branch":
                return <BranchList />
            case "manager":
                return <ManagerList />
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

export default Profiles;

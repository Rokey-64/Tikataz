import React from "react";
import { useSearchParams } from 'next/navigation';
import BasicSetting from "./BasicSetting";
import NotifySetting from "./NotifySetting";
import PrivacySetting from "./PrivacySetting";


const Setting = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');

    const setActiveTab = () => {
        switch (tab) {
            case "base":
                return <BasicSetting />
            case "notify":
                return <NotifySetting />
            case "privacy":
                return <PrivacySetting />
            default:
                return <></>
        }
    }
    return (
        <div>
            <div className="flex pt-6  w-screen mx-auto">
                <div className="md:pl-10">
                    {setActiveTab()}
                </div>
            </div>
        </div>
    );
};

export default Setting;
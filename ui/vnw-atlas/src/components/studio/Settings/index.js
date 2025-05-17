

import BasicSetting from "./BasicSetting";
import NotifySetting from "./NotifySetting";
import PrivacySetting from "./PrivacySetting";


const Setting = async ({ slug }) => {  // Thêm async vào đây

    const setActiveTab = () => {
        switch (slug) {
            case "base":
                return <BasicSetting />;
            case "notify":
                return <NotifySetting />;
            case "privacy":
                return <PrivacySetting />;
            default:
                return <></>;
        }
    };

    return (
        <div>
            <div className="flex pt-14 md:mt-0 w-screen mx-auto">
                <div className="md:pl-10">
                    {setActiveTab()}
                </div>
            </div>
        </div>
    );
};

export default Setting;

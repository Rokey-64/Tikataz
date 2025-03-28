import { useEffect } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa6";
import { TbDeviceAnalytics } from "react-icons/tb";
import { LiaBuysellads } from "react-icons/lia";
import { FiSettings } from "react-icons/fi";
import { MdOutlinePolicy } from "react-icons/md";
import { MdOutlineFeedback } from "react-icons/md";
import { BsDiagram3Fill } from "react-icons/bs";
import { FaCodeBranch } from "react-icons/fa6";
import { useState } from "react";
import { GiRamProfile } from "react-icons/gi";
import LeftMenuIElement from "../common/LeftMenuIElement";
import LeftMenuItemCollapse from "../common/LeftMenuItemCollapse";
import { MdPrivacyTip } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { useLocation } from 'react-router-dom';

const LeftMenu = ({ setHeaderContent }) => {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState('')

    /**
     * @description Object containing the router options for the left menu
     * @type {Object.<string, [string, string, string]>} routerOptions
     * @property {string} key - The key of the object
     * @property {string[]} value - The value of the object
     * @property {string} group - The group name of the object
     * 
     * @example
     * { "/me/general?tab=info": ["common/info", "Thông tin chung", "common"] }
     */
    const routerOptions = {
        "/me/general?tab=info": ["common/info", "Thông tin chung", "common"],
        "/me/general?tab=branch": ["common/branch", "Chi nhánh", "common"],
        "/me/general?tab=manager": ["common/manager", "Ban lãnh đạo", "common"],
        "/me/general?tab=capacity": ["common/capacity", "Năng lực sản xuất", "common"],
        "/me/studio": ["studio", "Quản lý thẻ", ""],
        "/me/analysis": ["analysis", "Phân tích số liệu", ""],
        "/me/marketing": ["marketing", "Chiến dịch marketing", ""],
        "/me/privacy": ["privacy", "Chính sách & điều khoản", ""],
        "/me/feedback": ["feedback", "Phản hồi", ""],
        "/me/setting?tab=base": ["setting/base", "Thiết lập cơ bản", "setting"],
        "/me/setting?tab=privacy": ["setting/privacy", "Quyền riêng tư", "setting"],
        "/me/setting?tab=notify": ["setting/notify", "Thiết lập thông báo", "setting"],
    };

    const key = location.pathname + (location.search || "")
    const value = routerOptions[key]
    const groupNm = value ? value[2] : ""

    useEffect(() => {
        if (value) {
            setSelectedKey(value[0])
            setHeaderContent(value[1])
        }
    }, [location])

    return (
        <div className="w-64 mt-5 h-screen bg-white z-10 hidden md:block border-r border-gray-100">
            <ul className="space-y-2">
                <li >
                    <LeftMenuItemCollapse title="Hồ sơ công ty" isOpen={groupNm === "common"}
                    content={
                        <ul>
                            <LeftMenuIElement icon={BsFillInfoCircleFill} link="/me/general?tab=info"
                                selectedKey={selectedKey} routerOptions={routerOptions}
                                additionalClasses="pl-12" iconClasses="inline-block text-base text-[#0094f6c2]"
                                contentClasses="text-[13px] font-sans"
                            />
                            <LeftMenuIElement icon={FaCodeBranch} link="/me/general?tab=branch"
                                selectedKey={selectedKey} routerOptions={routerOptions}
                                additionalClasses="pl-12" iconClasses="inline-block text-base text-[#0094f6c2]"
                                contentClasses="text-[13px] font-sans"
                            />
                            <LeftMenuIElement icon={BsDiagram3Fill} link="/me/general?tab=manager"
                                selectedKey={selectedKey} routerOptions={routerOptions}
                                additionalClasses="pl-12" iconClasses="inline-block text-base text-[#0094f6c2]"
                                contentClasses="text-[13px] font-sans"
                            />
                            <LeftMenuIElement icon={GiRamProfile} link="/me/general?tab=capacity"
                                selectedKey={selectedKey} routerOptions={routerOptions}
                                additionalClasses="pl-12" iconClasses="inline-block text-base text-[#616367e7]"
                                contentClasses="text-[13px] font-sans"
                            />
                        </ul>
                    } />

                </li>
                <LeftMenuIElement icon={FaRegAddressCard} link="/me/studio"
                    selectedKey={selectedKey} routerOptions={routerOptions}
                    additionalClasses="pl-4" iconClasses="inline-block text-xl"
                    contentClasses="text-[13px] font-sans pb-[2px]"
                />
                <LeftMenuIElement icon={TbDeviceAnalytics} link="/me/analysis"
                    selectedKey={selectedKey} routerOptions={routerOptions}
                    additionalClasses="pl-4" iconClasses="inline-block text-xl"
                    contentClasses="text-[13px] font-sans pb-[2px]"
                />
                <LeftMenuIElement icon={LiaBuysellads} link="/me/marketing"
                    selectedKey={selectedKey} routerOptions={routerOptions}
                    additionalClasses="pl-4" iconClasses="inline-block text-xl"
                    contentClasses="text-[13px] font-sans pb-[2px]"
                />
                <LeftMenuIElement icon={MdOutlinePolicy} link="/me/privacy"
                    selectedKey={selectedKey} routerOptions={routerOptions}
                    additionalClasses="pl-4" iconClasses="inline-block text-xl"
                    contentClasses="text-[13px] font-sans pb-[2px]"
                />

                <LeftMenuIElement icon={MdOutlineFeedback} link="/me/feedback"
                    selectedKey={selectedKey} routerOptions={routerOptions}
                    additionalClasses="pl-4" iconClasses="inline-block text-xl"
                    contentClasses="text-[13px] font-sans pb-[2px]"
                />

                <li>
                    <LeftMenuItemCollapse title="Thiết lập" isOpen={groupNm === "setting"}
                        content={
                            <ul className="">
                                <LeftMenuIElement icon={FiSettings} link="/me/setting?tab=base"
                                    selectedKey={selectedKey} routerOptions={routerOptions}
                                    additionalClasses="pl-10" iconClasses="inline-block text-xl"
                                    contentClasses="text-[13px] font-sans"
                                />
                                <LeftMenuIElement icon={MdPrivacyTip} link="/me/setting?tab=privacy"
                                    selectedKey={selectedKey} routerOptions={routerOptions}
                                    additionalClasses="pl-10" iconClasses="inline-block text-xl text-blue-400"
                                    contentClasses="text-[13px] font-sans"
                                />

                                <LeftMenuIElement icon={MdNotificationsActive} link="/me/setting?tab=notify"
                                    selectedKey={selectedKey} routerOptions={routerOptions}
                                    additionalClasses="pl-10" iconClasses="inline-block text-xl text-yellow-500"
                                    contentClasses="text-[13px] font-sans"
                                />
                            </ul>
                        } />

                </li>
            </ul>
        </div>
    )
}

export default LeftMenu
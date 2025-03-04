import './leftMenu.css';
import React, { useState} from "react";
import findTagByMajor from "../../../api/tagByMajor";
import defaultTag from "../../../api/tag";

import { FaUserGear, FaRegistered } from "react-icons/fa6";
import { BsBuildingFillAdd } from "react-icons/bs";
import { GiSewingNeedle, GiElectricalResistance, GiBuyCard, GiSandsOfTime, GiChemicalDrop } from "react-icons/gi";
import { SiIobroker, SiPug } from "react-icons/si";
import { RiServiceLine, RiPriceTag3Fill } from "react-icons/ri";
import { FcCustomerSupport } from "react-icons/fc";
import { PiPottedPlantFill, PiEyedropperSample } from "react-icons/pi";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdLocalPharmacy } from "react-icons/md";
import { TbHomeFilled } from "react-icons/tb";
import { SlLike } from "react-icons/sl";


import { useDispatch } from "react-redux"
import { clearAndUpdateTag } from "../../../redux/tags_slice";
import { clearAndUpdateStatus } from "../../../redux/status_slice";
import { addIndex } from "../../../redux/tagIndex_slice";
import TagRender from "../../../services/tag-handler";

const ExpandLeftMenu = () => {
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState(null);

    const menuItems = [
        { major: null, icon: <PiEyedropperSample className="size-6 mr-4" />, label: 'Xây dựng mô hình' },
        { major: null, icon: <GiBuyCard className="size-6 mr-4" />, label: 'Đặt hàng gia công' },
        { major: null, icon: <GiSandsOfTime className="size-6 mr-4" />, label: 'Đơn hàng chờ' },
        { major: null, icon: <RiPriceTag3Fill className="size-6 mr-4" />, label: 'Yêu cầu báo giá' }
    ];

    const atlasItems = [
        { major: null, icon: <TbHomeFilled className="size-6 mr-4" />, label: 'Thẻ của bạn' },
        { major: null, icon: <SlLike className="size-6 mr-4" />, label: 'Đã thích' },
        { major: null, icon: <FaRegistered className="size-6 mr-4" />, label: 'Đã đăng ký' }
    ];

    const industryItems = [
        { major: 'AC05', icon: <FaUserGear className="size-6 mr-4" />, label: 'Kỹ thuật' },
        { major: 'AD05', icon: <BsBuildingFillAdd className="size-6 mr-4" />, label: 'Xây dựng' },
        { major: 'AD01', icon: <GiSewingNeedle className="size-6 mr-4" />, label: 'May mặc' },
        { major: 'AC13', icon: <GiElectricalResistance className="size-6 mr-4" />, label: 'Điện nước' },
        { major: 'CB01', icon: <SiIobroker className="size-6 mr-4" />, label: 'Môi giới' },
        { major: 'AF01', icon: <RiServiceLine className="size-6 mr-4" />, label: 'Dịch vụ' },
        { major: 'AB03', icon: <FcCustomerSupport className="size-6 mr-4" />, label: 'Tư vấn, đào tạo' },
        { major: 'BC01', icon: <PiPottedPlantFill className="text-green-700 size-6 mr-4" />, label: 'Trồng trọt' },
        { major: 'BB02', icon: <SiPug className="size-6 mr-4" />, label: 'Chăn nuôi' },
        { major: 'AD02', icon: <IoFastFoodSharp className="text-orange-600 size-6 mr-4" />, label: 'Thực phẩm' },
        { major: 'AD04', icon: <MdLocalPharmacy className="size-6 mr-4" />, label: 'Dược phẩm' },
        { major: 'AC09', icon: <GiChemicalDrop className="size-6 mr-4" />, label: 'Hóa chất' }
    ];

    /**
     * When a major is clicked, this function will be called to get the tag of that major.
     * @param {*} major 
     * @returns 
     */
    const whenClick = (major) => {
        if (!major)
            return;

        setSelectedItem(major);

        const getTag = async () => {
            const response = await findTagByMajor(null, major);
            if (!response)
                return;

            const { tags: newTags, status: newStatus } = TagRender(response.data.tags);
            if (!newTags || !newStatus)
                return;

            dispatch(clearAndUpdateTag(newTags));
            dispatch(clearAndUpdateStatus(newStatus));
            dispatch(addIndex({ _id: response.data._id, major: major }));
        };

        getTag();
    };

    /**
     * When the major header is clicked, this function will be called to render the items of that major.
     * @param {*} items 
     * @param {*}  whenHeaderItemClick
     * @returns 
     */
    const whenHeaderItemClick = () => {
        const getTag = async () => {
            const response = await defaultTag(null);
            if (!response)
                return;

            const { tags: newTags, status: newStatus } = TagRender(response.data.tags);
            if (!newTags || !newStatus)
                return;

            dispatch(clearAndUpdateTag(newTags));
            dispatch(clearAndUpdateStatus(newStatus));
            dispatch(addIndex({ _id: response.data._id, major: "" }));

            setSelectedItem(null);
        };

        getTag();

    };


    const renderMenuItems =(items, whenClick) => {
        return items.map((item, index) => (
            <li
                key={index}
                onClick={() => whenClick && whenClick(item.major, index)}
                className={`mb-1 ${selectedItem === item.major && item.major ? "bg-blue-200" : "hover:bg-gray-200"} rounded-md`}
            >
                <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                    {item.icon}
                    <a href="#" className="text-sm font-medium">
                        <p>{item.label}</p>
                    </a>
                </div>
            </li>
        ));
    };

    return (
        <div className="w-64 text-black h-screen p-4 bg-[#f2f2f2] overflow-y-auto overscroll-contain custom-scrollbar">
            <div className="ml-4">
                <h4 className="text-xl font-semibold mb-4">WorkPlant</h4>
                <ul>{renderMenuItems(menuItems, null)}</ul>
            </div>
            <hr className="my-6 border-t-2" />
            <div className="ml-4">
                <h4 className="text-xl font-semibold mb-4">Atlas</h4>
                <ul>{renderMenuItems(atlasItems, null)}</ul>
            </div>
            <hr className="my-6 border-t-2" />
            <div className="ml-4">
                <a href="#" className="text-xl font-semibold" onClick={whenHeaderItemClick}>
                    <h4 className="text-xl font-semibold mb-4">Nhóm ngành</h4>
                </a>
                
                <ul>{renderMenuItems(industryItems, whenClick)}</ul>
            </div>
            <div className="my-20"></div>
        </div>
    );
};

export default ExpandLeftMenu;
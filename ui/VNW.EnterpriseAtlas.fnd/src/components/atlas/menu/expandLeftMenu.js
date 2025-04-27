import './leftMenu.css';
import React, { useState } from "react";
import findTagByMajor from "../../../api/tagByMajor";
import defaultTag from "../../../api/tag";

import { FaUserGear, FaRegistered } from "react-icons/fa6";
import { BsBuildingFillAdd } from "react-icons/bs";
import { GiSewingNeedle, GiElectricalResistance, GiBuyCard, GiSandsOfTime, GiChemicalDrop } from "react-icons/gi";
import { SiIobroker, SiPug } from "react-icons/si";
import { RiServiceLine, RiPriceTag3Fill } from "react-icons/ri";
import { FcCustomerSupport } from "react-icons/fc";
import { VscLaw } from "react-icons/vsc";
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

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ExpandLeftMenu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState(null);

    const workPlantItems = [
        { major: null, icon: <PiEyedropperSample className="size-6 mr-4" />, label: t("atlas_menu_build_model") },
        { major: null, icon: <GiBuyCard className="size-6 mr-4" />, label: t("atlas_menu_order_outsourcing") },
        { major: null, icon: <GiSandsOfTime className="size-6 mr-4" />, label: t("atlas_menu_waiting_order") },
        { major: 'rfq', icon: <RiPriceTag3Fill className="size-6 mr-4" />, label: t("atlas_menu_RFQ") }


    ];

    const rofItems = [
        { major: null, icon: <RiPriceTag3Fill className="size-6 mr-4" />, label: t("atlas_menu_RFQ") },
        { major: null, icon: <GiSandsOfTime className="size-6 mr-4" />, label: t("atlas_menu_waiting_order") },
    ];



    const atlasItems = [
        { major: "Own", icon: <TbHomeFilled className="size-6 mr-4" />, label: t("atlas_menu_your_card") },
        { major: null, icon: <SlLike className="size-6 mr-4" />, label: t("atlas_menu_liked") },
        { major: null, icon: <FaRegistered className="size-6 mr-4" />, label: t("atlas_menu_registered") }
    ];

    const industryItems = [
        { major: 'AC05', icon: <FaUserGear className="size-6 mr-4" />, label: t("atlas_menu_major_tech") },
        { major: 'AD05', icon: <BsBuildingFillAdd className="size-6 mr-4" />, label: t("atlas_menu_major_build") },
        { major: 'AD01', icon: <GiSewingNeedle className="size-6 mr-4" />, label: t("atlas_menu_major_textile") },
        { major: 'AC13', icon: <GiElectricalResistance className="size-6 mr-4" />, label: t("atlas_menu_major_E") },
        { major: 'CB01', icon: <SiIobroker className="size-6 mr-4" />, label: t("atlas_menu_major_brokerage") },
        { major: 'AB08', icon: <RiServiceLine className="size-6 mr-4" />, label: t("atlas_menu_major_account") },
        { major: 'AB02', icon: <VscLaw className="size-6 mr-4" />, label: t("atlas_menu_major_law") },
        // { major: 'AB03', icon: <FcCustomerSupport className="size-6 mr-4" />, label: 'Tư vấn, đào tạo' },
        { major: 'BC01', icon: <PiPottedPlantFill className="text-green-700 size-6 mr-4" />, label: t("atlas_menu_major_plant") },
        { major: 'BB02', icon: <SiPug className="size-6 mr-4" />, label: t("atlas_menu_major_livestock") },
        { major: 'AD02', icon: <IoFastFoodSharp className="text-orange-600 size-6 mr-4" />, label: t("atlas_menu_major_food") },
        { major: 'AD04', icon: <MdLocalPharmacy className="size-6 mr-4" />, label: t("atlas_menu_major_pharma") },
        { major: 'AC09', icon: <GiChemicalDrop className="size-6 mr-4" />, label: t("atlas_menu_major_chemistry") }
    ];

    /**
     * When a major is clicked, this function will be called to get the tag of that major.
     * @param {*} major 
     * @returns 
     */
    const findCardOnclick = (major) => {
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
     * This function will be called when the card management is clicked.
     * @returns
     */
    const cardManagementOnclick = (major) => {
        if (!major)
            return;

        if (major === 'Own') {
            // navigate('/me/studio/');
            const url = "/me/studio";
            window.open(url, "_blank");
        }
    }

    /**
     * This function will be called when the workplant is clicked.
     * @returns 
     */
    const workplantOnclick = (major) => {
        if (!major)
            return;

        if (major === 'rfq') {
            const url = "/rfq/dashboard";
            window.open(url, "_blank");
        }
    }

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


    const renderMenuItems = (items, whenClick) => {
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
                <ul>{renderMenuItems(workPlantItems, workplantOnclick)}</ul>
            </div>
            <hr className="my-6 border-t-2" />
            <div className="ml-4">
                <h4 className="text-xl font-semibold mb-4">Atlas</h4>
                <ul>{renderMenuItems(atlasItems, cardManagementOnclick)}</ul>
            </div>
            <hr className="my-6 border-t-2" />
            <div className="ml-4">
                <a href="#" className="text-xl font-semibold" onClick={whenHeaderItemClick}>
                    <h4 className="text-xl font-semibold mb-4">{t("atlas_menu_major")}</h4>
                </a>

                <ul>{renderMenuItems(industryItems, findCardOnclick)}</ul>
            </div>
            <div className="my-20"></div>
        </div>
    );
};

export default ExpandLeftMenu;
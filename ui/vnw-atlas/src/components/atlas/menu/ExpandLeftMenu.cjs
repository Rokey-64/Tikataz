import './leftMenu.css';
import React, { useState } from "react";
import UserAuthentication from '@/components/po-up/UserAuthentication';

import { FaUserGear, FaRegistered } from "react-icons/fa6";
import { BsBuildingFillAdd } from "react-icons/bs";
import { GiSewingNeedle, GiElectricalResistance, GiBuyCard, GiSandsOfTime, GiChemicalDrop } from "react-icons/gi";
import { SiIobroker, SiPug } from "react-icons/si";
import { RiServiceLine, RiPriceTag3Fill } from "react-icons/ri";
import { VscLaw } from "react-icons/vsc";
import { PiPottedPlantFill, PiEyedropperSample } from "react-icons/pi";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdLocalPharmacy } from "react-icons/md";
import { TbHomeFilled } from "react-icons/tb";
import { SlLike } from "react-icons/sl";

import { useDispatch } from "react-redux"
import apiVerifyUser from '@/api/apiVerifyUser';
import getAtlasCardAPI from "@/api/getAtlasCard";
import { setAtlas } from "@/redux/atlasSlice";
import { clearSearch } from "@/redux/searchSlice";


// import { useTranslations } from "next-i18next";
import { useTranslations } from "next-intl";

const ExpandLeftMenu = ({ setLoading }) => {
    const t = useTranslations('trans');
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

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
     * This function will be called when the card management is clicked.
     * @returns
     */
    const cardManagementOnclick = async (major) => {
        if (!major)
            return;

        const result = await apiVerifyUser();
        if (!result) {
            setIsLoginOpen(true);
            return;
        }

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
    const workplantOnclick = async (major) => {
        if (!major)
            return;

        const result = await apiVerifyUser();
        if (!result) {
            setIsLoginOpen(true);
            return;
        }

        if (major === 'rfq') {
            const url = "/rfq/dashboard";
            window.open(url, "_blank");
        }
    }

    /**
     * Turn back to the major menu when the header item is clicked.
     * @param {*} items 
     * @param {*}  whenHeaderItemClick
     * @returns 
     */
    const whenHeaderItemClick = async () => {
        setLoading(true);
        setSelectedItem(null);

        const cards = await getAtlasCardAPI("", "manual");
        if (cards) {
            sessionStorage.setItem("atlas_search_general", JSON.stringify({
                cid: cards[cards.length - 1].cid,
                ctype: cards[cards.length - 1].ctype,
                major: null,
            }));

            dispatch(setAtlas(cards));

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setLoading(false);

        // Clear the search value
        dispatch(clearSearch());
    };

    /**
     * Search the card by major when the card major is clicked.
     * @param {*} major 
     * @returns 
     */
    const findCardOnclick = async (major) => {
        setLoading(true);
        setSelectedItem(major);
        
        const cards = await getAtlasCardAPI("", "auto", major);
        if (cards){
            sessionStorage.setItem("atlas_search_general", JSON.stringify({
                cid: cards[cards.length - 1].cid,
                ctype: cards[cards.length - 1].ctype,
                major: major,
            }));
    
            dispatch(setAtlas(cards));
    
            window.scrollTo({ top: 0, behavior: 'smooth' });

            
        }
        setLoading(false);

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
                    <button className="text-sm font-medium">
                        <span>{item.label}</span>
                    </button>
                </div>
            </li>
        ));
    };

    return (
        <div className="w-64 text-black h-screen p-4 bg-[#f2f2f2] overflow-y-auto overscroll-contain custom-scrollbar">
            <UserAuthentication isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
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
                <button className="text-xl font-semibold" onClick={whenHeaderItemClick}>
                    <h4 className="text-xl font-semibold mb-4">{t("atlas_menu_major")}</h4>
                </button>

                <ul>{renderMenuItems(industryItems, findCardOnclick)}</ul>
            </div>
            <div className="my-20"></div>
        </div>
    );
};

export default ExpandLeftMenu;
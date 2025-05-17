import React, { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { useTranslations } from "next-intl";
import checkOnlineStatus from "@/services/checkOnlineStatus";

import _ from "lodash";
import GeneralViewport from "./GenerralViewport";
import ProfileViewport from "./ProfileViewport";
import HistoryViewport from "./HistoryViewport";
import PolicyViewport from "./PolicyViewport";
import PromotionViewport from "./PromotionViewport";
import RecruitmentViewport from "./RecruitmentViewport";

export default function BusinessProfileCard({ card }) {
    return (
        <div className="md:w-[896px] px-5">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl 
                overflow-hidden border border-gray-100 transition-all hover:shadow-xl sm:hover:shadow-2xl">
                {/* Header with gradient background */}
                <BasicCardHeader card={card} />

                {/* Body with proper spacing */}
                <BasicCardBody card={card} />

                {/* Footer with action buttons */}
                <BasicCardFooter card={card} />
            </div>
        </div>
    );
}

const BasicCardHeader = ({ card }) => {
    const t = useTranslations('trans');
    const [status, setStatus] = useState("online");
    const [verified, setVerified] = useState(false);

    const [imgSrc, setImgSrc] = useState(card.data.general.logo);

    const handleError = () => {
        setImgSrc('/placeholder.jpg');
    };

    useEffect(() => {
        const result = checkOnlineStatus(card.data.general.workingTime);
        setStatus(result ? "online" : "offline");

        const interval = setInterval(() => {
            const updateStatus = checkOnlineStatus(card.data.general.workingTime);
            setStatus(updateStatus ? "online" : "offline");
        }, 60 * 1000 * 5);

        return () => clearInterval(interval);
    }, [card.data.general.workingTime]);

    useEffect(() => {
        const badge = card.badges.find(badge => badge.code === 'CONFIRMED');
        setVerified(!!badge);
    }, [card.badges]);

    return (
        <div className="p-4 sm:p-5 pb-3 sm:pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                {/* Logo + Info */}
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-white shadow-sm">
                        <Image
                            src={imgSrc || '/placeholder.jpg'}
                            alt="Company Logo"
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                            unoptimized
                            onError={handleError}
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                            {capitalizeEachWord(card.data.general.branchName)}
                        </h1>
                        <p className="text-[#5A5A5A] text-xs sm:text-sm mt-1 line-clamp-3 max-w-[600px]">
                            {capitalizeFirstLetterOfSentence(card.data.general.description)}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                {verified ? "Verified" : "Unverified"}
                            </span>
                            <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${status === "online"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"}`}>
                                {status === "online" ? "Online" : "Offline"}
                            </span>
                        </div>


                    </div>
                </div>

                {/* Reaction + Comment */}
                <div className="flex gap-4 sm:gap-6">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                            <span className="text-sm">👍</span>
                            <span className="text-xs font-medium text-gray-700">100k</span>
                        </div>
                        <span className="text-[9px] text-gray-500 mt-1">{t("atlas.reaction")}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                            <span className="text-sm">💬</span>
                            <span className="text-xs font-medium text-gray-700">20</span>
                        </div>
                        <span className="text-[9px] text-gray-500 mt-1">{t("atlas.comment")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BasicCardBody = ({ card }) => {
    const [menuIndex, setMenuIndex] = useState(1);

    return (
        <div className="p-4 sm:p-5 w-full min-h-[500px] rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-4">
                <BasicCardMenu setMenuIndex={setMenuIndex} menuIndex={menuIndex} />
                <div className="md:col-span-4">
                    <GeneralViewport card={card} visible={menuIndex===1}/>
                    <ProfileViewport card={card} visible={menuIndex===2}/>
                    <PolicyViewport card={card} visible={menuIndex===3}/>
                    <HistoryViewport card={card} visible={menuIndex===4}/>
                    <PromotionViewport card={card} visible={menuIndex===5}/>
                    <RecruitmentViewport card={card} visible={menuIndex===6}/>
                </div>
            </div>
        </div>
    );
}


const BasicCardMenu = ({ menuIndex, setMenuIndex }) => {
    const t = useTranslations('trans');
    const menuItems = [
        { id: 1, name: t("atlas.tags.overall") },
        { id: 2, name: t("atlas.tags.profile") },
        { id: 3, name: t("atlas.tags.policy") },
        { id: 4, name: t("atlas.tags.statistics") },
        { id: 5, name: t("atlas.tags.recruitment") },
        { id: 6, name: t("atlas.tags.promotion") },
    ];

    const menuChangeHandler = (index) => {
        setMenuIndex(Number(index));
    }

    return (
        <>
            {/* Sidebar - Hidden on mobile, shown on md+ */}
            <div className="hidden md:block md:col-span-1 space-y-2">
                {menuItems.map((item) => (
                    <div key={item.id}
                        className={`flex items-center space-x-2 p-1.5 rounded-lg cursor-pointer transition-colors duration-200
                        ${menuIndex === item.id
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                                : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                        onClick={() => menuChangeHandler(item.id)}>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span className="text-xs font-medium text-gray-700 hover:text-blue-600">{item.name}</span>
                    </div>
                ))}
                <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2 p-1.5 bg-blue-50 rounded-lg">
                        <span className="text-blue-600">☎️</span>
                        <span className="text-xs font-medium text-blue-600">0*** ******</span>
                    </div>
                </div>
            </div>

            {/* Mobile menu button - shown only on mobile */}
            <div className="md:hidden mb-3">
                <select className="w-full p-2 border border-gray-300 rounded-lg text-xs font-medium" onChange={(e) => menuChangeHandler(e.target.value)}>
                    {menuItems.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

const BasicCardFooter = ({ card }) => {
    return (
        <div className="px-4 sm:px-5 py-2 sm:py-3 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-blue-500 text-xs sm:text-sm">📍</span>
                <span className="text-xs text-gray-700 max-w-[450px] sm:max-w-[34rem] line-clamp-2">{capitalizeEachWord(card.data.general.address)}</span>
            </div>
            <div className="flex space-x-2 w-full sm:w-auto justify-end">
                <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg 
                transition-colors shadow-sm w-full sm:w-auto"
                    onClick={() => { console.log(card) }}>
                    Liên hệ ngay
                </button>
                <button className="px-3 py-1.5 border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-medium rounded-lg transition-colors w-full sm:w-auto">
                    Xem cửa hàng
                </button>
            </div>
        </div>
    );
}

/**
 * Uppercase the first letter of each word in a string
 * @param {*} str 
 * @returns 
 */
function capitalizeEachWord(str) {
    if (typeof str !== 'string') return str;

    return str
        .split(' ')
        .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
}

/**
 * Uppercase the first letter of a string
 * @param {*} str 
 * @returns 
 */
function capitalizeFirstLetterOfSentence(str) {
    if (typeof str !== 'string') return str;

    return str.charAt(0).toUpperCase() + str.slice(1);
}

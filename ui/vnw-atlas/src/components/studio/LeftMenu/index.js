
import { usePathname, useSearchParams } from 'next/navigation';

import Link from 'next/link';
import { useState, Suspense, useEffect} from 'react';
import {
    BsFillInfoCircleFill,
    BsDiagram3Fill,
    BsChevronDown,
    BsChevronUp,
    BsBuilding
} from 'react-icons/bs';
import { FaCodeBranch, FaRegAddressCard } from 'react-icons/fa';
import { GiFactory } from 'react-icons/gi';
import { TbDeviceAnalytics } from 'react-icons/tb';
import { LiaBuysellads } from 'react-icons/lia';
import { MdOutlineFeedback, MdPrivacyTip, MdNotificationsActive, MdSettings } from 'react-icons/md';
import { FiSearch, FiSettings, FiX } from 'react-icons/fi';

const LeftMenu = ({ setHeaderContent }) => {
    const pathname = usePathname();
    const [expandedMenus, setExpandedMenus] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const slugs = pathname.split('/');

    useEffect(() => {
        if (slugs && slugs.length > 2) {
            const currentSlug = slugs[2];
            const menuToExpand = menuTree.find(menu => menu.id === currentSlug);
            if (menuToExpand) {
                setExpandedMenus(prev => ({
                    ...prev,
                    [menuToExpand.id]: true
                }));
            }
        }   

    }, [pathname]);

    const menuTree = [
        {
            name: "Hồ sơ công ty",
            id: "general",
            icon: null,
            link: null,
            items: [
                { name: "Thông tin chung", link: "/me/general/info", icon: <BsFillInfoCircleFill className="text-lg" /> },
                { name: "Chi nhánh", link: "/me/general/branch", icon: <FaCodeBranch className="text-lg" /> },
                { name: "Ban lãnh đạo", link: "/me/general/manager", icon: <BsDiagram3Fill className="text-lg" /> },
                { name: "Năng lực sản xuất", link: "/me/general/capacity", icon: <GiFactory className="text-lg" /> }
            ]
        },
        {
            name: "Quản lý thẻ",
            id: "card-management",
            icon: <FaRegAddressCard className="text-lg" />,
            link: "/me/studio",
            items: []
        },
        {
            name: "Phân tích số liệu",
            id: "data-analysis",
            icon: <TbDeviceAnalytics className="text-lg" />,
            link: "/me/analysis",
            items: []
        },
        {
            name: "Chiến dịch marketing",
            id: "marketing-campaign",
            icon: <LiaBuysellads className="text-lg" />,
            link: "/me/marketing",
            items: []
        },
        {
            name: "Phản hồi",
            id: "feedback",
            icon: <MdOutlineFeedback className="text-lg" />,
            link: "/me/feedback",
            items: []
        },
        {
            name: "Thiết lập",
            id: "setting",
            icon: null,
            link: null,
            items: [
                { name: "Thiết lập cơ bản", link: "/me/setting/base", icon: <FiSettings className="text-lg" /> },
                { name: "Quyền riêng tư", link: "/me/setting/privacy", icon: <MdPrivacyTip className="text-lg" /> },
                { name: "Thiết lập thông báo", link: "/me/setting/notify", icon: <MdNotificationsActive className="text-lg" /> }
            ]
        },
    ];

    const toggleMenu = (menuID) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuID]: !prev[menuID]
        }));
    };

    const isActive = (link) => {
        return pathname === link;
    };

    return (
        <>
            {/* Mobile menu button */}
            <div className="md:hidden fixed bottom-2 left-5 z-20">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-3 rounded-full bg-blue-600 shadow-lg text-white hover:bg-blue-700 transition-colors"
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Menu content */}
            <div className={`fixed md:relative w-64 h-screen bg-white z-10 border-r border-gray-100 overflow-y-auto transition-all duration-300 ease-in-out
                            ${mobileMenuOpen ? 'left-0' : '-left-64 md:left-0'}`}
            >

                <div className="p-4 pt-16 md:pt-6">
                    <div className="  bg-white border-b border-gray-100  py-3">
                        <div className="flex items-center justify-between">
                            <div >
                                <span className="font-semibold text-gray-800">Menu</span>

                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="md:hidden p-1 rounded-full hover:bg-gray-100"
                            >
                                <FiX className="text-gray-500" />
                            </button>
                        </div>
                    </div>
                    {menuTree.map((menu, index) => (
                        <div key={index} className="mb-1">
                            {menu.items && menu.items.length > 0 ? (
                                <div>
                                    <div
                                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                                                    ${expandedMenus[menu.id] ? 'bg-gray-50' : ''}`}
                                        onClick={() => toggleMenu(menu.id)}>
                                        <div className="flex items-center">
                                            <span className={`mr-3 ${isActive(menu.link) ? 'text-blue-600' : 'text-gray-600'}`}>
                                                {menu.icon}
                                            </span>
                                            <span className={`text-sm font-medium ${isActive(menu.link) ? 'text-blue-600' : 'text-gray-700'}`}>
                                                {menu.name}
                                            </span>
                                        </div>
                                        {expandedMenus[menu.id] ? (
                                            <BsChevronUp className="text-gray-500 text-xs" />
                                        ) : (
                                            <BsChevronDown className="text-gray-500 text-xs" />
                                        )}
                                    </div>

                                    {expandedMenus[menu.id] && (
                                        <div className="ml-8 mt-1">
                                            {menu.items.map((item, itemIndex) => (
                                                <Link
                                                    key={itemIndex}
                                                    href={item.link}
                                                    onClick={() => {
                                                        setHeaderContent(item.link);
                                                        setMobileMenuOpen(false);
                                                    }}
                                                >
                                                    <div className={`flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors
                                                            ${isActive(item.link) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                                                    >
                                                        <span className={`mr-3 ${isActive(item.link) ? 'text-blue-600' : 'text-gray-500'}`}>
                                                            {item.icon}
                                                        </span>
                                                        <span className="text-sm">{item.name}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={menu.link}
                                    onClick={() => {
                                        setHeaderContent(menu.link);
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    <div
                                        className={`flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors
                                                    ${isActive(menu.link) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                                    >
                                        <span className={`mr-3 ${isActive(menu.link) ? 'text-blue-600' : 'text-gray-500'}`}>
                                            {menu.icon}
                                        </span>
                                        <span className="text-sm font-medium">{menu.name}</span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default function LeftMenuSuspense({ setHeaderContent }) {
    return (
        <Suspense fallback={<div className="w-screen h-screen flex justify-center items-center"><h1 className="text-2xl font-bold">Loading...</h1></div>}>
            <LeftMenu setHeaderContent={setHeaderContent} />
        </Suspense>
    )
}
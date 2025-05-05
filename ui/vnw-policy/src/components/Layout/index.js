import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import Introductions from '../Introductions';
import FAQSidebar from '../FAQSidebar'; // Giả sử bạn có một component FAQSidebar
import HelpCenter from '../HelpCenter'; // Giả sử bạn có một component HelpCenter
import Terms from '../Terms'; // Giả sử bạn có một component Policy
import Policy from '../Policy'; // Giả sử bạn có một component Policy

const Layout = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('introduction');
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        {
            id: 'introduction',
            subItems: [
                { id: 'about_us' },
                { id: 'mission' },
                { id: 'values' }
            ]
        },
        {
            id: 'help_center',
            subItems: [
                { id: 'getting_started' },
                { id: 'account_management' },
                { id: 'troubleshooting' }
            ]
        },
        {
            id: 'customer_guide',
            subItems: [
                { id: 'shopping_guide' },
                { id: 'payment_methods' },
                { id: 'shipping_policy' }
            ]
        },
        {
            id: 'training',
            subItems: [
                { id: 'seller_training' },
                { id: 'affiliate_program' }
            ]
        },
        {
            id: 'updates',
            subItems: [
                { id: 'new_features' },
                { id: 'system_updates' }
            ]
        },
        {
            id: 'terms',
            subItems: [
                // { id: 'user_agreement' },
                // { id: 'seller_terms' }
            ]
        },
        {
            id: 'privacy',
            subItems: [
                { id: 'data_collection' },
                { id: 'data_usage' },
                { id: 'cookies' }
            ]
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'introduction':
            case 'about_us':
            case 'mission':
            case 'values':
                return <Introductions activeTab={activeTab} />;
            case 'help_center':
                return <HelpCenter />;
            case 'faq':
                return <FAQSidebar />;
            case 'terms':
                return <Terms activeTab={activeTab} />;
            case 'privacy':
            case 'data_collection':
            case 'data_usage':
            case 'cookies':
                return <Policy activeTab={activeTab} />;

            default:
                return <div>{t('content.default')}</div>;
        }
        return t(`content.${activeTab}`, { defaultValue: t('content.default') });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMenuItemClick = (itemId) => {
        setActiveTab(itemId);
        setActiveSubMenu(activeSubMenu === itemId ? null : itemId);
        if (windowWidth <= 768) {
            setTimeout(() => setIsMobileMenuOpen(false), 300);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header - cố định */}
            <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-30">
                <h1 className="text-xl md:text-2xl font-bold">{t('header.title')}</h1>
                <button
                    className="md:hidden p-1"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </header>

            {/* Main Content - flex container */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - cố định nhưng vẫn scrollable nếu nội dung dài */}
                <div
                    className={`fixed md:static inset-y-0 left-0 z-20 w-64 bg-gray-50 border-r transform transition-transform duration-300 
                        ease-in-out h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] overflow-y-auto
                    ${isMobileMenuOpen ? 'translate-x-0 translate-y-16' : '-translate-x-full'} md:translate-x-0`}
                >
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleMenuItemClick(item.id)}
                                        className={`w-full flex justify-between items-center text-left p-2 rounded-md hover:bg-blue-100 ${activeTab === item.id ? 'bg-blue-100 text-blue-600 font-medium' : ''
                                            }`}
                                    >
                                        <span>{t(`menu.${item.id}`)}</span>
                                        {item.subItems && item.subItems.length > 0 && (
                                            <span>
                                                {activeSubMenu === item.id ? <FiChevronDown /> : <FiChevronRight />}
                                            </span>
                                        )}
                                    </button>

                                    {activeSubMenu === item.id && (
                                        <ul className="ml-4 mt-1 space-y-1">
                                            {item.subItems.map((subItem) => (
                                                <li key={subItem.id}>
                                                    <button
                                                        onClick={() => {
                                                            setActiveTab(subItem.id);
                                                            if (windowWidth <= 768) {
                                                                setIsMobileMenuOpen(false);
                                                            }
                                                        }}
                                                        className={`w-full text-left p-2 rounded-md hover:bg-blue-50 text-sm ${activeTab === subItem.id ? 'text-blue-500 font-medium' : 'text-gray-600'}`}
                                                    >
                                                        {t(`menu.sub_items.${subItem.id}`)}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Overlay cho mobile menu */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Content Area - scrollable */}
                <div className="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
                    {/* Hiển thị nút mở menu trên mobile khi menu đóng */}
                    {!isMobileMenuOpen && windowWidth <= 768 && (
                        <button
                            onClick={toggleMobileMenu}
                            className="mb-4 ml-4 mt-4 flex items-center text-blue-600 md:hidden"
                        >
                            <FiMenu className="mr-2" /> {t('menu.open')}
                        </button>
                    )}

                    <div className="prose max-w-none p-4 md:p-8">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Layout;
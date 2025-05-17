import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

const CardLeftMenu = ({ setCompanyInfo, companyInfo }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const t = useTranslations('trans');

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.style.overflow = isMobileMenuOpen ? '' : 'hidden';
    };

    const handleMenuItemClick = (value) => {
        setCompanyInfo(value);
        if (isMobile) {
            setIsMobileMenuOpen(false);
            document.body.style.overflow = '';
        }
    };

    function getMenuLabel(item) {
        switch (item) {
            case 1: return t('studio.card.gen.geninfo');
            case 2: return t('studio.card.gen.certinfo');
            case 3: return t('studio.card.gen.partner');
            case 4: return t('studio.card.gen.expand');
            default: return "";
        }
    }

    return (
        <>
            {/* Desktop Menu (vẫn giữ nguyên) */}
            <div className="hidden md:block border-r border-gray-200 px-2 pt-4 h-screen sticky top-60 md:top-0 left-0 z-40 w-[220px] bg-transparent">
                <ul className="space-y-4 font-sans text-[13px] w-[200px]">
                    {[1, 2, 3, 4].map((item) => (
                        <li
                            key={item}
                            className={`pl-4 cursor-pointer hover:text-blue-500 ${companyInfo === item ? "text-blue-500 font-bold" : ""}`}
                            onClick={() => handleMenuItemClick(item)}
                        >
                            {getMenuLabel(item)}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile Menu Button - Chỉ icon ở góc trái */}
            {isMobile && (
                <button
                    onClick={toggleMobileMenu}
                    className="fixed bottom-4 left-6 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg md:hidden"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            )}

            {/* Mobile Menu Overlay */}
            {isMobile && isMobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={toggleMobileMenu}
                    />

                    <div className="fixed top-24 left-0 h-full z-50 bg-white w-64 shadow-xl transform transition-transform duration-300 ease-in-out">
                        <div className="p-4 pt-6">
                            <button
                                onClick={toggleMobileMenu}
                                className="absolute top-4 right-4 text-gray-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <ul className="space-y-4 font-sans text-[13px] mt-8">
                                {[1, 2, 3, 4].map((item) => (
                                    <li
                                        key={item}
                                        className={`pl-4 cursor-pointer hover:text-blue-500 py-2 ${companyInfo === item ? "text-blue-500 font-bold" : ""}`}
                                        onClick={() => handleMenuItemClick(item)}
                                    >
                                        {getMenuLabel(item)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};



export default CardLeftMenu;
"use client";

import { createPortal } from "react-dom";
import { useState } from "react";
import { useTranslations } from "next-intl";

const UserAuthentication = ({ isOpen, setIsOpen }) => {
    const t = useTranslations("trans");
    const [isHovering, setIsHovering] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleLogin = () => {
        window.open("http://accounts.tikataz.vn/", "_blank");
    };

    if (typeof window === "undefined") return null;

    return createPortal(
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen p-4 text-center">
                        {/* Background overlay */}
                        <div
                            className="fixed inset-0 bg-gradient-to-br from-blue-900 to-blue-700 opacity-90"
                            aria-hidden="true"
                            onClick={handleClose}
                        ></div>

                        {/* Modal content */}
                        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full">
                            {/* Header with logo */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold">Atlas Tikataz</h2>
                                </div>
                                <p className="text-center text-blue-100 text-sm">
                                    {t("atlas.auths.m1")}
                                </p>
                            </div>

                            {/* Main content */}
                            <div className="bg-white px-8 pt-6 pb-8">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {t("atlas.auths.m2")}
                                    </h3>
                                    <p className="mt-2 text-gray-600">
                                        {t("atlas.auths.m3")}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="flex-1 border-t border-gray-300"></div>
                                        <span className="px-4 text-gray-500 text-sm">{t("atlas.auths.platform")}</span>
                                        <div className="flex-1 border-t border-gray-300"></div>
                                    </div>

                                    <ul className="grid grid-cols-1 gap-3 text-sm text-gray-600">
                                        <li className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            {t("atlas.auths.m4")}
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            {t("atlas.auths.m5")}
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            {t("atlas.auths.m6")}
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex flex-col space-y-4">
                                    <button
                                        onClick={handleLogin}
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                        className={`w-full flex items-center justify-center px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 ${isHovering ? 'bg-blue-700 shadow-lg' : 'bg-blue-600 shadow-md'}`}
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                        </svg>
                                        {t("atlas.auths.login")}
                                    </button>
                                    <button
                                        onClick={handleClose}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-300"
                                    >
                                        {t("atlas.auths.guest")}
                                    </button>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 px-8 py-4 text-center">
                                <p className="text-xs text-gray-500">
                                    {
                                        t.rich("atlas.auths.privacy", {
                                            first: (children) => (
                                                <a
                                                    href="https://support.tikataz.com/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {children}
                                                </a>
                                            ),
                                        })
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>,
        document.body
    );
};

export default UserAuthentication;
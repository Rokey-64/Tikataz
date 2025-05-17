import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from "next-intl";

/**
 * This component is used to notify the user that the link they are trying to access has expired.
 * @returns 
 */
const ExpiredDateNotify = () => {
    const t = useTranslations('trans');
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);
    const router = useRouter();

    const handleRegisterClick = () => {
        router.push('/register');
    };

    const handleContactClick = () => {
        setIsContactFormOpen(!isContactFormOpen);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col justify-center">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Main Expired Notification */}
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-8 w-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h2 className="text-2xl font-bold text-yellow-800">{t("expiredQuote.title")}</h2>
                            <p className="mt-2 text-yellow-700">
                                {t("expiredQuote.description")}
                            </p>
                        </div>
                    </div>
                </div>


                {/* Registration CTA */}
                <div className="p-6 bg-blue-50 border-t border-blue-200">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-blue-800">{t("expiredQuote.noAccount.title")}</h3>
                                <p className="mt-1 text-blue-700">
                                    {t("expiredQuote.noAccount.description")}
                                </p>
                            </div>
                            <div className="mt-3 md:mt-0 md:ml-6">
                                <button
                                    onClick={handleRegisterClick}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                                >
                                    {t("expiredQuote.noAccount.button")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Help Section */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{t("expiredQuote.needHelp.title")}</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="p-4 bg-white rounded-lg shadow">
                            <h4 className="font-medium text-gray-800">{t("expiredQuote.needHelp.supportCenter.title")}</h4>
                            <p className="mt-1 text-sm text-gray-600">{t("expiredQuote.needHelp.supportCenter.description")}</p>
                            <a href="/support" className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                                {t("expiredQuote.needHelp.supportCenter.link")}
                                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow">
                            <h4 className="font-medium text-gray-800">{t("expiredQuote.needHelp.phoneContact.title")}</h4>
                            <p className="mt-1 text-sm text-gray-600">{t("expiredQuote.needHelp.phoneContact.description")}</p>
                            <a href="tel:+8423456789" className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                                {t("expiredQuote.needHelp.phoneContact.phoneNumber")}
                                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpiredDateNotify;
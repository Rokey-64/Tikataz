import { useTranslations } from "next-intl";
import { useRFQSupliersContext } from "@/contexts/RFQSuppliersContext";

const AboutMe = () => {
    const t = useTranslations('trans');
    const { state } = useRFQSupliersContext();

    return (
        <div className="md:w-3/5">
            <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">{t("suppliers.aboutme.title")}</h2>
                    <p className="text-gray-600">
                        {
                            t.rich("suppliers.aboutme.description", {
                                supplierCount: () => <span>5.000</span>,
                                customerCount: () => <span>20.000+</span>
                            }
                        )}
                        
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {t("suppliers.aboutme.benefit")}
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm pl-6">
                        <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['•'] before:text-blue-500 before:font-bold">{t("suppliers.aboutme.benefit_list.1")}</li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['•'] before:text-blue-500 before:font-bold">{t("suppliers.aboutme.benefit_list.2")}</li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['•'] before:text-blue-500 before:font-bold">{t("suppliers.aboutme.benefit_list.3")}</li>
                    </ul>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        {t("suppliers.aboutme.your_statistics")}
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm pl-6">
                        <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['•'] before:text-green-500 before:font-bold">
                            {
                                t.rich("suppliers.aboutme.your_statistics_list.1", {
                                    first: () => <span>{state.statistics.sum || 0}</span>
                                })
                            }
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['•'] before:text-green-500 before:font-bold">
                            {
                                t.rich("suppliers.aboutme.your_statistics_list.2", {
                                    first: () => <span>{state.statistics.win || 0}</span>
                                })
                            }
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['•'] before:text-green-500 before:font-bold">
                            {
                                t.rich("suppliers.aboutme.your_statistics_list.3", {
                                    first: () => <span>{state.statistics.rate}</span>
                                })
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;
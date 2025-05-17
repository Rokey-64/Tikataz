import { useState, useEffect } from 'react';
import { useTranslations } from "next-intl";
import { useRFQSupliersContext } from '@/contexts/RFQSuppliersContext';

const AdditionalQuoteInfo = () => {
    const t = useTranslations('trans');
    const { state, dispatch } = useRFQSupliersContext();
    const [additionalInfo, setAdditionalInfo] = useState({
        deliveryTime: '',
        paymentTerms: '',
        warranty: '',
        remark: '',
        evaluate: 0
    });

    const inputOnblur = (e) => {
        dispatch({
            type: 'SET_ADDITIONAL_INFO',
            payload: {...additionalInfo}
        })
    };

    const starOnClick = (star) => {
        setAdditionalInfo({ ...additionalInfo, evaluate: star });

        dispatch({
            type: 'SET_ADDITIONAL_INFO',
            payload: { ...additionalInfo, evaluate: star }
        });
    };

    return (
        <div className="mb-8 p-4 border rounded-lg bg-white">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{t("suppliers.more.additional_info")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("suppliers.more.dilivery_time")}</label>
                    <input
                        type="text"
                        value={additionalInfo.deliveryTime}
                        onChange={(e) => setAdditionalInfo({ ...additionalInfo, deliveryTime: e.target.value })}
                        onBlur={inputOnblur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t("suppliers.more.placeholder.1")}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("suppliers.more.payment_terms")}</label>
                    <input
                        type="text"
                        value={additionalInfo.paymentTerms}
                        onChange={(e) => setAdditionalInfo({ ...additionalInfo, paymentTerms: e.target.value })}
                        onBlur={inputOnblur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t("suppliers.more.placeholder.2")}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("suppliers.more.warranty_terms")}</label>
                <input
                    type="text"
                    value={additionalInfo.warranty}
                    onChange={(e) => setAdditionalInfo({ ...additionalInfo, warranty: e.target.value })}
                    onBlur={inputOnblur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("suppliers.more.placeholder.3")}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("suppliers.more.remark")}</label>
                <textarea
                    value={additionalInfo.remark}
                    onChange={(e) => setAdditionalInfo({ ...additionalInfo, remark: e.target.value })}
                    onBlur={inputOnblur}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("suppliers.more.placeholder.4")}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("suppliers.more.suiltable_suggestion")}
                </label>
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => starOnClick(star)}
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${additionalInfo.evaluate >= star ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {star}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{t("suppliers.more.not_suitable")}</span>
                    <span>{t("suppliers.more.very_suitable")}</span>
                </div>
            </div>
        </div>
    );
}

export default AdditionalQuoteInfo;
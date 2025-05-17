import React, { useContext } from 'react';
import { useTranslations } from "next-intl";
import { useRFQSupliersContext } from '../../../../../contexts/RFQSuppliersContext';

const CustPrivacy = () => {
    const t = useTranslations('trans');
    const { state, dispatch } = useRFQSupliersContext();
    return (
        <div className="mb-8 p-4 border rounded-lg bg-blue-50">
            <h3 className="font-semibold mb-2">{t("suppliers.items.remark_and_privacy")}</h3>
            {/* <p className="text-sm text-gray-600 mb-3">Vui lòng cung cấp email để chúng tôi có thể liên hệ với bạn về báo giá này.</p> */}

            {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email của bạn</label>
                    <input
                        type="email"
                        value={state.userEmail}
                        onChange={(e) => dispatch({ type: 'SET_USER_EMAIL', payload: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your@email.com"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Bạn có thể thay đổi email này trong lần truy cập sau</p>
                </div> */}

            <div className={`mt-4 ${state.isLoggedIn ? 'hidden' : ''}`}>
                <p className="text-sm mb-2">{t("suppliers.items.no_account")}</p>
                <button
                    // onClick={handleRegisterClick}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    {t("suppliers.items.no_account_description")}
                </button>
            </div>
        </div>
    );
}

export default CustPrivacy;
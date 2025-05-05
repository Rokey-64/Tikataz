import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRFQSupliersContext } from '@/contexts/RFQSuppliersContext';
import CustomerIntro from './CustomerIntro';
import CustomerItem from './CustomerItem';
import AdditionalQuoteInfo from './AdditionalQuoteInfo';
import CustPrivacy from './CustPrivacy';
import ConfirmSubmitDialog from './ConfirmSubmitDialog';


const SupplierPricingForm = ({ quoteData, isLoggedIn }) => {
    const { t } = useTranslation();
    const { state, dispatch } = useRFQSupliersContext();
    const [open, setOpen] = useState(false);

    const quoteSubmitOnclick = () => {
        // Check before submitting
        const isPriceEmpty = state.prices.filter(item => item.state === 'skipped');
        if (isPriceEmpty.length === state.prices.length || state.prices.length === 0) {
            alert(t("suppliers.items.no_items"));
            return;
        }

        // check if the price was filled in
        const isPriceFilled = state.prices.some(item => item.price && item.state !== 'skipped');
        if (!isPriceFilled) {
            alert(t("suppliers.items.price_required"));
            return;
        }

        // Open confirmation dialog
        setOpen(true);
    }

    return (
        <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <ConfirmSubmitDialog open={open} setOpen={setOpen} />
            <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
                {/* Header with quote info */}
                <CustomerIntro quoteData={state.quoteData} />

                {/* Items list */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">{t("suppliers.items.title")}</h2>

                    {state.quoteData.items.map(item => (
                        <CustomerItem key={item.id} item={item} />
                    ))}
                </div>

                <AdditionalQuoteInfo />
                <CustPrivacy />

                {/* Submit button */}
                <div className="flex justify-end">
                    <button
                        onClick={quoteSubmitOnclick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition"
                    >
                        {t("suppliers.items.submit")}
                    </button>
                </div>
            </div>
        </div>

    );
}

export default SupplierPricingForm;
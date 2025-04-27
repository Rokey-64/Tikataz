import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useRouter} from "next/navigation";
import { useRFQSupliersContext } from '@/contexts/RFQSuppliersContext';
import saveSupplierPricingAPI from '@/api/saveSupplierPricing';

const ConfirmSubmitDialog = ({ open, setOpen, onConfirm }) => {
    const { t } = useTranslation();
    const dialogRef = useRef(null);
    const { state } = useRFQSupliersContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    /**
     * Close dialog when clicking outside or pressing Escape
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, setOpen]);

    if (!open) return null;

    const confirmSubmitOnclick = async () => {
        /* prepare data for submission
        * JSON TEXT TEMPLATE
        * {
        * 	'expansion':{
        * 		'deliveryRemark':'',
        * 		'paymentTerm':'',
        * 		'warrantyTerm':'',
        * 		'additionalRemark':'',
        *  	'evaluate':''
        *   },
        *	'items':[
        *		{
        *			'orderItemID':0,
        *			'price':0.00,
        *			'currencyID':1,
        *			'state':'',
        *		}
        *	 ]
        * }
        * */
        const payload = {
            expansion:{
                deliveryRemark: state.additionalInfo.deliveryTime,
                paymentTerm: state.additionalInfo.paymentTerms,
                warrantyTerm: state.additionalInfo.warranty,
                additionalRemark: state.additionalInfo.remark,
                evaluate: state.additionalInfo.evaluate
            },
            items: state.prices.map(item => ({
                orderItemID: item.id,
                price: item.price,
                currencyID: item.currencyID,
                state: item.state,
            }))
        };

        const res = await saveSupplierPricingAPI({
            token: token,
            payload: payload
        })
        if (res) {
            router.push('/');
        } else {
            alert(t("note_save_failed"));
        }
    }

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <div
                ref={dialogRef}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-95 animate-fade-in-up"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
            >
                <div className="flex items-center mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600 dark:text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h2 id="dialog-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                        {t("suppliers.items.submit_confirm")}
                    </h2>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {t("suppliers.items.submit_confirm_note1")}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {t("suppliers.items.submit_confirm_note2")}
                    </p>
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => setOpen(false)}
                        aria-label="Cancel submission"
                    >
                        {t("cancel")}
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={confirmSubmitOnclick}
                        aria-label="Confirm submission"
                    >
                        {t("confirm")}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmSubmitDialog;
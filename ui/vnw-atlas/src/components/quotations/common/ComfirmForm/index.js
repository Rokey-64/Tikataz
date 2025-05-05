import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import ComfirmTitle from "./ComfirmTitle";
import ConfirmMessage from "./ConfirmMessage";
import UserInputSuggestion from "./UserInputSuggestion";
import OrderCancelButton from "./OrderCancelButton";
import OrderConfirmButton from "./OrderConfirmButton";
import DisplayCorpInfo from "./DisplayCorpInfo";
import saveQuoteAPI from '../../../../api/saveQuote';
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/navigation';
import createBlobFromUrl from "../../../../services/createBlobFromUrl";
import { useAppContext } from '../../../../contexts/RFQItemOrder';
import _ from "lodash";


/**
 * A dialog to confirm before creating an order
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback khi nhấn xác nhận
 * @param {Function} props.onClose - Callback khi nhấn hủy
 * @returns {JSX.Element}
 */
const ConfirmDialog = ({ open, onClose }) => {
    const { t } = useTranslation();
    const { state, dispatch } = useAppContext();
    // const navigate = useNavigate();
    const router = useRouter();
    const [suggestion, setSuggestion] = useState('');

    if (!open) return null;

    const onSubmit = async () => {
        // Create a new FormData object
        const formData = new FormData();

        // push the fileAttachment to the formData
        if (state.fileAttachment) {
            formData.append("file", state.fileAttachment);
        }

        // push the item images to the formData
        for (let i = 0; i < state.pricing.length; i++) {
            const blob = await createBlobFromUrl(state.pricing[i].itemImage);
            if (blob) {
                formData.append("item", blob, `${i}`);
            }
        }

        // Clone and push the order to the formData
        const cloneState = _.cloneDeep(state);
        delete cloneState.fileAttachment;
        formData.append("order", JSON.stringify(cloneState));

        // push the user opinion to the formData
        formData.append("opinion", suggestion.trim());


        // Call the API to save the order
        saveQuoteAPI(formData).then((response) => {
            if (response) {
                // navigate("/rfq/dashboard");
                router.push("/rfq/dashboard");
                onClose();
            } else {
                alert(t("order_create_error"));
            }
        }).catch((error) => {
            alert(t("order_create_error"));
        })
    }

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-black/50">
            <div className="bg-white rounded-lg shadow-lg w-[400px] p-5">
                <ComfirmTitle />

                <div className="mt-4 space-y-4">
                    <DisplayCorpInfo />
                    <ConfirmMessage />
                    <UserInputSuggestion val={suggestion} event={setSuggestion} />

                    <div className="flex justify-end gap-2 mt-4">
                        <OrderCancelButton onCancel={onClose} />
                        <OrderConfirmButton onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmDialog;

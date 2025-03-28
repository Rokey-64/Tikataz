import { createPortal } from "react-dom";
import ComfirmTitle from "./ComfirmTitle";
import ConfirmMessage from "./ConfirmMessage";
import UserInputSuggestion from "./UserInputSuggestion";
import OrderCancelButton from "./OrderCancelButton";
import OrderConfirmButton from "./OrderConfirmButton";
import DisplayCorpInfo from "./DisplayCorpInfo";


/**
 * A dialog to confirm before creating an order
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback khi nhấn xác nhận
 * @param {Function} props.onClose - Callback khi nhấn hủy
 * @returns {JSX.Element}
 */
const ConfirmDialog = ({ onSubmit, onClose }) => {


    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-[400px] p-5">
                <ComfirmTitle />


                <div className="mt-4 space-y-4">
                    <DisplayCorpInfo />
                    <ConfirmMessage />
                    <UserInputSuggestion />



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

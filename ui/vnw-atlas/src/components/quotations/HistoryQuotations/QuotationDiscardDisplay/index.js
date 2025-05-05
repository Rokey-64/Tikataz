import { createPortal } from "react-dom";
import ConfirmButton from '../../common/SubmitButton';
import CloseButton from '../../common/CloseButton';
import { useTranslation } from "react-i18next";
import { FaDeleteLeft } from "react-icons/fa6";

const QuotationDiscardDisplay = ({ open, onClose, onConfirm, orderName }) => {
    const { t } = useTranslation();

    if (!open) return null;

    const confirmButtonClicked = async () => {
        onConfirm();
    }

    const Header = () => {
        return (
            <div className="mb-2">
                <div className="flex items-center gap-2 text-red-500 ">
                    <FaDeleteLeft className="text-2xl"/>
                    <h2 className="text-base font-semibold ">{t("cancel_quotation")}</h2>
                </div>
                <div>
                    <p className="text-[12px] text-gray-500 italic">
                        {t("cancel_quotation_message")}
                    </p><br />
                    <p className="text-2xl text-gray-500 font-semibold text-center">({orderName})</p>
                </div>
            </div>
        );
    }

    return createPortal(
        (
            <div className="fixed inset-1 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-5 w-96 shadow-lg space-y-10">
                    <Header />
                    <div className="flex justify-end">
                        <CloseButton event={onClose} />
                        <ConfirmButton event={confirmButtonClicked} title={t("confirm")} />
                    </div>
                </div>
            </div>
        ),
        document.body
    )
}

export default QuotationDiscardDisplay;
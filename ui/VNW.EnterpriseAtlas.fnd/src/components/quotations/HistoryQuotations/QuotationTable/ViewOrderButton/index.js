
import { AiFillEye } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
/**
 * Display the view button
 * @param {*} param0 
 * @returns 
 */
const ViewOrderButton = ({ id, state, dispatch}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onClick = () => {
        if (id) {
            navigate(`/rfq/dashboard/history/views?id=${id}`);
        }
    }
    return (
        <button
            onClick={onClick}
            className={`
          flex items-center justify-center
          p-1.5 rounded-md 
          text-gray-600 hover:text-white hover:bg-blue-500
          ${state.hoveredRow === id ? 'opacity-100' : 'opacity-0'}
        `}
            aria-label={t("view_details")}

            data-tooltip-id="history_quotation-tooltip"
            data-tooltip-content={t("view_details")}
        >
            <AiFillEye size={18} />
        </button>
    );
};

export default ViewOrderButton;
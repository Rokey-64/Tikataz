import { FaTrashRestoreAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";

/**
 * Display the restore button
 * @param {*} param0 
 * @returns 
 */
const RestoreOrderButton = ({ row , stateRef, state, dispatch}) => {
    const t = useTranslations('trans');
    
    if (row.state !== stateRef.rejected) {
        return null;
    }

    const buttonOnClick = async () => {
        dispatch({ type: 'SET_ORDER_RESTORE', payload: row });
    }

    return (
        <button
            onClick={buttonOnClick}
            className={`
          flex items-center justify-center
          p-1.5 rounded-md 
          text-white bg-blue-500 hover:bg-blue-600
          ${state.hoveredRow === row.id ? 'opacity-100' : 'opacity-0'}
        `}
            aria-label={t("restore_quotation")}

            data-tooltip-id="history_quotation-tooltip"
            data-tooltip-content={t("restore_quotation")}
        >
            <FaTrashRestoreAlt size={16} />
        </button>
    );
};


export default RestoreOrderButton;
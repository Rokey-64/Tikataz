import React from 'react';
import { AiOutlineStop } from "react-icons/ai";
import { useTranslations } from "next-intl";
/**
 * Display the discard button
 * @param {*} param0 
 * @returns 
 */
const DiscardOrderButton = ({ row, stateRef, state, dispatch}) => {
    const t = useTranslations('trans');

    if (row.state !== stateRef.processing && row.state !== stateRef.pending) {
        return null;
    }
    return (
        <button
            onClick={() => { dispatch({ type: 'SET_ORDER_STOP', payload: row }) }}
            className={`
          flex items-center justify-center
          p-1.5 rounded-md 
          text-white bg-red-500 hover:bg-red-600
          ${state.hoveredRow === row.id ? 'opacity-100' : 'opacity-0'}
        `}
            aria-label={t("stop_quotation")}

            data-tooltip-id="history_quotation-tooltip"
            data-tooltip-content={t("stop_quotation")}
        >
            <AiOutlineStop size={16} />
        </button>
    );
};

export default DiscardOrderButton;
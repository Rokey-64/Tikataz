
import { AiFillEye } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { useRouter } from 'next/navigation';

/**
 * Display the view button
 * @param {*} param0 
 * @returns 
 */
const ViewOrderButton = ({ id, state, dispatch}) => {
    const t = useTranslations('trans');
    const router = useRouter();

    const onClick = () => {
        if (id) {
            router.push(`/rfq/dashboard/history/views?id=${id}`);
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
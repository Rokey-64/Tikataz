import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter  } from 'next/navigation';


const CancelOrderButton = () => {
    const { t } = useTranslation();
    // const navigate = useNavigate();
    const router = useRouter();
    const [isDirty, setIsDirty] = useState(false);

    const onClick = () => {
        const shouldCancel = window.confirm(t("block_navigation_message"));
        if (shouldCancel) {
            router.push("/rfq/dashboard");
        }
    };

    return (
        <button
            className="w-fit px-5 py-1 rounded-lg border border-gray-400 text-black bg-white text-[14px] font-sans
        hover:bg-gray-100 active:scale-95 duration-300"
            onClick={onClick}
        >
            {t("cancel")}
        </button>

    );
};

export default CancelOrderButton;

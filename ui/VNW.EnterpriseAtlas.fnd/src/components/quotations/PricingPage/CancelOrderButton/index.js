import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const CancelOrderButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            // event.returnValue = "Bạn có chắc chắn muốn rời đi? Dữ liệu chưa được lưu.";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const onClick = () => {
        const shouldCancel = window.confirm(t("block_navigation_message"));
        if (shouldCancel) {
            navigate("/rfq/dashboard");
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

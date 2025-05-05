import { useTranslation, Trans } from "react-i18next";

const ConfirmMessage = () => {
    const { t } = useTranslation();
    return (
        <div>
            <p className="text-gray-700 text-[12px]">
                <Trans i18nKey="confirm_agreement"
                    components={{
                        1: <span className="text-blue-500 underline cursor-pointer" />
                    }}
                />
            </p>
            <p className="text-gray-700 text-[12px] mt-4 font-medium">
                {t("note")}:
            </p>
            <p className="text-gray-700 text-[12px]">
                ⚠ {t("confirm_message_02")}
            </p>
        </div>
    );
};

export default ConfirmMessage;
import { useTranslations } from "next-intl";

const ConfirmMessage = () => {
    const t = useTranslations('trans');
    return (
        <div>
            <p className="text-gray-700 text-[12px]">
                {/* <Trans i18nKey="confirm_agreement"
                    components={{
                        1: <span className="text-blue-500 underline cursor-pointer" />
                    }}
                /> */}

                {
                    t.rich("confirm_agreement", {
                        1: <span className="text-blue-500 underline cursor-pointer" />
                    })
                }
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
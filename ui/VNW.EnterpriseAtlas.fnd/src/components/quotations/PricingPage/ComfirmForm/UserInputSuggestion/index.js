import { useTranslation } from "react-i18next";

/**
 * Enter your opinion
 * @returns 
 */
const UserInputSuggestion = () => {
    const { t } = useTranslation();

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{t("order_opinion")}</label>
            <textarea
                rows="3"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 text-sm font-sans resize-none"
                placeholder={t("Enter_your_opinion")}
                spellCheck="false"
                
            ></textarea>
        </div>
    );
};

export default UserInputSuggestion;
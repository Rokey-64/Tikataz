import { useTranslations } from "next-intl";

/**
 * Enter your opinion
 * @returns 
 */
const UserInputSuggestion = ({val, event}) => {
    const t = useTranslations('trans');

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{t("order_opinion")}</label>
            <textarea
                rows="3"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 text-sm font-sans resize-none"
                placeholder={t("Enter_your_opinion")}
                spellCheck="false"
                onChange={(e) => event(e.target.value)}
                value={val}
                maxLength={500}
            ></textarea>
        </div>
    );
};

export default UserInputSuggestion;
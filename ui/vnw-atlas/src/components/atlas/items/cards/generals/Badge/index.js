import { useState, useEffect} from 'react';
import { LuAward, LuCalendar, LuClock } from 'react-icons/lu';
import { useTranslation } from "react-i18next";

const Badge = ({ badge}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { t } = useTranslation();

    if (!badge) return null;
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    const BadgeDetails = () => {
        if (!isHovered) return null;
        return (
            <div className="absolute z-20 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 left-0">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <LuAward className="text-blue-500 text-lg" />
                        <h3 className="text-sm font-semibold text-gray-800">{badge.name}</h3>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                        <LuCalendar className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">{t("atlas.valid_date")}</p>
                            <p className="text-sm font-medium text-gray-700">
                                {formatDate(badge.validDate) || <span className="text-gray-400">{t("atlas.no_remark")}</span>}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <LuClock className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">{t("atlas.expired_date")}</p>
                            <p className="text-sm font-medium text-gray-700">
                                {formatDate(badge.expiredDate) || <span className="text-gray-400">{t("atlas.no_remark")}</span>}
                            </p>
                        </div>
                    </div>
                </div>

                {badge.description && (
                    <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                        <p className="text-xs text-gray-600">{badge.description}</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="relative">
            <div
                className="w-10 h-10 p-1 mt-1 bg-[#f5f5f5] rounded-md flex justify-center items-center cursor-pointer transition-all duration-200 hover:bg-gray-200"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={`badges/${badge.code.toLowerCase()}.svg`}
                    alt="certification"
                    className="w-full h-full object-contain"
                />
            </div>

            <BadgeDetails />
        </div>
    );
}

export default Badge;
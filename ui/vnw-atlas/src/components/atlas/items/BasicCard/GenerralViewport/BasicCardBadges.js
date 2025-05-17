import React from "react";
import Image from 'next/image';
import { useTranslations } from "next-intl";

const BasicCardBadges = ({ card }) => {
    const t = useTranslations('trans');

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                    <span className="text-yellow-500 mr-2">🏆</span>
                    {t("atlas.bagdes_group")}
                </h2>
                {/* <span className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">
                    {t("atlas.view_next")} →
                </span> */}
            </div>

            <div className="flex space-x-4 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap sm:gap-4">
                {card.badges.map((badge, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center min-w-[70px] sm:min-w-[80px] group relative"
                    >
                        <div className="relative z-0 p-1.5 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white rounded-full p-2 border border-yellow-100">
                                <Image
                                    src={`badges/${badge.code?.toLowerCase()}.svg`}
                                    alt={badge.name}
                                    width={40}
                                    height={40}
                                    className="object-contain group-hover:scale-110 transition-transform duration-200"
                                    unoptimized
                                />
                            </div>
                            {badge.rare && (
                                <div className="absolute -top-1 -right-1">
                                    <span className="text-xs bg-red-500 text-white px-1 rounded-full">★</span>
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-medium text-gray-700 mt-2 text-center group-hover:text-blue-600 transition-colors">
                            {badge.name}
                        </span>
                        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-yellow-100 to-amber-100 opacity-0 group-hover:opacity-100 rounded-xl blur-sm group-hover:blur-xs transition-all duration-300"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BasicCardBadges;
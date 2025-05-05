import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FilterSelectButton from "../../../common/FilterSelectButton";

/**
 * DisplayItemList component
 * @param {Object[]} items - Danh sách các mặt hàng
 * @param {Function} onSelect - Hàm xử lý khi chọn mặt hàng
 */
const DisplayItemList = ({ items,  onSelect }) => {
    const { t } = useTranslation();


    return (
        <div className="">
            <div className="max-h-60 min-h-60 overflow-y-auto space-y-2 pb-20">
                {
                    items.length === 0 && (
                        <div className="text-center text-gray-500 text-sm font-sans p-2 bg-gray-100 rounded-lg shadow-md">
                            {t("no_item_in_list")}
                        </div>
                    )
                }
                {items.map((item, index) => (
                    <div key={index} className={`my-1 p-1 border rounded-lg shadow-md `}>
                        <div className="flex items-center justify-start hover:bg-gray-100">
                            <FilterSelectButton onChange={()=>onSelect(index)}/>
                            <div>
                                {/* Tên sản phẩm */}
                                <div className="font-sans text-xs text-gray-900">
                                    <strong className="text-xs text-indigo-700">{t("item_name")}:</strong> <span className="text-indigo-600">{item.item_name}</span>
                                </div>

                                {/* Quy cách */}
                                <div className="font-sans text-xs text-gray-700">
                                    <strong className="text-xs text-yellow-600">{t("item_specification")}:</strong> <span className="text-gray-800">{item.spec || "(Chưa có thông tin)"}</span>
                                </div>

                                {/* Đơn vị */}
                                <div className="font-sans text-xs text-gray-700">
                                    <strong className="text-xs text-teal-600">{t("item_unit")}:</strong> <span className="text-teal-500">{item.unit}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default DisplayItemList;

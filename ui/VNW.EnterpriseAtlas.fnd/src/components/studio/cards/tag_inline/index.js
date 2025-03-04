import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { PiTrendUpThin } from "react-icons/pi";


const TagInline = ({setShowAddTag}) => {
    const [isHover, setIsHover] = useState(false);

    const handleHover = () => {
        setIsHover(true);
    };

    const handleLeave = () => {
        setIsHover(false);
    };

    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                <td scope="row" className="text-[12px] px-2 py-1 min-w-[80px] font-medium text-gray-900 whitespace-nowrap
                                                 dark:text-white sticky left-0 z-0 bg-white">
                    ✔ ✅
                </td>
                <td className="text-[12px] font-semibold px-2 py-1 min-w-[500px]">
                    <div className="flex items-start">
                        <div className="rounded-md bg-white shadow m-3 ">
                            <img
                                src="https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg"
                                alt="Avatar"
                                className="p-1 min-w-[80px] max-w-[80px] min-h-[60px] max-h-[60px] object-cover rounded-md"
                            />
                        </div>
                        <div>
                            <h1 className="text-[14px] font-semibold text-gray-900 dark:text-white">Nội thất Hòa Phát</h1>
                            <div>
                                {
                                    isHover === false ?
                                        <p className="text-[12px] text-gray-500 dark:text-gray-400 ">
                                            Chúng tôi chuyên sản xuất nội thất, phục vụ các vùng miền trên cả nước. Nhận gia công các mặc hàng nội thất và nhận thiết kế sản phẩm.
                                        </p>
                                        :
                                        <div className="flex items-center gap-2 pt-3">

                                            <button className="hover:bg-white bg-gray-50 rounded-md p-1 hover:shadow-lg hover:scale-105 transition-transform"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Edit"

                                                onClick={() => setShowAddTag(true)}
                                            >
                                                <FiEdit className="text-[20px] stroke-2 text-gray-600" />
                                            </button>
                                            <button className="hover:bg-white bg-gray-50 rounded-md p-1 hover:shadow-lg hover:scale-105 transition-transform"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="View"
                                            >
                                                <FaEye className="text-[20px] text-gray-600" />
                                            </button>
                                            <button className="hover:bg-white bg-gray-50 rounded-md p-1 hover:shadow-lg hover:scale-105 transition-transform"
                                                data-tooltip-id="edit-tooltip"
                                                data-tooltip-content="Trend"
                                            >
                                                <PiTrendUpThin className="text-[20px] text-gray-600" />
                                            </button>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </td>
                <td className="text-[12px] font-semibold px-2 py-1">
                    Công khai
                </td>
                <td className="text-[12px] font-semibold px-2 py-1">11-12-2024</td>
                <td className="text-[12px] font-semibold px-2 py-1">31-12-2027</td>
                <td className="text-[12px] font-semibold px-2 py-1">100👍 - 3.5✨ - 35✍</td>
                <td className="text-[12px] font-semibold px-2 py-1">1000 / 200 (10%)</td>
            </tr>
        </>
    );
};

export default TagInline;
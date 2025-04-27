import { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { useTranslation } from "react-i18next";

/**
 * This component is used to display the information of a manager in a viewport.
 * @param {*} param0 
 * @returns 
 */
const ManagerShortDisplay = ({ profile, deleteOnclick, editOnclick, displayOnClick}) => {
    const { t } = useTranslation();
    const [isHover, setIsHover] = useState(false);

    const TrimText = (text, length) => {
        return text && text.length > length ? `${text.slice(0, length)}...` : text;
    };

    return (
        <div
            className="flex flex-col items-center my-5 ml-5 w-48 h-72 bg-white border border-gray-200 shadow-lg rounded-lg px-1 py-2 
            transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {/* Ảnh logo */}
            <div className="relative w-32 h-32 mb-4">
                <img
                    src={profile.logo || "/placeholder.jpg"}
                    alt="Company Logo"
                    className="object-cover w-full h-full rounded-full border-2 border-gray-300"
                />
                {isHover && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                        <button className="text-white text-lg mx-2 hover:transform hover:scale-110" onClick={editOnclick}>
                            <TiEdit />
                        </button>
                        <button className="text-red-500 text-lg mx-2 hover:transform hover:scale-110"  onClick={deleteOnclick}>
                            <MdDeleteForever />
                        </button>
                    </div>
                )}
            </div>

            {/* Thông tin */}
            <div className="text-center">
                <h2 className="text-sm font-semibold text-gray-800 mb-1">
                    {TrimText(profile.name, 23) || "Tên thành viên"}
                </h2>
                <p className="text-[12px] font-sans text-gray-600">
                    {TrimText(profile.position, 50) || "Chức vụ"}
                </p>
            </div>

            {/* Button hoặc các hành động thêm */}
            <div className="mt-4 ">
                <button onClick={displayOnClick}
                className="px-2 py-1 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition">
                    {t("view_detail")}
                </button>
            </div>
        </div>
    );
};

export default ManagerShortDisplay;

import { useState } from "react";

/**
 * This component is used to insert address
 * @returns 
 */
const InsertAddress = ({addresses, callback, isRequired}) => {
    const [currentAddress, setCurrentAddress] = useState("");

    const handleAddAddress = () => {
        const nAddress = currentAddress.trim();
        if (nAddress && !addresses.includes(nAddress)) {
            callback&&callback([...addresses, currentAddress]);
        }
    };

    const handleDeleteAddress = (index) => {
        const newAddresses = addresses.filter((_, i) => i !== index);
        callback&&callback(newAddresses);
    };

    return (
        <div className="pb-4 min-h-[300px] ">
            <div className="flex items-center mb-1 font-semibold text-[14px]">
                <h3 className="font-semibold">Thêm địa chỉ</h3>
                {isRequired && addresses.length === 0 && <span className="text-red-500 text-[12px] ml-5 font-sans">(Trường này không được để trống)</span>}
            </div>

            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    placeholder="Nhập địa chỉ của bạn và nhấn thêm"
                    className="border border-gray-300 rounded px-2 py-1 w-full text-[#747474]"
                />
                <button
                    onClick={handleAddAddress}
                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Thêm
                </button>
            </div>

            <ul className="list-disc pl-5">
                {addresses.map((address, index) => (
                    <li
                        key={index}
                        className="mb-2 text-[#858585] text-[14px] flex items-center gap-2 group relative"
                    >
                        <span
                            className="flex-1 px-2 py-1 rounded group-hover:bg-blue-50 group-hover:text-blue-600 transition"
                        >
                            <strong>Địa chỉ {index + 1}: </strong>
                            {address}
                        </span>
                        <button
                            onClick={() => handleDeleteAddress(index)}
                            className="absolute right-0 px-2 py-1 text-red-500 bg-white rounded opacity-0 group-hover:opacity-100 group-hover:bg-red-100 transition"
                        >
                            Xóa
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InsertAddress;

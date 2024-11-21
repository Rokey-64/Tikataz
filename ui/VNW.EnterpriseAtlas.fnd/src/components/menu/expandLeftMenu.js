import React from "react";
import './leftMenu.css';
import { FaUserGear } from "react-icons/fa6";
import { BsBuildingFillAdd } from "react-icons/bs";
import { GiSewingNeedle } from "react-icons/gi";
import { GiElectricalResistance } from "react-icons/gi";
import { SiIobroker } from "react-icons/si";
import { RiServiceLine } from "react-icons/ri";
import { FcCustomerSupport } from "react-icons/fc";
import { PiPottedPlantFill } from "react-icons/pi";
import { SiPug } from "react-icons/si";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdLocalPharmacy } from "react-icons/md";
import { GiChemicalDrop } from "react-icons/gi";

import { PiEyedropperSample } from "react-icons/pi";
import { GiBuyCard } from "react-icons/gi";
import { GiSandsOfTime } from "react-icons/gi";
import { RiPriceTag3Fill } from "react-icons/ri";

import { TbHomeFilled } from "react-icons/tb";
import { SlLike } from "react-icons/sl";
import { FaRegistered } from "react-icons/fa6";

const ExpandLeftMenu = () => {
    return (
        <div className="w-64 text-black h-screen p-4 bg-[#f2f2f2] overflow-y-auto overscroll-contain custom-scrollbar">
            <div className="ml-4">
                <h4 className="text-xl font-semibold mb-4">WorkPlant</h4>
                <ul>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <PiEyedropperSample className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Xây dựng mô hình</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <GiBuyCard className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Đặt hàng gia công </p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <GiSandsOfTime className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Đơn hàng chờ</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <RiPriceTag3Fill className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Yêu cầu báo giá</p>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>

            <hr className="my-6 border-t-2" />

            <div className="ml-4">
                <h4 className="text-xl font-semibold mb-4">Atlas</h4>
                <ul>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <TbHomeFilled className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Thẻ của bạn</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <SlLike className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Đã thích</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <FaRegistered className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Đã đăng ký</p>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>

            <hr className="my-6 border-t-2" />

            <div className="ml-4">
                <h4 className="text-xl font-semibold mb-4">Nhóm ngành</h4>
                <ul>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <FaUserGear className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Kỹ thuật</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <BsBuildingFillAdd className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Xây dựng</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <GiSewingNeedle className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>May mặc</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <GiElectricalResistance className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Điện nước</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <SiIobroker className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Môi giới</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <RiServiceLine className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Dịch vụ</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <FcCustomerSupport className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Tư vấn</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <PiPottedPlantFill className="size-6 mr-4 text-green-700" />
                            <a href="#" className="text-sm font-medium">
                                <p>Trồng trọt</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <SiPug className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Chăn nuôi</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <IoFastFoodSharp className="size-6 mr-4 text-orange-600" />
                            <a href="#" className="text-sm font-medium">
                                <p>Thực phẩm</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <MdLocalPharmacy className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Dược phẩm</p>
                            </a>
                        </div>
                    </li>
                    <li className="mb-1">
                        <div className="flex items-center my-1 py-2 px-1 hover:bg-gray-200 rounded-md">
                            <GiChemicalDrop className="size-6 mr-4" />
                            <a href="#" className="text-sm font-medium">
                                <p>Hóa chất</p>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="my-20"></div>
        </div>
    );
};

export default ExpandLeftMenu;
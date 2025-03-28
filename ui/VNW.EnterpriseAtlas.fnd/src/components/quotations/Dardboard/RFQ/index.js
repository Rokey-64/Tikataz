import { MdAddBox } from "react-icons/md";
import { IoBarChart } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";
import PanelButton from "../../common/PanelButton";
import HeaderDisplay from "../../common/HeaderDisplay";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useCallback } from "react";
import Messages from "../../common/Messages";

/**
 * Display a panel listing the quotation types
 * @returns 
 */
const RequestForQuotation = () => {
    const navigate = useNavigate();

    const AddNewBackground = () => {
        return (
            <IoMdAdd className="text-[60px] text-green-700" />
        );
    }

    const CreateClassifiedBackground = () => {
        return (
            <MdPersonSearch className="text-[60px] text-blue-500" />
        );
    }

    const MarketResearchBackground = () => {
        return (
            <IoBarChart className="text-[60px] text-red-500" />
        );
    }

    const createQuotation = useCallback(debounce(() => {
        navigate("/rfq/pricing");
    }, 1000), []);

    const createQuotationEvent = () => {
        createQuotation();
    }



    return (
        <div>
            <HeaderDisplay title="Tạo yêu cầu báo giá" />
            <div className="flex flex-wrap justify-start items-center w-full h-full space-x-4 ">
                <PanelButton icon={MdAddBox} imgBg={AddNewBackground()} content="Tạo báo giá mua hàng tự động" grad="bg-gradient-to-b from-blue-400 to-blue-700 " event={createQuotationEvent}/>
                <PanelButton icon={MdAddBox} imgBg={CreateClassifiedBackground()} content="Tìm kiếm nhà cung cấp" grad="bg-gradient-to-b from-[#a855f7] to-[#7c3aed]"/>
                <PanelButton icon={MdAddBox} imgBg={MarketResearchBackground()} content="Khảo sát thị trường sản phẩm"  grad="bg-gradient-to-b from-[#FF7EB3] to-[#FF3D68] "/>
            </div>
        </div>
    );
};

export default RequestForQuotation;
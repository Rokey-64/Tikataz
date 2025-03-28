import { MdAddBox } from "react-icons/md";
import { MdHistoryEdu } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import PanelButton from "../../common/PanelButton";
import HeaderDisplay from "../../common/HeaderDisplay";

/**
 * Contains the RFQ History component.
 * @returns 
 */
const RFQHistory = () => {

    const AddNewBackground = () => {
        return (
            <MdHistoryEdu className="text-[60px] text-black" />
        );
    }

    const MarketResearchBackground = () => {
        return (
            <MdProductionQuantityLimits className="text-[60px] text-yellow-900" />
        );
    }

    return (
        <div>
            <HeaderDisplay title="Lịch sử yêu cầu báo giá" />
            <div className="flex flex-wrap justify-start items-center w-full h-full space-x-4">
                <PanelButton icon={MdAddBox} imgBg={AddNewBackground()} content="Xem lại đơn đã báo giá hoàn tất" grad="bg-gradient-to-b from-[#FFC700] to-[#FF8E00] " />
                <PanelButton icon={MdAddBox} imgBg={MarketResearchBackground()} content="Danh sách sản phẩm" grad="bg-gradient-to-b from-[#00FF9D] to-[#008B45] " />
            </div>
        </div>
    );
};

export default RFQHistory;
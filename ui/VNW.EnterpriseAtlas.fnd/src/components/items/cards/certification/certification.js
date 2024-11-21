import { useId } from "react";
import { LuFocus } from "react-icons/lu";
import OwnPartner from "./ownPartner/ownPartner";
/**
 * This component is used to display the certification of the user.
 * @returns 
 */
const Certification = () => {
    return (
        <div className="grid grid-cols-1 grid-rows-3 h-full mt-1 ml-1">
            <div>
                <span className="pl-2 text-[12px] font-medium text-[#262424]">Huy hiệu đã đạt</span>
                <div className="grid grid-flow-row grid-cols-3 grid-rows-2 ">
                    {
                        Array(5).fill().map((_, i) => (
                            <div key={`1${i}`} className="w-10 h-12 mt-1 bg-[#f5f5f5] rounded-md flex justify-center items-center">
                                <LuFocus className="text-[#262424] text-2xl opacity-15" />
                            </div>
                        ))
                    }

                </div>
            </div>
            <div className="grid grid-rows-3 row-span-2">
                <div>
                    <span className="pl-2 text-[12px] font-medium text-[#262424]">Chứng chỉ</span>
                    <div className="grid grid-flow-row grid-cols-3 grid-rows-3 ">
                        {
                            Array(6).fill().map((_, i) => (
                                <div key={`2${i}`} className="w-5 h-5 m-1 bg-[#ffffff] rounded-md flex justify-center items-center">
                                    <button >
                                        <LuFocus className="text-[#262424] text-2xl opacity-15" />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="row-span-2 mt-4">
                    <span className="pl-2 text-[12px] font-medium text-[#262424]">Đối tác của chúng tôi</span>
                    <div className="grid grid-flow-row grid-cols-3 grid-rows-3 mt-4">
                        {
                            Array(9).fill().map((_, i) => (
                                <div key={`3${i}`} className="mr-2 mb-2">
                                    <OwnPartner />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Certification;
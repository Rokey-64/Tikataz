
/**
 * This component is used to display the header of the customer card.
 * @returns 
 */
const CustomerHeader = () => {
    return (
        <div className="mt-1 sm:mt-2 w-52 sm:w-[27rem]">
            <h1 className="font-black text-[12px] sm:text-2xl text-[#B1A001]">Chuyển phát nhanh - Muôn Phương</h1>
            <div className="h-5 mb-3">
                <p className="text-[10px] sm:text-base font-normal text-[#051073]">
                    Chuyên gia công sỉ các loại áo thun công nghiệp, chất lượng hàng hóa tốt.
                </p>
                {/* <span className="text-[0.5rem] sm:text-base font-normal text-[#051073] ">
                    
                </span> */}
            </div>
        </div>
    );
};

export default CustomerHeader;
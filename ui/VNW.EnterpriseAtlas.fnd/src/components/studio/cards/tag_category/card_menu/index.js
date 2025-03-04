
/**
 * Description: Menu for tag category card
 * @param {*} param0 
 * @returns 
 */
const CardMenu = ({setCompanyInfo, companyInfo}) => {
    return (
        <div className="border-r border-gray-200 px-2 pt-4 h-screen sticky top-0 left-0 z-40 w-[220px] hidden md:block bg-transparent">
            <ul className="space-y-4 font-sans text-[13px] w-[200px]">
                <li
                    className={`pl-4 cursor-pointer hover:text-blue-500 ${companyInfo === 1 ? "text-blue-500 font-bold" : ""}`}
                    onClick={() => setCompanyInfo(1)}>
                    Thông tin chung
                </li>
                <li
                    className={`pl-4 cursor-pointer hover:text-blue-500 ${companyInfo === 2 ? "text-blue-500 font-bold" : ""}`}
                    onClick={() => setCompanyInfo(2)}>
                    Thông tin sản phẩm & chứng nhận
                </li>
                <li
                    className={`pl-4 cursor-pointer hover:text-blue-500 ${companyInfo === 3 ? "text-blue-500 font-bold" : ""}`}
                    onClick={() => setCompanyInfo(3)}>
                    Thông tin đối tác
                </li>
                <li
                    className={`pl-4 cursor-pointer hover:text-blue-500 ${companyInfo === 4 ? "text-blue-500 font-bold" : ""}`}
                    onClick={() => setCompanyInfo(4)}>
                    Hạng mục mở rộng
                </li>
            </ul>
        </div>
    );
};

export default CardMenu;
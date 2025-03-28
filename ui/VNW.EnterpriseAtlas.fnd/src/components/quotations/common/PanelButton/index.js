
/**
 * Display a panel
 * @param {} param0
 * @returns 
 */
const PanelButton = ({ icon: Icon, imgBg, content, grad, event }) => {

    const buttonClicked = () => {
        if (event) event();
        else
            alert("Chức năng đang được phát triển, vui lòng thử lại sau");
    }


    let gradient = grad ? grad : "bg-gradient-to-r from-[#FFC700] to-[#FF8E00] ";
    gradient = gradient + " flex flex-col items-center max-h-[130px] min-h-[130px] max-w-[140px] min-w-[140px] rounded-md text-white shadow-md p-1";

    return (
        <button className="relative group rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300" onClick={buttonClicked}>
            <div className={gradient}>
                <div className="mt-1">{imgBg}</div>
                <div className="flex justify-center items-center w-full h-full bg-opacity-50 space-x-5 mt-2">
                    <p className="font-medium text-[14px]">{content}</p>
                </div>
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </button>
    );
};

export default PanelButton;
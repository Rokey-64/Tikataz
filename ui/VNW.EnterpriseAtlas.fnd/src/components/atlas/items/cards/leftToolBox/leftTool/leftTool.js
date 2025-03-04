

/**
 * This component is used to display the left tool box
 * @param {*} param0 
 * @returns 
 */

const LeftTool = ({ icon }) => {
    return (
        <div className="flex items-center">
            <button className={`w-6 sm:w-11 h-6 sm:h-11 rounded-full flex items-center justify-center bg-[#D9D9D9] hover:bg-[#f0f0f0] hover:scale-110 hover:shadow-2xl hover:border-2 hover:border-[#ccc] hover:brightness-125 transition-all duration-300 ease-in-out`}>
                {icon}
            </button>
        </div>
    );
};

export default LeftTool;

import { IoAddCircle } from "react-icons/io5";

/**
 * A button for selecting item
 * @param {*} param0 
 * @returns 
 */
const ItemSelectButton = ({ callback, index }) => {

    const buttonOnClick = () => {
        const element = document.getElementById(`prod-upload-${index}`);
        element.click();
    };

    return (
        <div className="hover:opacity-100 opacity-0 transition-opacity duration-300">
            {/* Overlay mờ */}
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 backdrop-blur-lg opacity-40 z-10 rounded-md"></div>

            {/* Button chọn ảnh */}
            <button 
                onClick={buttonOnClick}
                className="absolute top-7 left-1 flex items-center justify-center w-6 h-6 bg-white rounded-md shadow-md 
                text-blue-500 hover:text-blue-700 hover:bg-blue-100 transition-transform transform hover:scale-105 z-30"
            >
                <IoAddCircle className="text-2xl" />
            </button>

            {/* Input file ẩn */}
            <input 
                type="file" accept="image/*" className="hidden"
                onChange={callback}
                id={`prod-upload-${index}`}
            />
        </div>
    );
};

export default ItemSelectButton;

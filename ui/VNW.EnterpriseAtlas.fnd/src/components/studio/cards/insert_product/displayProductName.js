
/**
 * This component is used to display the product name
 * @param {*} param0 
 */
const DisplayProductName = ({ prodName, toggleEdit }) => {

    return (
        <div className="flex items-center justify-center mt-2">
            <span className="text-gray-700 text-sm">
                <strong>{prodName ? "" : "Nhập tên sản phẩm:"}</strong> {prodName}
            </span>
            <button onClick={toggleEdit} className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none">
                ✏️
            </button>
        </div>
    );
};

export default DisplayProductName;
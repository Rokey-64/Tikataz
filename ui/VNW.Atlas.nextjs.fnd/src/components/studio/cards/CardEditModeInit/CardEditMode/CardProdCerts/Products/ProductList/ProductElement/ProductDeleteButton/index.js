
/**
 * This component is a button that removes a product from the list
 * @param {*} param0 
 * @returns 
 */
const ProductDeleteButton = ({ prodImgPath, prodName, callback}) => {

    if (!(prodImgPath || prodName !== "Chưa nhập")) return <></>;

    return (
        <button
            onClick={callback}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
            ✖
        </button>
    );
};

export default ProductDeleteButton;

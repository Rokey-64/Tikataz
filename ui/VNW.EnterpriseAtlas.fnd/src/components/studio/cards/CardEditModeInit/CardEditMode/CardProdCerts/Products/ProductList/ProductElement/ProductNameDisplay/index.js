/**
 * This is a component for displaying the product name
 * @param {*} prodName - product name 
 * @returns 
 */
const ProductNameDisplay = ({ prodName }) => {

    return (
        <span className="text-gray-700 text-sm">
            <strong>{prodName ? "" : "Nhập tên sản phẩm:"}</strong> {prodName}
        </span>
    );
};

export default ProductNameDisplay;
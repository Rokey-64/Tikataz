
/**
 * This component is used to display the product name
 * @param {*} param0 
 */
const ProductChangeNameButtion = ({ toggleEdit }) => {

    return (
        <button onClick={toggleEdit} className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none">
            ✏️
        </button>
    );
};

export default ProductChangeNameButtion;
import ProductElement from "./ProductElement";

/**
 * Display the list of products
 * @param {*} param0 
 * @returns 
 */
const ProductList = ({ getItemAtIndex, callback }) => {

    return (
        <div className="flex flex-wrap max-w-[1200px]">
            {Array(8).fill().map((_, index) => (
                <div key={index} className="w-[275px] ml-1 mb-2">
                    <ProductElement item={getItemAtIndex(index)} callback={callback} />
                </div>
            ))}
        </div>
    );
}

export default ProductList;
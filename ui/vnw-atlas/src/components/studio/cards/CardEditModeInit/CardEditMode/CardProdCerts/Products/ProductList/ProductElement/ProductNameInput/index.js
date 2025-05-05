
/**
 * This component is a text input for product name
 * @param {*} param0 
 * @returns 
 */
const ProductNameInput = ({ displayStatus, setDisplayStatus, prodName, callback}) => {
    if (!displayStatus) return <></>;

    const inputHandler = (e) => {
        callback&&callback(e);
    }

    return <input
        type="text"
        value={prodName === "Chưa nhập" ? "" : prodName}
        onChange={inputHandler}
        placeholder="Nhập tên sản phẩm"
        className="border rounded w-full mt-2 p-2 text-sm"
        onBlur={() => setDisplayStatus(false)}
    />
};

export default ProductNameInput;
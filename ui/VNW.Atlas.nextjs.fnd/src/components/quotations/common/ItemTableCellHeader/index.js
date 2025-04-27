
/**
 * Component for displaying the table cell in the item table
 * @param {*} param0 
 * @returns 
 */
const ItemTableCell = ({ children, width, pos }) => {

    return (
        <div className={`${width || "w-36"} ${pos || "justify-start"}
            flex px-2 py-1 text-center font-sans text-xs
            text-gray-700 bg-white h-10 items-center
            border border-gray-300
           hover:bg-gray-100 opacity-65 transition-all
           `}>
            {children}
        </div>
    );
};

export default ItemTableCell;


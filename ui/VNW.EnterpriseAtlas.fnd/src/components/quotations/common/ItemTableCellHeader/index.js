import styles from "./index.module.scss";

/**
 * Component for displaying the table cell in the item table
 * @param {*} param0 
 * @returns 
 */
const ItemTableCell = ({ children, width, pos}) => {

    return (
        <div className={`${width || "w-36"} ${pos || "justify-start"} ${styles.button}`}>
            {children}
        </div>
    );
};

export default ItemTableCell;


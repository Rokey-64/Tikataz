import ItemTableCellHeader from "../../../../common/ItemTableCellHeader";
import ItemTableCellBody from "../../../../common/ItemTableCellBody";


const ItemTableCell = ({ children, width, pos, type}) => {

    if (type === "header") {
        return (
            <ItemTableCellHeader width={width} pos={pos}>{children}</ItemTableCellHeader>
        );
    }

    return (
        <ItemTableCellBody width={width} pos={pos}>{children}</ItemTableCellBody>
    );
};

export default ItemTableCell;
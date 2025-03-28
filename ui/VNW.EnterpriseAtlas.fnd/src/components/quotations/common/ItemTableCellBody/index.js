import style from './index.module.scss';

const ItemTableCellBody = ({ children, width, pos}) => {
    return (
        <div className={`${style.button} ${pos || "justify-start"} ${width || "w-36"}`}>
            {children}
        </div>
    );
};

export default ItemTableCellBody;

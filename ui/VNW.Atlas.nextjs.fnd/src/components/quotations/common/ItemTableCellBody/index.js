import style from './index.module.scss';

const ItemTableCellBody = ({ children, width, pos }) => {
    return (
        <div className={`${style.button} ${pos || "justify-start"} ${width || "w-36"} 
        flex px-1 py-1 text-center border-x border-b border-gray-300 text-gray-800 transition-all`}>
            {children}
        </div>
    );
};

export default ItemTableCellBody;

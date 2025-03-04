import style from './item.module.scss';

/**
 * This component is used to display a few of items
 * @returns 
 */
const Item = ({ src }) => {

    return (
        <div className={style.root_div}>
            <img src={src} alt="Avatar" className="w-full h-full p-2  object-contain" loading="lazy" />
        </div>
    );
};

export default Item;
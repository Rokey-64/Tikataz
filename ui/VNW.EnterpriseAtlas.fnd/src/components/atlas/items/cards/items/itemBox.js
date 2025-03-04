import { useState, useEffect, useRef, useCallback} from "react";
import Item from "./item/item";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import stype from "./itemBox.module.scss";

/**
 * This component is used to display a few of items
 * @returns 
 */
const ItemBox = ({products}) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!products) return;

        setItems(products.slice(0, 3));
    }, [products]);

    const buttonLeftHandler = () => {
        /** Check if the products array is empty*/
        if (!items || items.length < 3) return;
        
        const currentIndex = products.findIndex((product) => product === items[0]);
        if (currentIndex === 0) return;

        setItems([products[currentIndex - 1], ...items.slice(0, 2)]);

    };

    const buttonRightHandler = () => {
        /** Check if the products array is empty or less than 3 elements */
        if (!items || items.length < 3) return;

        const currentIndex = products.findIndex((product) => product === items[items.length - 1]);
        if (currentIndex === products.length - 1) return;

        setItems([...items.slice(1, 3), products[currentIndex + 1]]);
    };

    return (
        <div className="flex items-center">
            <div>
                <button className={stype.button} onClick={buttonLeftHandler}>
                    <BiSolidLeftArrow className="text-[#8EA1B2]"/>
                </button>
            </div>
            <div className="flex">
                {items.map((item, index) => <Item  key={index} src={items[index]}/>)}
            </div>
            <div>
                <button className={stype.button} onClick={buttonRightHandler}>
                    <BiSolidRightArrow className="text-[#8EA1B2]"/>
                </button>
            </div>
        </div>
    );
};

export default ItemBox;
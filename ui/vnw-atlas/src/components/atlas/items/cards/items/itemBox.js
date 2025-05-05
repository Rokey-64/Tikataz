import { useState, useEffect, useRef, useCallback } from "react";
import Item from "./item/item";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import getAtlasURLByIDAPI from "@/api/getAtlasURLByID";
import { useDispatch} from "react-redux";
import { updateAtlas } from "@/redux/atlasSlice";
import _ from "lodash";

/**
 * This component is used to display a few of items
 * @returns 
 */
const ItemBox = ({ card }) => {
    const [products, setProducts] = useState(card.data.products);
    const [startIndex, setStartIndex] = useState(0);
    const dispatch = useDispatch();
    const MAXIMUM_ITEMS = 3;

    const getLink = useCallback(async (cardProp, product) => {
        if (!product) return;
        if (cardProp.ctype === 'manual' && !product?.link) {
            /**
             * * Continue get link of the product if the product is manual and has no link
             * * * This is used to get the link of the product from the API
             */
            const link = await getAtlasURLByIDAPI(cardProp.cid, product.id);
            if (!link) return;

            const clone_card = _.cloneDeep(cardProp);

            clone_card.data.products.forEach(element => {
                if (element.id === product.id) {
                    element.link = link;
                }
            });

            dispatch(updateAtlas(clone_card));
        }
    }, [startIndex]);

    useEffect( () => {
        const lastProduct = products[startIndex + MAXIMUM_ITEMS - 1];
        getLink(card, lastProduct);
    }
    , [startIndex]);

    useEffect( () => {
        setProducts(card.data.products);
    }
    , [card]);

    /**
     * * This function is used to handle the left button click event
     * @returns 
     */
    const buttonLeftHandler = async () => {
        if (startIndex === 0) return;
        else setStartIndex(startIndex - 1);
    };

    /**
     * * This function is used to handle the right button click event
     * @returns 
     */
    const buttonRightHandler = async () => {
        if (startIndex === products.length - MAXIMUM_ITEMS) return;
        else setStartIndex(startIndex + 1);
    };

    return (
        <div className="flex items-center">
            <div>
                <button className="flex items-center justify-center w-5 sm:w-10 h-5 sm:h-10 bg-white mt-3 sm:mt-5 mr-2 sm:mr-5 rounded-3xl shadow-[0px_1px_2px_rgba(0, 0, 0, 0.3)] hover:bg-cyan-200" onClick={buttonLeftHandler}>
                    <BiSolidLeftArrow className="text-[#8EA1B2]" />
                </button>
            </div>
            <div className="flex">
                {
                    products && products.map(
                        (item, index) => {
                            if (index < startIndex || index >= startIndex + MAXIMUM_ITEMS) return null;
                            return (
                                <Item key={index} item={item}/>
                            );
                        }
                    )
                }
            </div>
            <div>
                <button className="flex items-center justify-center w-5 sm:w-10 h-5 sm:h-10 bg-white mt-3 sm:mt-5 mr-2 sm:mr-5 rounded-3xl shadow-[0px_1px_2px_rgba(0, 0, 0, 0.3)] hover:bg-cyan-200" onClick={buttonRightHandler}>
                    <BiSolidRightArrow className="text-[#8EA1B2]" />
                </button>
            </div>
        </div>
    );
};

export default ItemBox;
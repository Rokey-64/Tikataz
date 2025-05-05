import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import ItemDisplay from "../../../../../../common/ItemDisplay";
import ItemSelectButton from "../../../../../../common/ItemSelectButton";

/**
 * Component for displaying image of product
 * @param {*} param0 
 * @returns 
 */
const ItemImage = ({url, onClick}) => {
    const index = useRef();
    const [path, setPath] = useState(url);

    useEffect(() => {
        index.current = nanoid();
    }, []);

    useEffect(() => {
        onClick&&onClick(path);
    }, [path]);

    const callback = (e) => {
        const file = e.target.files[0];
        if (file) {
            URL.revokeObjectURL(path);
            const blobURL = URL.createObjectURL(file);
            if(blobURL) {
                setPath(blobURL);
            }
        }
    }


    return (
        <div>
            <div className="relative">
                <ItemDisplay path={path} />
                <ItemSelectButton index={index.current} callback={callback}/>
            </div>
        </div>
    );
};

export default ItemImage;

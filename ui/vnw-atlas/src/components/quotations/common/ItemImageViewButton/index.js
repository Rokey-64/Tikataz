import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

/**
 * Component for displaying image of product
 * @param {*} param0 
 * @returns 
 */
const ItemImageViewButton = () => {
    const index = useRef();
    const [path, setPath] = useState(null);

    useEffect(() => {
        index.current = nanoid();
    }, []);

    const callback = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setPath(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div>
            <div className="relative">
                <div className="flex justify-center items-center w-24 h-28 rounded-md bg-gray-200">
                    <img
                        src={path || "/placeholder.jpg"}
                        onError={(e) => e.target.src = "/placeholder.jpg"}
                        className="max-w-full h-full object-contain"
                    />
                </div>

                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-600 opacity-40 backdrop-blur-sm z-10">
                    <button className="text-sm text-blue-500 underline mt-2">
                        Chọn sản phẩm
                    </button>
                </div>
            </div>
            <input type="file" accept="image/*" className="hidden"
                onChange={callback}
                id={`prod-upload-${index.current}`}
            />
            {/* <label htmlFor={`prod-upload-${index.current}`} className="cursor-pointer text-sm text-blue-500 underline mt-2">
                Chọn sản phẩm
            </label> */}
        </div>
    );
};

export default ItemImageViewButton;

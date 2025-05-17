import { useRef, useEffect} from "react";
import { nanoid } from "nanoid";
import { useTranslations } from "next-intl";

const ProductUploadImage = ({ path, callback }) => {
    const t = useTranslations("trans");
    const index = useRef();

    useEffect(() => {
        index.current = nanoid();
    }, []);

    return (
        <>
            <div className="flex justify-center items-center w-32 h-32 rounded-md bg-gray-100">
                <img
                    src={path || "/placeholder.jpg"}
                    alt="Product Logo"
                    className="max-w-full max-h-full object-contain"
                />
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={callback}
                className="hidden"
                id={`prod-upload-${index.current}`}
            />
            <label htmlFor={`prod-upload-${index.current}`} className="cursor-pointer text-sm text-blue-500 underline mt-2">
                {t("studio.card.product.sel")}
            </label>
        </>
    );
};

export default ProductUploadImage;
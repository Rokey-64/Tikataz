import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../../../../../../../../redux/cardsSlice";
import CompressImage from "../../../../../../../../../services/compressImage";
import ProductNameInput from "./ProductNameInput";
import ProductDeleteButton from "./ProductDeleteButton";
import ProductUploadImage from "./ProductUploadImage";
import ProductChangeNameButton from "./ProductChangeNameButton";
import ProductNameDisplay from "./ProductNameDisplay";
import debounce from "lodash.debounce";

const ProductElement = ({ item, callback }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cards.products);

    /**
     * Product image path state
     */
    const [prodImgPath, setProdImgPath] = useState("");

    /**
     * Product name state
     */
    const [prodName, setProdName] = useState("Chưa nhập");

    /**
     * Hide or show the product name input field
     */
    const [displayStatus, setDisplayStatus] = useState(false);

    useEffect(() => {
        if (item) {
            setProdImgPath(item.image);
            setProdName(item.name);
        }
    }, [item]);

    /**
     * Update the product in the store
     * @param {*} products 
     * @param {*} key 
     * @param {*} value 
     */
    const updateProduct = (products, key, value, item) => {
        let newProducts = [];

        // Whether the product is updated or created state
        let isUpdate = false;

        products.forEach((product) => {
            if (product.id === item.id) {
                newProducts.push({ ...product, [key]: value });
                isUpdate = true;
            }
            else {
                newProducts.push(product);
            }
        });

        // Create a new product if it doesn't exist
        if (!isUpdate) {
            newProducts.push({ ...item, [key]: value });
        }

        dispatch(setProducts(newProducts));
    };

    const handleFileInput = async (event) => {
        const file = event.target.files[0];
        let imgUrl = "";
        if (file) {
            /**
             * Compress the image before displaying it, if the size is larger than 0.3MB
             */
            imgUrl = await CompressImage(file, null);

            /**
             * Display the image
             */
            if (imgUrl) {
                // Revoke the previous object URL
                URL.revokeObjectURL(prodImgPath);

                // Update the product image in the store
                updateProduct(products, "image", imgUrl, item);

                // Clear the input field
                event.target.value = "";
            }


        }
    };

    /**
     * Update the product name with a delay
     * @param {*} products
     * @param {*} name
     */
    const updateNameDebounce = useCallback(debounce((products, name, item) => {
        updateProduct(products, "name", name, item);
    }, 500), []);


    /**
     * Change the product name
     * @param {*} event 
     */
    const handleNameChange = (event) => {
        if (!prodImgPath) return;
        setProdName(event.target.value);
        updateNameDebounce(products, event.target.value, item);
    };

    /**
     * Toggle the edit mode
     */
    const toggleEdit = () => {
        setDisplayStatus(!displayStatus);
    };

    /**
     * Clear the product image and name
     */
    const handleClear = () => {

        callback && callback(item);
    };

    return (
        <div className="relative w-64 h-64 border rounded p-4 shadow-sm flex flex-col items-center justify-center" style={{ minWidth: "16rem", minHeight: "16rem" }}>
            <ProductDeleteButton prodImgPath={prodImgPath} prodName={prodName} callback={handleClear} />
            <ProductUploadImage path={prodImgPath} callback={handleFileInput} />
            <div className={`flex items-center justify-center mt-2 ${!prodImgPath ? "hidden" : ""}`}>
                <ProductNameDisplay prodName={prodName} />
                <ProductChangeNameButton toggleEdit={toggleEdit} />
            </div>
            <ProductNameInput displayStatus={displayStatus} setDisplayStatus={setDisplayStatus} prodName={prodName} callback={handleNameChange} />
        </div>

    );
};

export default ProductElement;

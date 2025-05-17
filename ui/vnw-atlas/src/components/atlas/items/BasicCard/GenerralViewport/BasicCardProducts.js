import React, { useEffect, useState, useCallback } from "react";
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { useTranslations } from "next-intl";
import getAtlasProductURLsAPI from "@/api/getAtlasProductURLs";
import { useDispatch } from "react-redux";
import { updateAtlas } from "@/redux/atlasSlice";
import _ from "lodash";

const BasicCardProducts = ({ card }) => {
    const t = useTranslations('trans');
    const dispatch = useDispatch();
    const [imgSrc, setImgSrc] = useState('');

    // Limmit the products when the view-more button click
    const MAX_ADDED_PRODUCT = 3;

    // The current number of products to show
    const [maxProducts, setMaxProducts] = useState(MAX_ADDED_PRODUCT);
    const [products, setProducts] = useState(card.data.products.slice(0, maxProducts));

    // if (card.cid === "67d00259f5b051487fcc286b") {
    //     alert(maxProducts);
    // }



    // Call API to get more product URLs if it doesn't exist
    const getLink = useCallback(async (currCard, keys) => {
        if (currCard.ctype === 'manual') {
            /**
             * * Continue get link of the product if the product is manual and has no link
             * * * This is used to get the link of the product from the API
             */
            const payload = await getAtlasProductURLsAPI({ cid: currCard.cid, keys: keys });
            if (!payload && payload?.length === 0) return;

            const newProducts = currCard.data.products.map(product => {
                const productLink = payload.find(item => item.key === product.key);
                if (productLink) {
                    return {
                        ...product,
                        link: productLink.url
                    };
                }
                return product;
            });
            dispatch(updateAtlas({ newProducts }));
            setProducts(newProducts.slice(0, maxProducts));
        }
    }, [maxProducts, dispatch]);

    useEffect(() => {
        const keys = []
        for (let i = 1; i <= MAX_ADDED_PRODUCT; i++) {
            const product = card.data.products?.[maxProducts - i];
            if (!product) continue;
            if (product?.link) continue;
            if (!product?.key) continue;

            keys.push(product?.key);
        }

        if (keys.length === 0) {
            setProducts(card.data.products.slice(0, maxProducts));
            return;
        }

        keys.length > 0 ? getLink(card, keys) : null;
    }, [maxProducts]);

    const nextButtonOnClick = () => {
        setMaxProducts(maxProducts + MAX_ADDED_PRODUCT);
    }

    const handleError = () => {
        setImgSrc('/placeholder.jpg');
    };



    return (
        < div >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h2 className="text-sm sm:text-lg font-semibold text-gray-800">{t("atlas.featured_products")}</h2>

            </div>
            <div className="flex items-end gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
                {products.map((product) => (
                    <div key={nanoid()} className="group flex flex-col items-center min-w-[80px] sm:min-w-0">
                        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 relative shadow-sm hover:shadow-md transition-shadow">
                            <Image
                                src={imgSrc || product.link}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 140px"
                                onError={handleError}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <p className="mt-1 text-xs font-medium text-gray-700 text-center line-clamp-2 h-10">
                            {product?.name}
                        </p>
                    </div>
                )
                )}
                <button className={`text-sm text-blue-600 hover:text-blue-800 font-medium ml-4 mb-10 ${card.data.products.length > maxProducts ? "block" : "hidden"}`}
                    onClick={nextButtonOnClick}
                >
                    ({t("atlas.view_next")} ...)
                </button>
            </div>
        </div >
    );
}

export default BasicCardProducts;
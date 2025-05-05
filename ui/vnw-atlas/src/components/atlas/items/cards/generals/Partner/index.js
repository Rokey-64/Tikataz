import { useState, useEffect, useRef } from 'react';
import { MdCenterFocusWeak, MdPerson, MdLocationOn, MdBusiness } from 'react-icons/md';
import feedThumbnailAPI from "@/api/feedThumbnail";
import { useTranslation } from "react-i18next";


const Partner = ({ cust}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [custLogo, setCustLogo] = useState(null);
    const imageRef = useRef(null);
    

    useEffect(() => {
        /**
         * If the customer has a link, set the logo to the link
         */
        if (cust?.link) {
            setCustLogo(cust.link);
            return;
        }

        if (!cust?.key) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {

                        /**
                         * Call API to get the thumbnail of the customer
                         * @param {*} id - image ID
                         */
                        const feedThumbnail = async (id) => {
                            const buffer = await feedThumbnailAPI(id);
                            const url = URL.createObjectURL(buffer);
                            setCustLogo(url);
                        }

                        if (cust?.key) {
                            /**
                             * If key is available, call API to get the thumbnail
                             */
                            feedThumbnail(cust.key);
                            return;
                        }

                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };

    }, []);

    return (
        <div className="mr-1 mb-1 relative" ref={imageRef}>
            <div
                className="cursor-pointer "
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex justify-center items-center w-10 h-10 bg-white m-1">
                    {
                        custLogo && (
                            <img
                                src={custLogo}
                                alt="customer"
                                className="object-contain rounded-sm w-full h-full"
                                loading="lazy"
                            />
                        )
                    }
                </div>
            </div>

            <CustomerDetails isHovered={isHovered} cust={cust} />
        </div>
    );
};

const CustomerDetails = ({ cust, isHovered }) => {
    const { t } = useTranslation();
    if (!isHovered || !cust) return null;

    return (
        <div className="absolute z-20 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <MdPerson className="text-cyan-500 text-lg" />
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                        {cust.custName || t("atlas.no_name")}
                    </h3>
                </div>
            </div>

            <div className="p-4 space-y-3">

                <div className="flex items-start gap-3">
                    <MdLocationOn className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-gray-500">{t("atlas.address")}</p>
                        <p className="text-sm font-medium text-gray-700">
                            {cust.address ? (
                                <span className="break-words">{cust.custAddress}</span>
                            ) : (
                                <span className="text-gray-400">{t("atlas.no_address")}</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Partner;
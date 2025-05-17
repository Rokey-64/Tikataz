import React, { useState, useCallback} from "react";
import { useTranslations } from "next-intl";
import InlineCardEditButton from "./InlineCardEditButton";
import InlineCardViewButton from "./InlineCardViewButton";
import InlineCardTrendButton from "./InlineCardTrendButton";
import { useRouter } from 'next/navigation';
import { throttle } from "lodash";
import { useDispatch } from "react-redux";
import { resetDefault} from "../../../../../redux/cardsSlice";

/**
 * Display the inline card element
 * @param {*} param0 
 * @returns 
 */
const InlineCardElement = ({ cardData }) => {
    const [isHover, setIsHover] = useState(false);
    const t = useTranslations('trans');
    const router = useRouter();
    const dispatch = useDispatch();

    const handleHover = () => {
        setIsHover(true);
    };

    const handleLeave = () => {
        setIsHover(false);
    };

    /**
     * Load existing card data from server
     */
    const loadCardCallback = useCallback(
        throttle(
            async (cardData) => {
                dispatch(resetDefault());
                router.push(`/card?id=${cardData._id}&st=u`);
            },
            3000, { trailing: false }),
        [router]
    )

    const modifyRowHandler = async () => {
        loadCardCallback(cardData);
    }

    const viewRowHandler = () => {
    }

    const trendRowHandler = () => {
    }

    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                <td scope="row" className="text-sm px-2 py-1 min-w-[80px] font-medium text-gray-900 whitespace-nowrap dark:text-white sticky left-0 z-0 bg-white">
                    {t(cardData.status)}
                </td>
                <td className="text-sm font-semibold px-2 py-1 min-w-[500px] max-w-[500px]">
                    <div className="flex items-start">
                        <div className="rounded-md bg-white shadow m-3 ">
                            <img
                                src={cardData.general.logo || "/placeholder.jpg"}
                                alt="Avatar"
                                className="p-1 min-w-[80px] max-w-[80px] min-h-[60px] max-h-[60px] object-cover rounded-md"
                                onError={(e) => { e.target.src = "/placeholder.jpg" }}
                            />
                        </div>
                        <div>
                            <h1 className="text-[14px] font-semibold text-gray-900 dark:text-white">{cardData.general.branchName || ""}</h1>
                            <div className={`${isHover === false ? "" : "hidden"} `}>
                                <p className="text-sm font-sans dark:text-gray-400 ">
                                    {cardData.general.description || t("none_description")}
                                </p>
                            </div>
                            <div className={`${isHover === true ? "" : "hidden"} flex items-center gap-2 pt-3`}>
                                <InlineCardEditButton callback={modifyRowHandler} />
                                <InlineCardViewButton callback={viewRowHandler} />
                                <InlineCardTrendButton callback={trendRowHandler} />
                            </div>
                        </div>
                    </div>
                </td>
                <td className="text-sm font-sans px-2 py-1">{cardData.mode}</td>
                <td className="text-sm font-sans px-2 py-1">{cardData.createdAt}</td>
                <td className="text-sm font-sans px-2 py-1">{cardData.rate}</td>
                <td className="text-sm font-sans px-2 py-1">{cardData.RFQ}</td>
            </tr>
        </>
    );
};

export default InlineCardElement;
import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { IoAdd } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { setInlineCards } from "@/redux/inlineCardSlice";
import { resetDefault } from "@/redux/cardsSlice";
import InlineCardElement from "./InlineCardElement";
import AboveFixedContainer from "../../common/AboveFixedContainer/index";
import AboveInsertedButton from "../../common/AboveInsertedButton";
import DelayedRoute from "@/services/routeDelay";
import getInlineCardsAPI from "@/api/getInlineCards";
import checkOverCardAPI from "@/api/checkOverCard";
import _ from "lodash";

import { throttle } from "lodash";
import { nanoid } from "nanoid";

const InlineCardList = () => {
    const t = useTranslations('trans');
    const router = useRouter();
    const dispatch = useDispatch();
    const inlineCards = useSelector((state) => state.inlineCards.inlineCards);
    const [refreshCards, setRefreshCards] = useState(false);

    /**
     * Initialize new card
     */
    const initNewCardCallback = useCallback(
        throttle(
            async () => {
                const response = await checkOverCardAPI();
                if (!response) return;
                if (response.status === 400 && response.data.data?.message === "card_limit") {
                    alert(t("card_limit"));
                    return;
                };

                const cardId = nanoid();
                dispatch(resetDefault());
                router.push(`/card?id=${cardId}&st=n`);
            },
            3000, { trailing: false }),
        [router]
    )

    /**
     * Raise when user click on add row button
     */
    const addRowHandler = async () => {
        initNewCardCallback();
    }

    /**
     * Load inline cards from server
     */
    const loadInlineCardsCallback = useCallback(
        throttle(
            async () => {
                const result = await getInlineCardsAPI();

                if (!result?.data?.payload) return;
                dispatch(setInlineCards([...result.data.payload]));
            },
            3000, { trailing: false }),
    )

    useEffect(() => {
        if (inlineCards.length > 0) return;
        loadInlineCardsCallback();
    }, []);

    /**
     * When user click on refresh button
     */
    const refreshCardsHandler = async () => {
        setRefreshCards(true);
        await loadInlineCardsCallback();
        setTimeout(() => {
            setRefreshCards(false);
        }, 1000);
    }

    return (
        <DelayedRoute>
            <div className="flex pt-14 md:pt-6 w-screen mx-auto">
                <div className="md:pl-10 space-y-5">

                    <div>
                        <AboveFixedContainer>
                            <div className="flex items-center justify-end space-x-10">
                                <AboveInsertedButton callback={addRowHandler} content={t("add_card")} options={{ icon: IoAdd }} />
                                <AboveInsertedButton callback={refreshCardsHandler} content={t("refresh")}
                                    options={
                                        {
                                            icon: IoMdRefresh,
                                            iconAdditionalClass: `${refreshCards ? "animate-spin" : ""}`
                                        }
                                    } />
                            </div>
                        </AboveFixedContainer>
                    </div>

                    <div className="overflow-y-auto bg-white
                                    max-w-[calc(100vw-15px)] md:max-w-[calc(100vw-280px)] 
                                    md:max-h-[calc(100vh-135px)] md:min-h-[calc(100vh-135px)] 
                                    max-h-[calc(100vh-165px)] min-h-[calc(100vh-165px)]">
                        <div>
                            <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full table-auto h-fit">
                                <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400 z-10">
                                    <tr>
                                        <th scope="col" className="text-[12px] font-bold px-2 py-3 min-w-[100px] sticky left-0 top-0 z-20 bg-white">{t("inline_cards_status")}</th>
                                        <th scope="col" className="text-[12px] font-bold px-8 py-3 min-w-[500px]">{t("inline_cards_info")}</th>
                                        <th scope="col" className="text-[12px] font-bold px-2 py-3 min-w-[100px]">{t("inline_cards_mode")}</th>
                                        <th scope="col" className="text-[12px] font-bold px-2 py-3 min-w-[100px]">{t("inline_cards_start")}</th>
                                        <th scope="col" className="text-[12px] font-bold px-2 py-3 min-w-[200px]">{t("inline_cards_rate")}</th>
                                        <th scope="col" className="text-[12px] font-bold px-2 py-3 min-w-[200px]">{t("inline_cards_RFQ")}</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        inlineCards.map((cardData, index) => (
                                            <InlineCardElement key={index} cardData={cardData} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DelayedRoute>
    );
};

export default InlineCardList;
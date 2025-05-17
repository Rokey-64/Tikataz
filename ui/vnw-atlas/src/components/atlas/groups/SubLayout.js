'use client'

import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import _ from "lodash";
import BasicCard from "../items/BasicCard";
import getAtlasCardAPI from "@/api/getAtlasCard";
import { setAtlas} from "@/redux/atlasSlice";
import { setOfset } from "@/redux/searchSlice";
import throttle from "lodash.throttle";
import LeftMenu from "../menu/LeftMenu";



const SubLayout = ({ serverCards }) => {
    const [loading, setLoading] = React.useState(false);
    const atlas = useSelector((state) => state.atlas);
    const searchValue = useSelector((state) => state.search);
    const dispatch = useDispatch();

    /**
     * * * The limit of cards per page
     * * * This is used to limit the number of cards that can be loaded in the atlas page
     */
    const LIMITED_PER_PAGE = 50

    /**
     * * * Reference to the terminal element that is used to load more cards when the user scrolls to the bottom of the page
     * * * This is used to trigger the IntersectionObserver to load more cards
     * * * This is used to load more cards when the user scrolls to the bottom of the page
     */
    const signalE = useRef(null);

    /**
     * Set the card pointer to the last card that was loaded
     * * This is used to load more cards when the user scrolls to the bottom of the page
     * @param {*} cid - The card id of the last card that was loaded
     * @param {*} ctype - The card type of the last card that was loaded
     */
    const setAtlasGenPointer = (cid, ctype, major) => {
        sessionStorage.setItem("atlas_search_general", JSON.stringify({
            cid,
            ctype,
            major
        }));
    }

    const callLoadCardsAPI = useCallback(
        async () => {
            setLoading(true);
            const storage = sessionStorage.getItem("atlas_search_general");

            if (!storage) {
                return;
            }

            const jsonStorage = JSON.parse(storage);

            const cards = await getAtlasCardAPI(jsonStorage.cid, jsonStorage.ctype, jsonStorage.major, searchValue.value, searchValue.ofset, undefined);
            if (!cards) return;

            /**
             * * If atlas page is reaching the limit of cards, clear the atlas state
             * * else, push the cards to the atlas state
             * 
             */
            if (atlas.length === LIMITED_PER_PAGE) {
                dispatch(setAtlas(cards));
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            else {
                const mergedCards = [...atlas, ...cards];
                dispatch(setAtlas(mergedCards));
            }

            /**
             * * Update the card pointer to the last card in the list
             * * This is used to load the next set of cards when the user scrolls to the bottom of the page
             */
            setAtlasGenPointer(cards[cards.length - 1].cid, cards[cards.length - 1].ctype, jsonStorage.major);

            sessionStorage.setItem("atlas_search_general", JSON.stringify({
                cid: cards[cards.length - 1].cid,
                ctype: cards[cards.length - 1].ctype,
                major: jsonStorage.major
            }));

            setLoading(false);
        }, [atlas]);

    /**
     * Load the cards for the first time when the component mounts
     */
    useEffect(() => {
        if (atlas.length === 0) {
            if (!serverCards || serverCards.length === 0) return;

            // callLoadCardsAPI();
            dispatch(setAtlas(serverCards));

            setAtlasGenPointer(serverCards[serverCards.length - 1].cid, serverCards[serverCards.length - 1].ctype, null);

            setLoading(false);
            return;
        }
    }, [serverCards]);


    /**
     * If the user scrolls to the bottom of the page, call the api using IntersectionObserver
     */
    useEffect(() => {
        if (atlas.length === 0) return;
        const crossItem = signalE.current
        const intersector = new IntersectionObserver(
            throttle(
                ([entries]) => {
                    if (entries.isIntersecting) {
                        callLoadCardsAPI();
                        dispatch(setOfset(searchValue.ofset + 1));
                    }
                }, 2000), { threshold: 0.9 });

        if (crossItem) {
            intersector.observe(crossItem);
        }

        return () => {
            if (crossItem) {
                intersector.unobserve(crossItem);
            }
        };
    }, [atlas]);

    return (
        <>
            {loading && (
                <div className="fixed top-[4rem] left-0 right-0 h-0.5 z-50 bg-gray-200 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-amber-100 via-orange-200 to-red-200 origin-left animate-[scaleX_5s_linear_infinite]"></div>
                </div>
            )}
            <div className="fixed top-[4.1rem] left-0 z-10"><LeftMenu setLoading={setLoading} /></div>
            <div className="mt-28" >
                <div>{/**News*/}</div>
                <div className="flex flex-col w-fix ">
                    <div className="space-y-4">

                        {atlas && atlas.map((card, index) => {
                            if (card.atlasKind === "card") {
                                return (
                                    <BasicCard key={card.cid} card={card} />
                                )
                            }
                            return null
                        })}
                        <div ref={signalE} className="h-1 w-1/2"></div>
                    </div>
                </div>
            </div>
            <div></div>
        </>
    );
}

export default SubLayout
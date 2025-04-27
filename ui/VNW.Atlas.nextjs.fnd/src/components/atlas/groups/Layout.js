import React, { useRef, useEffect, useCallback } from "react";
import throttle from "lodash.throttle";
import Toolbar from "../toolbar/toolbar";
import { useSelector, useDispatch } from "react-redux"
import SubLayout from "./SubLayout";
import LeftMenu from "../menu/LeftMenu";
import getAtlasCardAPI from "@/api/getAtlasCard";
import { setAtlas, insertAtlas, clearAtlas } from "@/redux/atlasSlice";


// Layout component that wraps around all atlas pages
const Layout = () => {
    const [loading, setLoading] = React.useState(false);

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
     * * * Reference to the card pointer that is used to load more cards when the user scrolls to the bottom of the page
     * * * This is used to keep track of the last card that was loaded
     */
    const card_pointer = useRef({
        cid: "",
        ctype: "manual"
    });

    const dispatch = useDispatch();
    const atlas = useSelector((state) => state.atlas);

    /**
     * * Load the cards from the API and update the state
     */
    const callLoadCardsAPI = async () => {
        setLoading(true);
        const cards = await getAtlasCardAPI(card_pointer.current.cid, card_pointer.current.ctype);
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
        card_pointer.current = {
            cid: cards[cards.length - 1].cid,
            ctype: cards[cards.length - 1].ctype
        };
        setLoading(false);
    }

    /**
     * Load the cards for the first time when the component mounts
     */
    useEffect(() => {
        if (atlas.length === 0) {
            callLoadCardsAPI();
            return;
        }
    }, []);

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
                    }
                }, 4000), { threshold: 0.9 });

        if (crossItem) {
            intersector.observe(crossItem);
        }

        return () => {
            if (crossItem) {
                intersector.unobserve(crossItem);
            }
        };
    }, [atlas.length]);



    return (
        <div className="bg-[#f2f2f2] w-fix overflow-x-hidden font-sans">

            {/* <LoadingSpinner/> */}
            <div className="fixed top-0 w-full z-10" ><Toolbar /></div>
            {loading && (
                <div className="fixed top-[4rem] left-0 right-0 h-0.5 z-50 bg-gray-200 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-amber-100 via-orange-200 to-red-200 origin-left animate-[scaleX_5s_linear_infinite]"></div>
                </div>
            )}
            <div className="flex items-start justify-center">

                <div className="fixed top-[4.1rem] left-0 z-10"><LeftMenu /></div>
                <div className="mt-28 md:ml-10 mr-3 md:mr-0">
                    <div>{/**News*/}</div>
                    <div className="flex flex-col w-fix ">
                        <SubLayout />
                        <div ref={signalE} className="h-1 w-1/2"></div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Layout;
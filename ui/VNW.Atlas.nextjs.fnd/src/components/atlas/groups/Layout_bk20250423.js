import React, { useRef, useEffect, useCallback } from "react";
import throttle from "lodash.throttle";
import Toolbar from "../toolbar/toolbar";
import { useSelector, useDispatch } from "react-redux"
import { addStatus, updateStatus, clearStatus } from "@/redux/status_slice";
import { addIndex } from "@/redux/tagIndex_slice";
import { addTag, clearTag } from "@/redux/tags_slice";
import SubLayout from "./SubLayout";
import LeftMenu from "../menu/LeftMenu";
import defaultTag from "@/api/tag";
import findTagByMajor from "@/api/tagByMajor";
import TagRender, { TagRerennder } from "@/services/tag-handler";


// Layout component that wraps around all atlas pages
const Layout = () => {
    const LIMITED_PER_PAGE = 100 // only 50 tags per page
    const terminalElement = useRef(null);
    const dispatch = useDispatch();
    const tags = useSelector((state) => state.tags);
    const status = useSelector((state) => state.status);
    const currentIndex = useSelector((state) => state.tagIndex);
    const pos = useRef(0);
    
    /**
     * Load more tags if the scroll reaches the bottom of the page
     */
    const findNextTags = useCallback(
        async () => {
            let tags = [];
            let response = null;
            if(currentIndex.major) {
                /**
                 * Get the tags by major if the major is not empty
                 */
                response = await findTagByMajor(currentIndex._id, currentIndex.major);
            }
            else {
                /**
                 * Get the default tags if the major is empty
                 * @type {Object} response
                 */
                response = await defaultTag(currentIndex._id);
            }

            if (!response)
                return;

            tags = response.data.tags;
            if(response.data._id !== currentIndex._id) {
                dispatch(addIndex({...currentIndex, _id: response.data._id}));
            }
            pos.current = pos.current + tags.length;

            /**
             * Convert the tags to the format that can be rendered
             */
            const { tags:newTags, status:newStatus } = TagRender(tags);
            if (!newTags || !newStatus)
                return;

            nextPageHandler();
            dispatch(addTag(newTags));
            dispatch(addStatus(newStatus));
        }, [currentIndex]
    );

    /**
     * If the page reaches the limit of tags, reset the position and clear the tags
     */
    const nextPageHandler = useCallback(
        async () => {
            if(pos.current > LIMITED_PER_PAGE){
                pos.current = 0; // Reset the position
                dispatch(clearTag());
                dispatch(clearStatus());
            }
        }, []
    );

    /**
     * Update the status of the tags every 5 seconds
     */
    const findStatus = useCallback(
        async () => {
            const cloneStatus = [...status];
            for (let stt of cloneStatus) {
                const indexer = status.findIndex((item) => item._id === stt._id);
                const reStatus = TagRerennder(status[indexer]);
                dispatch(updateStatus({ status: reStatus, index: indexer}));
            }
        }, []
    )

    /**
     * If the user scrolls to the bottom of the page, call the api using IntersectionObserver
     */
    useEffect(() => {
        if (tags.length === 0) return;
        const crossItem = terminalElement.current
        
        const intersector = new IntersectionObserver(
            throttle(
                ([entries]) => {
                    if (entries.isIntersecting) {
                        findNextTags();
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
    }, [currentIndex]);

    /**
     * Load the tags for the first time when the component mounts
     */
    useEffect(() => {
        if (!tags.length) {
            findNextTags();
        }
    }, []);


    /**
     * Update the tags every 10 seconds
     */
    useEffect(() => {
        const interval = setInterval(() => { findStatus(); } , 5000);
        return () => clearInterval(interval);
    }, [tags]);

    return (
        <div className="bg-[#f2f2f2] w-full overflow-x-hidden font-sans">
            {/* <LoadingSpinner/> */}
            <div className="fixed top-0 w-full z-10" ><Toolbar/></div>
            <div className="flex items-start justify-center">
                
                <div className="fixed top-[4.1rem] left-0 z-10"><LeftMenu/></div>
                <div className="mt-28 mr-3 flex justify-center">
                    <div>{/**News*/}</div>
                    <div className="flex flex-col w-full">
                        <SubLayout/>
                        <div ref={terminalElement} className="h-1 w-1/2"></div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Layout;
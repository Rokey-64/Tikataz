import { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash";
import getHashtagsAPI from "../../../../../api/getHashtags";
import _ from "lodash";
/**
 * Display suggestion for hashtags when the user is typing
 * @param {*} param0 
 * @returns 
 */
const DisplayHashtagSuggestion = ({ autoload, userInput, onClick }) => {
    const [hashtagList, setHashtagList] = useState([]);
    const inputRef = useRef('');

    /**
     * Replace the hashtag list
     * @param {*} hashtag 
     * @returns 
     */
    const parseHashtags = (hashtag) => {
        if (!hashtag) return [];
        // Xóa khoảng trắng thừa, ký tự đặc biệt và chuẩn hóa dấu #
        hashtag = hashtag.replace(/[\s\n\r\t]+/g, '').trim();

        // Tách chuỗi thành mảng dựa trên dấu #
        const hashtagArray = hashtag.split('#').filter(Boolean);

        return hashtagArray;
    };

    /**
     * Only call the API when the user input changes and debounce the API call
     * @param {*} input
     */
    const callAPIDebounce = useCallback(
        debounce((ref, input, hashtags) => {
            if (ref.current === input) return;
            ref.current = input;

            if (!input) return;
            if (input.length < 2) return;

            // Call the API to get the hashtags based on the user input
            const getHashtags = async (input) => {
                const response = await getHashtagsAPI(input);
                if (response) {
                    // If hashtags already exist in the list, remove them from the list
                    const filteredHashtags = response.filter((item) => {
                        return hashtags.includes(item.hashtag) === false;
                    }).map((item) => {
                        return {
                            hashtag: item.hashtag,
                            display: true
                        };
                    });

                    setHashtagList(filteredHashtags);
                }
            }

            getHashtags(input);
        }, 500),
        []);


    useEffect(() => {
        // only call the API when the user press key
        if (autoload) return;

        // Get the current hashtag from the user input
        const hashtags = parseHashtags(userInput);

        const currentHashtag = hashtags[hashtags.length - 1];
        callAPIDebounce(inputRef, currentHashtag, hashtags);
    }, [userInput]);

    const hashtagOnclick = (value) => {
        // Add the hashtag to the textarea
        onClick(value, _.cloneDeep(hashtagList));

        // Remove the hashtag from the list
        const updatedHashtags = hashtagList.map((item) => {
            if (item.hashtag === value) {
                item.display = false;
            }
            return item;
        });
        setHashtagList(updatedHashtags);
    }

    return (
        <div className="flex items-start justify-start h-20 bg-white p-2 font-sans text-xs text-blue-700">
            {hashtagList.map((item, index) => (
                <div key={index}
                    className={`hover:bg-gray-200 cursor-pointer px-1 ${item.display ? "block" : "hidden"}`}
                    onClick={() => hashtagOnclick(item.hashtag)}>
                    #{item.hashtag}
                </div>
            ))}
        </div>
    );
};

export default DisplayHashtagSuggestion;

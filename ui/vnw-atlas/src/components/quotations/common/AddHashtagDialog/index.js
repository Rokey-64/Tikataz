import React, { useState, useEffect} from 'react';
import HashtagInput from './HashtagInput';
import HashtagCloseButton from '../CloseButton';
import HashtagSubmitButton from '../SubmitButton';
import HashtagDisplayHeader from './HashtagDisplayHeader';
import DisplayHashtagSuggestion from './DisplayHashtagSuggestion';
import { useTranslations } from "next-intl";
import { set } from 'lodash';

/**
 * Displays a dialog for adding a hashtag.
 * @param {*} param0 
 * @returns 
 */
const AddHashtagDialog = ({ open, onClose, onAdd, initialHashtag}) => {
    const [hashtag, setHashtag] = useState('');
    const [autoload, setAutoload] = useState(false);
    const t = useTranslations('trans');
    const MAX_HASHTAG_LENGTH = 5; // Maximum number of hashtags

    useEffect(() => {
        setHashtag(initialHashtag);
    }, [initialHashtag]);

    if (!open) return null;

    /**
     * Replace the hashtag list
     * @param {*} hashtag 
     * @returns 
     */
    const parseHashtags = (hashtag) => {
        if (!hashtag) return [];
    
        hashtag = hashtag.replace(/[\s\n\r\t]+/g, '').trim();
    
        const hashtagArray = hashtag.split('#').filter(Boolean);
    
        return hashtagArray;
    };

    /**
     * Submit the hashtag
     */
    const submitHashtagEvent = () => {
        const hashtags = parseHashtags(hashtag);
        onAdd(hashtags);
    }

    const onCloseEvent = () => {
        setHashtag('');
        onClose();
    }
    
    /**
     * Update the hashtag when the input changes
     * @param {*} e 
     * @returns 
     */
    const hashtagOnchange = (e) => {
        const hashtags = parseHashtags(e.target.value);
        if (hashtags.length > MAX_HASHTAG_LENGTH) {
            alert(t('quote_hashtag_over_limmit'));
            return;
        }
        setHashtag(e.target.value);
    }

    /**
     * Raise an event when the hashtag is clicked
     * @param {*} value 
     * @param {*} searchList 
     * @returns 
     */
   const suggestionHashtagClick = (value, searchList) => {
        const hashtags = parseHashtags(hashtag);
        if (hashtags.length >= MAX_HASHTAG_LENGTH) {
            return;
        }
        
        /**
         * Push the new hashtag to the list or replace the last one if it already exists
         * S1: If the list is empty, push the new hashtag to the list
         * S2: If the last hashtag exists in the list, then push the new hashtag to the list
         * S3: If the last hashtag does not exist in the list, then replace the last hashtag with the new one
         */
        if (hashtags.length === 0) {
            hashtags.push(value);
        }
        else{
            const lastHashtag = hashtags[hashtags.length - 1];
            const found = searchList.some(item => item.hashtag === lastHashtag);
            if(found) {
                hashtags.push(value);
            }
            else {
                hashtags[hashtags.length - 1] = value;
            }
        }

        const result = hashtags.map(tag => `#${tag}`).join(" ");
        setHashtag(result);
        setAutoload(true);
    }

    return (
        <div className="fixed inset-1 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-5 w-96 shadow-lg">
                <HashtagDisplayHeader />
                <HashtagInput hashtag={hashtag} event={hashtagOnchange} setAutoload={setAutoload}/>
                
                <DisplayHashtagSuggestion autoload={autoload} userInput={hashtag} onClick={suggestionHashtagClick} />
                <div className="flex justify-end">
                    <HashtagCloseButton event={onCloseEvent} />
                    <HashtagSubmitButton event={submitHashtagEvent} />
                </div>
            </div>
        </div>
    );
};

export default AddHashtagDialog;

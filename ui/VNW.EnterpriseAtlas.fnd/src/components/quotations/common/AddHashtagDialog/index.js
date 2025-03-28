import React, { useState, useEffect} from 'react';
import HashtagInput from './HashtagInput';
import HashtagCloseButton from '../CloseButton';
import HashtagSubmitButton from '../SubmitButton';
import HashtagDisplayHeader from './HashtagDisplayHeader';
import { useTranslation } from 'react-i18next';

/**
 * Displays a dialog for adding a hashtag.
 * @param {*} param0 
 * @returns 
 */
const AddHashtagDialog = ({ open, onClose, onAdd, initialHashtag}) => {
    const [hashtag, setHashtag] = useState('');
    const { t } = useTranslation();

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
    
        // Xóa khoảng trắng thừa, ký tự đặc biệt và chuẩn hóa dấu #
        hashtag = hashtag.replace(/[\s\n\r\t]+/g, '').trim();
    
        // Tách chuỗi thành mảng dựa trên dấu #
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

    /**
     * Update the hashtag when the input changes
     * @param {*} e 
     * @returns 
     */
    const hashtagOnchange = (e) => {
        const hashtags = parseHashtags(e.target.value);
        if (hashtags.length > 5) {
            alert(t('quote_hashtag_over_limmit'));
            return;
        }
        setHashtag(e.target.value);
    }

    return (
        <div className="fixed inset-1 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-5 w-96 shadow-lg">
                <HashtagDisplayHeader />
                <HashtagInput hashtag={hashtag} event={(e) => hashtagOnchange(e)} />
                <div className="flex justify-end">
                    <HashtagCloseButton event={onClose} />
                    <HashtagSubmitButton event={submitHashtagEvent} />
                </div>
            </div>
        </div>
    );
};

export default AddHashtagDialog;

import React, { useState } from 'react';

/**
 * A component that represents a hashtag input.
 * @param {*} param0 
 * @returns 
 */
const HashtagInput = ({hashtag, event}) => {

    return (
        <textarea
            placeholder="Hashtags"
            value={hashtag}
            rows={3}
            onChange={event}
            maxLength={200}
            spellCheck="false"
            className="w-full p-2 mb-2 border border-gray-300 rounded resize-none h-20 text-[13px] font-sans"
        />
    );
};

export default HashtagInput;

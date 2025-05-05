import React from 'react';

/**
 * A button that closes the hashtag dialog.
 * @param {*} param0 
 * @returns 
 */
const CloseButton = ({event}) => {

    return (
        <button onClick={event} className="bg-gray-100 border border-gray-300 rounded px-4 py-1 mr-2 hover:bg-gray-200 text-[13px] font-sans">
            Cancel
        </button>
    );
};

export default CloseButton;

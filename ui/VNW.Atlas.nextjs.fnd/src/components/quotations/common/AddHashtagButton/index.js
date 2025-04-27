import { FaHashtag } from "react-icons/fa6";
import { useState } from "react";

/**
 * A component that represents a hashtag description.
 */
const AddHashtagButton = ({ description, event }) => {

    const handleSubmit = () => {
        if (event) {
            event();
        }
    };

    return (
        <div className="flex flex-col items-start gap-y-2 z-30">
            <div className="flex items-center gap-x-2">

                <button className="text-blue-500 text-xs underline" onClick={handleSubmit}>
                    <div className="flex items-center gap-x-1">
                        <FaHashtag size={12} />
                        Add Hashtag
                    </div>
                </button>
            </div>
        </div>
    );
};
export default AddHashtagButton;
import { useEffect, useRef } from "react";

/**
 * A component that represents a hashtag input.
 * @param {*} param0 
 * @returns 
 */
const HashtagInput = ({ hashtag, event, setAutoload}) => {
    const textareaRef = useRef(null);
    
    useEffect(() => {
        if (hashtag) {
            const textarea = textareaRef.current;
            const cursorPosition = textarea.selectionStart;

            event({ target: { value: hashtag } });

            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = cursorPosition;
            }, 0);
        }
    }, [hashtag]);

    const keydownHandler = (e) => {
        setAutoload(false);
    }

    return (
        <textarea
            ref={textareaRef}
            placeholder="Hashtags"
            value={hashtag}
            rows={3}
            onChange={event}
            onKeyDown={keydownHandler}
            maxLength={200}
            spellCheck="false"
            className="w-full p-2 border border-gray-300 rounded resize-none h-20 text-[13px] font-sans"
        />
    );
};

export default HashtagInput;

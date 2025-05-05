import { useRef} from "react";

/**
 * This component is used to display the above inserted button that will almost be put on the header bar
 * @param {*} param0 
 * @returns 
 */
const AboveInsertedButton = ({ callback, content, options:{icon: Icon, isFreezeed = false, additionalClasses = 'text-Black', iconAdditionalClass = ''}}) => {
    const timeoutRef = useRef(null);
    const handleClick = () => {
        if (!isFreezeed) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback && callback();
            }, 200); // Đợi 1 giây (1000ms) trước khi gọi callback
        }
    };
    return (
        <div>
            <button className={`mt-2 p-2 ${isFreezeed?' text-gray-400' : 'hover:bg-gray-100 hover:text-blue-600 hover:underline' } ${isFreezeed ? "" : additionalClasses}`
            }
                onClick={handleClick} disabled={isFreezeed}>
                <div className="flex items-end space-x-1">
                    <Icon className={`text-[18px] ${iconAdditionalClass}`} />
                    <p className="text-[12px]">{content}</p>
                </div>
            </button>
        </div>
    )
}

export default AboveInsertedButton

/**
 * Displays a selectable date button with a title on the top.
 * @param {*} param0 
 * @returns 
 */
const TopDateButton = ({ inputValue, handleChange, title }) => {

    return (
        <div>
            <div className="flex flex-col items-start border-b border-gray-300 gap-x-2 px-2 py-1 bg-white rounded-md opacity-75 hover:opacity-100">
                <span className="text-xs font-medium w-24 text-gray-400">{title}</span>
                <input
                    type="date"
                    value={inputValue}
                    onChange={handleChange}
                    className="flex-1 text-gray-800 text-xs outline-none bg-transparent px-1 py-1 border border-gray-400 rounded focus:ring-1 focus:ring-blue-400 w-40" />

            </div>
        </div>
    );
}

export default TopDateButton;

/**
 * A component that renders a checkbox input
 * @param {*} param0 
 * @returns 
 */
const CheckCustomButton = ({ checked, onChange }) => {
    return (
        <div className="flex items-center justify-start">
            <input type="checkbox" className="mr-2 hidden" />
            <div onClick={onChange}
                className={`w-4 h-4 min-h-4 min-w-4 flex items-center justify-center border border-gray-500 rounded-sm cursor-pointer transition-all ${checked ? "bg-green-500 text-white" : "bg-white"}`}>
                {checked && <p>✔</p>}
            </div>
        </div>
    );
};

export default CheckCustomButton;

const SelectBox = ({ header, object, defaultValue, callback }) => {
    return (
        <div className="block sm:flex items-center space-x-4 my-2 sm:mb-0">
            <label className="block font-sans text-sans mb-2 w-44 px-5 sm:px-0">{header}</label>

            <select className="text-[13px] font-sans w-80 px-2 py-1 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => callback(e.target.value)}>
                {object && object.map((item, index) => (
                    <option
                        key={index}
                        value={item.value}
                        selected={item.value === defaultValue}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectBox;
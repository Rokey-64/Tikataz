import { useEffect, useRef, useState} from "react";
import { IoSearch } from "react-icons/io5";

/**
 * When the search box is outside the toolbar, this component is used to display the search box. its usually used in the SM screen size
 * @returns 
 */
const OutSideSearch = ({ searchClick, value, onChange }) => {
    const inputRef = useRef(null);
    const [searchValue, setSearchValue] = useState(value);

    const inputOnchange = (e) => {
        setSearchValue(e.target.value);
        onChange && onChange(e);
    }


    useEffect(() => {
        // Focus on the search input when the component is mounted
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="flex items-center  border border-gray-300">

            <input
                type="search"
                placeholder="Search..."
                className="w-full h-8 pl-3 pr-3 outline-none rounded-none"
                ref={inputRef}
                value={value} onChange={inputOnchange}
            />
            <button className="rounded-full  hover:bg-gray-200 mx-1 mt-1 p-1" onClick={searchClick}>
                <IoSearch className="text-gray-500 " />
            </button>
        </div>
    );
}

export default OutSideSearch;
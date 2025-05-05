import React from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

/**
 * Enhanced Search Component with modern design
 * @param {Object} props - Component props
 * @param {Function} props.searchClick - Mobile search click handler
 * @param {string} props.value - Search input value
 * @param {Function} props.onChange - Input change handler
 * @returns {JSX.Element} Search component
 */
const InsideSearch = ({ searchClick, value, onChange }) => {
  return (
    <div className="mx-2 sm:mx-4 lg:mx-6">
      {/* Desktop Search */}
      <div className="hidden sm:block">
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="max-w-xl mx-auto"
        >
          <div className="relative flex items-center">
            {/* Search Icon */}
            <div className="absolute left-3 text-gray-400">
              <IoSearch className="w-5 h-5" />
            </div>

            {/* Search Input */}
            <input
              type="search"
              value={value}
              onChange={(event)=> onChange(event.target.value)}
              placeholder="Search for anything..."
              className="w-96 py-2.5 pl-10 pr-12  rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 shadow-sm hover:border-gray-300"
              aria-label="Search"
            />

            {/* Filter Button */}
            <button
              type="button"
              className="absolute right-2 flex items-center justify-center w-8 h-8 text-gray-500 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              aria-label="Filter options"
            >
              <MdOutlineFilterList className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Search Trigger */}
      <div className="block sm:hidden">
        <button
          onClick={searchClick}
          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
          aria-label="Search"
        >
          <IoSearch className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default InsideSearch;
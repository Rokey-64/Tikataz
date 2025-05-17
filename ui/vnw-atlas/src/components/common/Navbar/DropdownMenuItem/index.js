import { FaCaretDown } from "react-icons/fa";


// Dropdown Menu Item Component
const DropdownMenuItem = ({ icon, label, rightIcon, hasDropdown = false, onClick }) => (
  <button 
    className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
    onClick={onClick}
  >
    <div className="flex items-center">
      <span className="text-gray-500 dark:text-gray-400 mr-3">{icon}</span>
      {label}
    </div>
    {rightIcon && <span>{rightIcon}</span>}
    {hasDropdown && <FaCaretDown className="text-gray-500 dark:text-gray-400" />}
  </button>
);

export default DropdownMenuItem;
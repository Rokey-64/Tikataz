import React from 'react';
import { FaCaretDown } from 'react-icons/fa';

const MobileMenuItem = ({ icon, count, label, hasDropdown = false, onClick }) => (
  <div 
    className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <span className="text-gray-600 dark:text-gray-300">{icon}</span>
      <span className="text-gray-700 dark:text-gray-200">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      {count > 0 && (
        <span className={`text-xs rounded-full h-5 w-5 flex items-center justify-center 
          ${label === 'Notifications' ? 'bg-red-500' : 'bg-blue-500'} text-white`}>
          {count}
        </span>
      )}
      {hasDropdown && <FaCaretDown className="text-gray-500 dark:text-gray-400" />}
    </div>
  </div>
);


export default MobileMenuItem;
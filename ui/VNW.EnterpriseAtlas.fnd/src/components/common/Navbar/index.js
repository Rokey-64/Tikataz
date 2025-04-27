import React, { useState } from 'react';
import { FaBell, FaEnvelope, FaUserCircle, FaCaretDown, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const unreadNotifications = 3;
  const unreadMessages = 2;

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-sm md:px-6 md:py-4">
      {/* Mobile Menu Button (Hamburger) */}
      <button 
        className="md:hidden p-2 text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <FaBars className="text-xl" />
      </button>

      {/* Navigation Icons - Desktop */}
      <div className="hidden md:flex items-center space-x-6">
        <NotificationIcon count={unreadNotifications} />
        <MessageIcon count={unreadMessages} />
        <UserDropdown />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg py-2 z-50 md:hidden">
          <div className="flex flex-col space-y-4 px-4">
            <MobileMenuItem icon={<FaBell />} count={unreadNotifications} label="Notifications" />
            <MobileMenuItem icon={<FaEnvelope />} count={unreadMessages} label="Messages" />
            <MobileMenuItem icon={<FaUserCircle />} label="Account" hasDropdown />
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable Notification Icon Component
const NotificationIcon = ({ count }) => (
  <div className="relative">
    <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-blue-500 transition-colors" />
    {count > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {count}
      </span>
    )}
  </div>
);

// Reusable Message Icon Component
const MessageIcon = ({ count }) => (
  <div className="relative">
    <FaEnvelope className="text-gray-600 text-xl cursor-pointer hover:text-blue-500 transition-colors" />
    {count > 0 && (
      <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {count}
      </span>
    )}
  </div>
);

// Reusable User Dropdown Component
const UserDropdown = () => (
  <div className="flex items-center space-x-2 cursor-pointer group">
    <FaUserCircle className="text-gray-600 text-2xl" />
    <FaCaretDown className="text-gray-500 group-hover:text-blue-500 transition-colors" />
  </div>
);

// Mobile Menu Item Component
const MobileMenuItem = ({ icon, count, label, hasDropdown = false }) => (
  <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-md">
    <div className="flex items-center space-x-3">
      <span className="text-gray-600">{icon}</span>
      <span className="text-gray-700">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      {count > 0 && (
        <span className={`text-xs rounded-full h-5 w-5 flex items-center justify-center 
          ${label === 'Notifications' ? 'bg-red-500' : 'bg-blue-500'} text-white`}>
          {count}
        </span>
      )}
      {hasDropdown && <FaCaretDown className="text-gray-500" />}
    </div>
  </div>
);

export default Navbar;
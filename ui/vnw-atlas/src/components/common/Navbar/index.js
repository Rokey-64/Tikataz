import React, { useState, useRef, useEffect } from 'react';
import {
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaBars
} from 'react-icons/fa';

import MobileMenuItem from './MobileMenuItem';
import MessageIcon from './MessageIcon';
import NotificationIcon from './NotificationIcon';
import UserDropdownMenu from './UserDropdownMenu';
import UserDropdown from './UserDropdown';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [restrictedMode, setRestrictedMode] = useState(false);
  const unreadNotifications = 0;
  const unreadMessages = 0;

  // Thông tin người dùng
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: null
  };

  // Refs để xử lý click outside
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  // Xử lý click outside
  useEffect(() => {
    const handleClickOutside = (event) => {

      // Đóng mobile menu nếu click bên ngoài
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Toggle menu"]')) {
        setIsMobileMenuOpen(false);
      }

      // Đóng user dropdown nếu click bên ngoài
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target)) &&
        (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target))
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef.current]);

  const handleLogout = () => {
    setIsUserDropdownOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const toggleRestrictedMode = () => {
    setRestrictedMode(!restrictedMode);
  };

  // Đóng mobile menu khi mở user dropdown trên mobile
  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 dark:bg-gray-800 shadow-sm md:px-6 md:py-4 ">
      {/* Logo/Brand có thể thêm vào đây */}

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <FaBars className="text-xl" />
      </button>

      {/* Navigation Icons - Desktop */}
      <div className="hidden md:flex items-center space-x-6">
        <NotificationIcon count={unreadNotifications} />
        <MessageIcon count={unreadMessages} />
        <div ref={dropdownMenuRef}>
          <UserDropdown
            isOpen={isUserDropdownOpen}
            onToggle={handleUserDropdownToggle}
            user={user}
          />
        </div>
      </div>

      {/* User Dropdown Menu - Hiển thị trên cả mobile và desktop */}
      <div ref={dropdownRef}
        className={`absolute ${isUserDropdownOpen ? 'block' : 'hidden'}
         top-full right-0 mt-0 md:top-15 bg-white dark:bg-gray-800 shadow-xl rounded-lg z-50`}
      >
        <UserDropdownMenu
          user={user}
          darkMode={darkMode}
          language={language}
          restrictedMode={restrictedMode}
          onToggleDarkMode={toggleDarkMode}
          onChangeLanguage={changeLanguage}
          onToggleRestrictedMode={toggleRestrictedMode}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Menu */}
      {
        isMobileMenuOpen && (
          <div
            className={`absolute md:hidden top-full right-0 left-0 bg-white dark:bg-gray-800 shadow-lg py-2 z-50`}
          >
            <div className="flex flex-col space-y-4 px-4">
              <MobileMenuItem
                icon={<FaBell />}
                count={unreadNotifications}
                label="Notifications"
              />
              <MobileMenuItem
                icon={<FaEnvelope />}
                count={unreadMessages}
                label="Messages"
              />
              <MobileMenuItem
                icon={<FaUserCircle />}
                label="Account"
                hasDropdown
                onClick={handleUserDropdownToggle}
              />
            </div>
          </div>
        )
      }


    </nav>
  );
};

export default Navbar;
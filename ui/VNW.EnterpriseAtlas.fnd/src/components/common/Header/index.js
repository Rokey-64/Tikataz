import React from "react";
import Breadcrumb from "../Breadcrumb";
import Navbar from "../Navbar";
import TikatazLogo from "../TikatazLogo";


/**
 * Create a header for the studio
 * @param {*} param0 
 * @returns 
 */
const Header = ({ headerContent }) => {
    return (
      <div className="bg-white shadow sticky top-0 z-50">
        {/* Xóa container, thay bằng px-4 trực tiếp */}
        <div className="px-4"> {/* Hoặc px-6 nếu muốn padding rộng hơn */}
          <div className="flex items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 mr-4">
              <TikatazLogo />
            </div>
  
            {/* Breadcrumb (tự động co giãn) */}
            <div className="hidden md:flex items-center flex-1 min-w-0 px-4 overflow-x-auto">
              <Breadcrumb headerContent={headerContent} />
            </div>
  
            {/* Navbar - Đẩy sang phải hoàn toàn */}
            <div className="flex-shrink-0 ml-auto"> 
              <Navbar />
            </div>
          </div>
  
          {/* Mobile Breadcrumb */}
          <div className="md:hidden py-2 border-t border-gray-200">
            <Breadcrumb headerContent={headerContent} />
          </div>
        </div>
      </div>
    );
  };

export default Header;
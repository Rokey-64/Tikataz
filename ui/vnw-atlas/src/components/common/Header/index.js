'use client'
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
      <div className="bg-white shadow sticky top-0 z-50 ">
        <div className="px-4">
          <div className="flex items-center h-16">
            <div className="flex-shrink-0 mr-4">
              <TikatazLogo />
            </div>
  
            <div className="hidden md:flex items-center flex-1 min-w-0 px-4 overflow-x-auto">
              <Breadcrumb headerContent={headerContent} />
            </div>
  
            <div className="flex-shrink-0 ml-auto"> 
              <Navbar />
            </div>
          </div>
  
          <div className="md:hidden py-2 border-t border-gray-200">
            <Breadcrumb headerContent={headerContent} />
          </div>
        </div>
      </div>
    );
  };

export default Header;
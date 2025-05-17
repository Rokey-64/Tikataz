import React, { useRef, useState } from "react";
import './leftMenu.css';
import ExpandLeftMenu from "./ExpandLeftMenu.cjs";

import { CgMenuGridR } from "react-icons/cg";
import { IoCloseCircleSharp } from "react-icons/io5";

const LeftMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClick = () => setIsOpen(!isOpen);
    const devOnClick = () => setIsOpen(false);
    return (
        <>
            <div className="hidden lg:block">
                <ExpandLeftMenu />
            </div>

            {
                isOpen ?
                    <div className="flex -mt-2">
                        <ExpandLeftMenu />
                        <div className="w-svw h-svw opacity-65 bg-[#181717cc]" onClick={devOnClick}>
                            <div className="fixed top-16 right-0 block lg:hidden">
                                <button onClick={onClick} className="p-2">
                                    <IoCloseCircleSharp className="text-2xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="fixed bottom-0 block lg:hidden">
                        <button onClick={onClick} className="p-2">
                            <CgMenuGridR className="text-2xl" />
                        </button>
                    </div>
            }
        </>
    );
};

export default LeftMenu;

import React, { useState } from "react";
import StudioHeader from "../StudioHeader";
import "./index.css";

import { Tooltip } from 'react-tooltip';
import LeftMenu from "../LeftMenu";
import { Outlet } from "react-router-dom";

const StudioLayout = () => {
    const [headerContent, setHeaderContent] = useState('');

    return (
        <div className="bg-[#502323] inset-0" style={{ fontFamily: "'Roboto', sans-serif" }}>
            {/* Header */}
            <div className="fixed top-0 w-full z-50">
                <StudioHeader headerContent={headerContent} />
            </div>

            <div className="grid grid-flow-col grid-cols-[4fr_4fr] pt-10">
                <div className="fixed top-[3rem] left-0 bg-white z-10">
                    <LeftMenu setHeaderContent={setHeaderContent} />
                </div>
                <div className="fixed top-[3rem] left-0 ml-3 pl-1">
                    <Tooltip
                        id="edit-tooltip"
                        place="bottom"
                        noArrow={false}
                        className="z-30 bg-[rgb(235,234,234)] text-[10px]"
                        style={{ backgroundColor: "rgb(235,234,234)", color: "#222" }}
                        delayShow={300}
                    />
                    <div className="md:ml-56">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudioLayout;

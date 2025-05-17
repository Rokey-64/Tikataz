'use client';

import React, { useState } from "react";
import Header from "../Header";
import "./index.css";

import { Tooltip } from 'react-tooltip';

const CardLayout = ({children}) => {
    const [headerContent, setHeaderContent] = useState('');

    return (
        <div style={{ fontFamily: "'Roboto', sans-serif" }}>
            {/* Header */}
            <div className="fixed top-0 w-full z-50">
                <Header headerContent={headerContent} />
            </div>

            <div className="grid grid-flow-col grid-cols-[4fr_4fr] pt-10">
                <div className="fixed top-[5rem] md:top-[4rem]">
                    <Tooltip
                        id="edit-tooltip"
                        place="bottom"
                        noArrow={false}
                        className="z-30 bg-[rgb(235,234,234)] text-[10px]"
                        style={{ backgroundColor: "rgb(235,234,234)", color: "#222" }}
                        delayShow={300}
                    />
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardLayout;

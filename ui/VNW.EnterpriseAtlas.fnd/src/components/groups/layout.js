import React from "react";
import Toolbar from "../toolbar/toolbar";
import CustomCard from "../items/cards/customeCard";
import LeftMenu from "../menu/leftMenu";

// Layout component that wraps around all atlas pages
const Layout = () => {
    return (
        <div className="bg-[#f2f2f2] w-full overflow-x-hidden " style={{ fontFamily: "'Roboto', sans-serif" }}>
            <div className="fixed top-0 w-full z-10 "><Toolbar /></div>
            <div className="flex items-start justify-center ">
                
                <div className="fixed top-[4.1rem] left-0 z-10 "><LeftMenu/></div>

                <div className="mt-28 mr-3 flex justify-center">
                    <div>{/**News*/}</div>
                    <div>
                        {
                            Array(10).fill().map((_, i) => (
                                <div className="m-2 mb-5" key={i}>
                                    <CustomCard />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Layout;
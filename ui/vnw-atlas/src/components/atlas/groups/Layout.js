import Toolbar from "../toolbar/toolbar";
import SubLayout from "./SubLayout";
import LanguageSelector from "@/components/common/LanguageSelector";
import getAtlasCardAPI from "@/api/getAtlasCard";


// Layout component that wraps around all atlas pages
const Layout = async () => {

    const serverCards = await getAtlasCardAPI("", "manual", undefined, undefined, "ssr");

    return (
        <div className="bg-[#f2f2f2] w-fix overflow-x-hidden font-sans">
            <LanguageSelector />

            <div className="fixed top-0 w-full z-10" ><Toolbar /></div>

            <div className="flex items-start justify-center">
                <SubLayout serverCards={serverCards} />
            </div>
        </div>
    );
};

export default Layout;
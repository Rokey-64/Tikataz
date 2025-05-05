import { MdCenterFocusWeak } from 'react-icons/md';
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BiSolidContact } from "react-icons/bi";
import { BiLinkAlt } from "react-icons/bi";
import LeftTool from './leftTool/leftTool';

/**
 * This component is used to display the left toolbox.
 * @returns 
 */
const LeftToolBox = () => {
    return (
        <div>
            <div className='m-1'>
                <LeftTool icon={<BiSolidContact className='size-5 sm:size-6 text-[#3E69D8]'/>} />
            </div>
            <div className='m-1'>
                <LeftTool icon={<HiChatBubbleLeftRight className='size-5 sm:size-6'/>} />
            </div>
            <div className='m-1'>
                <LeftTool icon={<BiLinkAlt className='size-5 sm:size-6 text-[#978225]'/>} />
            </div>
        </div>
    );
};

export default LeftToolBox;
import { IoClose } from "react-icons/io5";
import RightChildrenBox from "../../common/RightChidrenBox";
import { throttle } from 'lodash';
import { useTranslation } from "react-i18next";

/**
 * This container contains a form that can be used to input data.
 * ** they wil be fixed on the right side of the page **
 * @param {*} param0 
 * @returns 
 */
const FeedbackContainer = ({ children, saveCallback, closeCallback }) => {
    const { t } = useTranslation();
    const TIME_INTERVAL = 3000;

    /**
     * This function will be called when the user click on the close button
     */
    const closeHandleClick = () => {
        closeCallback && closeCallback();
    };

    /**
     * Throttled sendHandleClick function
     */
    const throttledHandleClick  = throttle(() => {
        saveCallback && saveCallback();
    }, TIME_INTERVAL, { trailing: false });
    /**
     * This function will be called when the user click on the send button
     * @returns
     */
    const sendHandleClick = () => {
        throttledHandleClick();
    };

    return (
        <div className="absolute top-2 right-2  w-fit shadow-xl bg-[#ffffff] z-50">
            <div className="flex items-start justify-startshadow-sm w-full">
                <div className='mt-6 w-96 ml-3 font-semibold text-[#333]'> 
                    <h1>{t("feedback_header")}</h1>
                </div>
                <div className='flex justify-end items-start w-full  pt-2 pb-4 '>
                    <button className=" hover:text-red-600  text-black opacity-50 hover:opacity-100 sticky w-8 h-8 top-0 right-0" onClick={closeHandleClick}>
                        <IoClose className='text-2xl' />
                    </button>
                </div>
            </div>
            <hr />
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-11rem)] min-h-[calc(100vh-11rem)] flex  shadow-xl bg-gradient-to-t from-[#ffffff] to-[#f5f9fc]">
                <div className="sm:min-w-[480px] sm:max-w-[480px] mx-2">
                    <RightChildrenBox children={children} />
                    <div className="h-16"/>
                </div>
            </div>
            <div className="flex justify-end items-start shadow-sm sticky bottom-0 bg-[#eaf3fa] py-3 pr-2 gap-3">
                <button className="bg-white text-black border border-black font-medium w-24 h-8 rounded hover:bg-gray-100 focus:outline-none"
                   onClick={sendHandleClick} >
                    gửi
                </button>
            </div>
        </div>
    )
};

export default FeedbackContainer
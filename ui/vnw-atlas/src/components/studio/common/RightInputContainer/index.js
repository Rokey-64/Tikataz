import { TfiSave } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import RightChildrenBox from "../RightChidrenBox";
import { throttle } from 'lodash';
import { useTranslations } from "next-intl";


/**
 * This container contains a form that can be used to input data.
 * ** they wil be fixed on the right side of the page **
 * @param {*} param0 
 * @returns 
 */
const RightInputContainer = ({ children, closeCallback, saveCallback }) => {
    const t = useTranslations('trans');
    const TIME_INTERVAL = 3000;
    const closeHandleClick = () => {
        closeCallback && closeCallback(false);
    };

    /**
     * Throttled sendHandleClick function
     */
    const throttledHandleClick = throttle(() => {
        saveCallback && saveCallback();
    }, TIME_INTERVAL, { trailing: false });

    const saveHandleClick = () => {
        throttledHandleClick();
    };

    return (
        <div className="absolute top-14 md:top-5 right-0 md:right-3 w-fit shadow-xl bg-[#e1effa] z-[50]">
            <div className="grid grid-cols-2 gap-3 shadow-sm">
                <div className='flex justify-start pt-5 shadow-sm '>
                    <button
                        onClick={saveHandleClick}
                        type="submit"
                        className="hover:bg-gray-100 hover:text-blue-600 hover:underline text-black">
                        <div className='flex items-center space-x-2 p-2 text-sm' >
                            <TfiSave className="inline-block text-xl" />
                            <p className='ml-2'>{t("save")}</p>
                        </div>
                    </button>
                </div>
                <div className='flex justify-end items-start shadow-sm '>
                    <button className=" hover:text-red-600  text-black opacity-50 hover:opacity-100 sticky w-8 h-8 top-0 right-0" onClick={closeHandleClick}>
                        <IoClose className='text-2xl' />
                    </button>
                </div>

            </div>
            <hr />
            <div className="p-6 overflow-y-auto flex  shadow-xl bg-gradient-to-t from-[#ffffff] to-[#cbe1f1] 
                            max-h-[calc(100vh-10rem)] min-h-[calc(100vh-10rem)]
                            md:max-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-8rem)]">
                <div className="md:min-w-[450px] md:max-w-[450px] w-full mb-40">
                    <RightChildrenBox>
                        {children}
                    </RightChildrenBox>
                    <div className="h-40"/>
                </div>
            </div>
        </div>
    )
};

export default RightInputContainer
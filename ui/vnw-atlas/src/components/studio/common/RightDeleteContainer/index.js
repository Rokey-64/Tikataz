import { IoClose } from "react-icons/io5";
import { RiFileShield2Fill } from "react-icons/ri";
import RightChildrenBox from "../RightChidrenBox";
import { throttle } from 'lodash';
import { useTranslations } from "next-intl";

/**
 * /**
 * This container contains a form that can be used to delete selected data.
 * ** they wil be fixed on the right side of the page **
 * @param {*} headerContent - The header content of the container
 * @param {*} children - The content of the container
 * @param {*} state - The state of the container 
 * @param {*} setState - The function to update the state
 * @param {*} callback - The function to be called when the delete button is clicked
 * @returns 
 */
const RightDeleteContainer = ({ headerContent, children, state, setState, callback = null }) => {
    const t = useTranslations('trans');
    const TIME_INTERVAL = 3000;

    const closeHandleClick = () => {
        setState({ ...state, state: "" });
    };

    /**
     * Throttled sendHandleClick function
     */
    const throttledHandleClick = throttle(() => {
        callback && callback();
    }, TIME_INTERVAL, { trailing: false });

    const deleteHandleClick = () => {
        throttledHandleClick();
    };

    return (
        <div className="absolute top-14 md:top-5 right-0 md:right-3 w-fit max-w-[480px] shadow-xl z-50 bg-[#eaf3fa]">
            <div >
                <div className="grid grid-cols-2 gap-3 pl-3 " >
                    <div className='flex justify-start pt-5 h-14'>
                        {headerContent}
                    </div>
                    <div className='flex justify-end items-start'>
                        <button className=" hover:text-red-600  text-black opacity-50 hover:opacity-100 sticky w-8 h-8 top-0 right-0" onClick={closeHandleClick}>
                            <IoClose className='text-2xl' />
                        </button>
                    </div>
                </div>

            </div>
            <div className="mt-6 
                            sm:min-w-[480px] sm:max-w-[480px]  
                            min-h-[calc(100vh-10rem)] max-h-[calc(100vh-10rem)]
                            md:max-h-[calc(100vh-10rem)] md:min-h-[calc(100vh-10rem)]">
                <RightChildrenBox>
                    <>
                        <div className="px-2">
                            {children}
                        </div>
                        <div className="mt-3 mb-2">
                            <p className="px-4 my-3 text-sm font-semibold">{t("list_delete_object")}</p>
                            <hr />
                        </div>
                        <div className="px-4 overflow-y-auto max-h-[calc(100vh-26rem)] min-h-[calc(100vh-26rem)] flex bg-gradient-to-t from-[#ffffff] to-[#eaf3fa]">
                            <div>
                                {
                                    state?.currentObjects && state.currentObjects.map((item, index) => (
                                        <div className="flex items-start space-x-2 p-1 text-sm font-sans" key={index}>
                                            <RiFileShield2Fill className="w-5 h-5 text-[#689ccf]" />
                                            <span>{item.name}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                </RightChildrenBox>
            </div>

            <div className="flex justify-end items-start shadow-sm sticky bottom-0 bg-[#eaf3fa] py-3 pr-2 gap-3 ">
                <button
                    className="bg-red-500 text-white font-medium w-32 h-8 rounded hover:bg-red-600 focus:outline-none"
                    onClick={deleteHandleClick}
                >
                    {t("delete")}
                </button>
                <button
                    className="bg-white text-black border border-black font-medium w-32 h-8 rounded hover:bg-gray-100 focus:outline-none"
                    onClick={closeHandleClick}
                >
                    {t("cancel")}
                </button>
            </div>
        </div>
    )
};

export default RightDeleteContainer
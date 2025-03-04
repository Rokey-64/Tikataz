import { MdDeleteSweep } from "react-icons/md";

/**
 * This component is used to show the remove certificate button
 * @param {*} param0
 */
const RemovePartnerButton = ({ callback}) => {
    const deleteCertHandler = () => {
        callback && callback();
    }

    return (
        <div className="absolute md:top-8 md:left-[4rem] p-1 flex items-center justify-center w-8 h-8 pl-1">
            <button className=" text-red-500 hover:text-red-600 transform scale-100 hover:scale-110" onClick={deleteCertHandler}>
                <MdDeleteSweep className="text-xl" />
            </button>
        </div>
    );
};

export default RemovePartnerButton;
import { MdLibraryAdd } from "react-icons/md";

/**
 * This component is a button that shows a certification selector when clicked
 * @returns 
 */
const SelCertificationButton = ({callback}) => {
    return (
        <div className="flex items-center gap-4">
            <p className="font-semibold text-lg text-gray-700">Chứng chỉ, chứng nhận</p>
            <button className="flex items-center gap-2" onClick={() => callback&&callback()}>
                <MdLibraryAdd className="text-2xl text-gray-600 hover:text-blue-500 animate-bounce hover:animate-none" />
            </button>
        </div>
    );
};

export default SelCertificationButton;
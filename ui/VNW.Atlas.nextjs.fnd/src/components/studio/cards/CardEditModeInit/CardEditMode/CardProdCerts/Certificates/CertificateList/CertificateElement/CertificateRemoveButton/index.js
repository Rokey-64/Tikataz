import { MdDeleteSweep } from "react-icons/md";

/**
 * This component is used to show the remove certificate button
 * @param {*} param0
 */
const CertificateRemoveButton = ({ callback }) => {
    const deleteCertHandler = () => {
        callback&&callback();
    }

    return (
        <div className="flex justify-end">
        <button className="flex items-center gap-2 mt-4 text-red-500 hover:text-red-600" onClick={deleteCertHandler}>
            <MdDeleteSweep className="text-2xl" />
            Xóa chứng chỉ
        </button>
    </div>
    );
};

export default CertificateRemoveButton;
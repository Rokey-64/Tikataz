import { useRef, useEffect } from "react";
import { IoDocumentAttach } from "react-icons/io5";
import { TiAttachmentOutline } from "react-icons/ti";
import { nanoid } from "nanoid";
import { useTranslations } from "next-intl";


/**
 * A component that represents a file attachment button.
 * @returns 
 */
const FileAttachmentButton = ({ fileName, onChange }) => {
    const t = useTranslations('trans');
    const fileInputRef = useRef(null);

    useEffect(() => {
        fileInputRef.current = nanoid();
    }, []);


    const inputChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const maxSize = 1 * 1024 * 1024;
        if (file.size > maxSize) {
            alert(t("file_over_size_1mb"));
            return;
        }

        onChange && onChange(file);
    };



    return (
        <div className="flex items-center gap-x-2" data-tooltip-id="pricing-tooltip" data-tooltip-content={`${fileName || t("no_attach_file")}`}>
            <label htmlFor={`pricing_id_${fileInputRef.current}`} className="relative flex items-center justify-center cursor-pointer group  animate-bounce hover:animate-none">
                <div className="absolute w-6 h-6 bg-blue-100 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {
                    fileName ? (
                        <IoDocumentAttach className="text-xl text-blue-400 relative z-10 group-hover:text-blue-800 transition-colors duration-300" />
                    ) : (
                        <TiAttachmentOutline className="text-xl text-gray-400 relative z-10 group-hover:text-blue-800 transition-colors duration-300" />
                    )
                }
            </label>

            <input type="file" className="hidden" id={`pricing_id_${fileInputRef.current}`}
                onChange={inputChange}
                accept=".pdf"
            />
        </div>
    );
};

export default FileAttachmentButton;
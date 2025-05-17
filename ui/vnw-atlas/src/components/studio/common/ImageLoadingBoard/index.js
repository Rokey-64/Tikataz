import { useState } from "react";
import CompressImage from "@/services/compressImage";

/**
 * Use for loading a local image
 */
const ImageLoadingBoard = ({label="Select image", aditionalClasses="", callback, defaultValue}) => {
    const [imgPath, setImgPath] = useState(defaultValue || '/placeholder.jpg');
    
    const labelOnClick = async (e) => {
        const file = e.target.files[0];
        let compressOptions = {
            maxSizeMB: 0.3,
            maxWidthOrHeight: undefined,
            useWebWorker: true,
            initialQuality: 0.8
        };

        if (file) {
            const imgUrl = await CompressImage(file, compressOptions);
            if (imgUrl) {
                URL.revokeObjectURL(imgPath);
                setImgPath(imgUrl);
                callback && callback(imgUrl);
            }
        }
        e.target.value = null;
    };


    return (
        <div className="border border-gray-300 rounded-md m-1">
            <div className={aditionalClasses}>
                <img src={imgPath} alt="Company Logo" className="p-1 object-contain w-full h-full" onError={(e) => { e.target.src = "/placeholder.jpg" }}/>
            </div>
            <div className="flex items-center justify-center">
                <label className="text-sm text-gray-600 mr-1 cursor-pointer hover:text-blue-600 underline" htmlFor="logo-upload">{label}</label>
                <input type="file" id="logo-upload" className="hidden" onChange={labelOnClick}/>
            </div>
        </div>
    )
};

export default ImageLoadingBoard;
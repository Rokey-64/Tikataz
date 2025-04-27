import CompressImage from "../../../../services/compressImage";

/**
 * This component is used for inserting a logo
 * @param {*} param0 
 * @returns 
 */
const InsertLogo = ({logoPath, callback}) => {
    const handleFileInput = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imgUrl = await CompressImage(file, null);
            if (imgUrl) {
                URL.revokeObjectURL(logoPath);
                callback&&callback(imgUrl);
            }
        }
    };

    return (
        <div className="mr-4 border rounded p-2 shadow-sm">
            <div className="flex items-center justify-center min-w-[150px] max-w-[150px] h-[130px]  rounded-2xl bg-white shadow m-2 sm:m-3 border border-blue-200">
                <img
                    src={logoPath || "/placeholder.jpg"}
                    alt="Company Logo"
                    className="max-w-full max-h-full object-contain p-1 "
                    onError={(e) => { e.target.src = "/placeholder.jpg" }}
                />
            </div>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="logo-upload"
            />
            <label
                htmlFor="logo-upload"
                className="cursor-pointer text-sm text-blue-500 underline mt-2 block text-center"
            >
                Chọn ảnh
            </label>
        </div>
    )
};

export default InsertLogo;

/***
 * Display certificate icon
 * @param {string} path - Path to the certificate icon
 */
const CertificatesDisplayIcon = ({ path }) => {
    return (
        <div className="w-6 h-6 flex items-center justify-center hover:transform hover:scale-[2.1] transition-transform
            hover:bg-gray-300 hover:bg-opacity-60 hover:p-1 rounded-md cursor-pointer
        ">
            <img src={path} alt="cert" />
        </div>
    )
};

export default CertificatesDisplayIcon;
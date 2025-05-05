import { useState, useEffect} from "react";
/**
 * Display the searching result
 * @param {*} param0 
 * @returns 
 */
const CertificatesSearchingResultDisplay = ({ searchCerts, searchTerm, isFocused, callback }) => {
    const [cert, setCert] = useState(null);

    const buttonCLickHandler = (cert) => {
        setCert(cert);
    };

    useEffect(() => {
        callback && callback(cert);
    }, [cert]);

    if (!isFocused) return null;
    if ((!searchCerts.length && !searchTerm)) return null;

    return (
        <div id="search-dropdown" className="absolute left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-50  py-2 h-[300px] overflow-y-auto">
            <div className="my-3 px-2">
                <p className="text-[14px]">Searching for: <span className="font-medium text-blue-600 text-[14px]">{searchTerm || "Nothing yet"}</span></p>
            </div>
            <div className="grid grid-cols-1">
                {searchCerts.map((cert, id) => (
                    <button key={id} className="col-span-1 py-2 hover:bg-blue-200" onClick={() => buttonCLickHandler(cert) }>
                        <div className="flex gap-2 items-center justify-start px-2">
                            <img src={`/cert/${cert.path}`} alt="Certificate" className="w-6 h-6" />
                            <label className="font-medium text-[14px] text-left">
                                {cert.name}
                            </label>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CertificatesSearchingResultDisplay;
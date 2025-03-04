import { useState, useCallback, useEffect, useRef} from "react";
import debounce from "lodash.debounce";
import DisplaySearching from "./displaySearching";

const CertSeaching = ({ certificates, setFormData}) => {
    const [searchCerts, setSearchCerts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    /**
     * Debounce function to prevent the search function to run too many times
     */
    const debouncedSearch = useCallback(debounce((certificates, value) => {
        if (!value || value.length < 2) {
            setSearchCerts([]);
            return;
        }
        const valuesArray = Object.values(certificates);
        const lowcaseValue = value.toLowerCase();

        const nCerts = valuesArray.filter((cert) => {
            const certName = cert.name.toLowerCase();
            const certPath = cert.path.toLowerCase();

            // Check if the value is in the certificate name or path
            if (certName.includes(lowcaseValue) || certPath.includes(lowcaseValue)) {
                return cert;
            }
        }).slice(0, 3);;

        setSearchCerts(nCerts);
    }, 1000), [searchTerm]);

    /**
     * Rasing when the user type in the search box
     * @param {*} e 
     */
    const searchCertHandler = (e) => {
        setSearchTerm(e.target.value);
        debouncedSearch(certificates, e.target.value);
    };

    /**
     * Hiding the suggession box when the user click outside
     * @param {*} event 
     * @returns 
     */
    const hideSearching = (event) => {
        if (event.relatedTarget && event.relatedTarget.closest("#search-dropdown")) {
            return;
        }
        setIsFocused(false);
    };

    /**
     * Call when the user select a certificate
     * @param {*} cert - The selected certificate
     */
    const displayCallback = (cert) => {
        if(!cert) return;
        setFormData((prev) => {
            return {
                ...prev,
                certype: cert.name,
            };
        });
        setIsFocused(false);
    };

    return (
        <div className="relative">
            <div className="mb-1">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={searchCertHandler}
                    onFocus={() => setIsFocused(true)}
                    onBlur={hideSearching}
                    placeholder="Tìm kiếm chứng chỉ, chứng nhận hoặc chọn biểu tượng icon ở dưới"
                    className="w-full p-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[12px]"
                />
            </div>
            <DisplaySearching searchCerts={searchCerts} searchTerm={searchTerm} isFocused={isFocused} callback={displayCallback}/>
        </div>
    );
};

export default CertSeaching;
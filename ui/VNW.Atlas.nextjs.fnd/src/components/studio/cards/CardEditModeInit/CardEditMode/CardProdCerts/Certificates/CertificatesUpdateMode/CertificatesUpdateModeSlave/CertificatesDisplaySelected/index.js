
/**
 * The selected certificate display component
 * @param {*} param0 
 * @returns 
 */
const CertificatesDisplaySelected = ({ selectedCert}) => {
    return (
        <div className="mb-4 flex  gap-2">
            <div className="border border-gray-300 rounded shadow-sm  p-2">
                <img src={`/cert/${selectedCert ? selectedCert.path : ""}`} alt="Certificate" className="w-12 h-12" />
            </div>
            <p className="font-medium text-[12px]">{selectedCert && selectedCert.name}</p>
        </div>
    );
};

export default CertificatesDisplaySelected;
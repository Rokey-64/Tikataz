
/**
 * Display certificate provider
 * @param {*} param0 
 * @returns 
 */
const CertificatesProvider = ({ cert }) => {
    return (
        <div className="mb-2">
            <span className="font-medium">Tổ chức cấp: </span> {cert.certProvider || "(Chưa có thông tin)"}
        </div>
    );
};

export default CertificatesProvider;
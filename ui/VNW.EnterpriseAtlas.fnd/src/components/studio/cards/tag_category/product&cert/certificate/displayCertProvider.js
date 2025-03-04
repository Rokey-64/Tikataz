
/**
 * Display certificate provider
 * @param {*} param0 
 * @returns 
 */
const DisplayCertProvider = ({ cert }) => {
    return (
        <div className="mb-2">
            <span className="font-medium">Tổ chức cấp: </span> {cert.certProvider || "(Chưa có thông tin)"}
        </div>
    );
};

export default DisplayCertProvider;
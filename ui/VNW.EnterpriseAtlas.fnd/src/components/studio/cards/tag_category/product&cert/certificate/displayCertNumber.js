
/**
 * Display the certificate number
 * @param {*} param0 
 * @returns 
 */
const DisplayCertNumber = ({ cert }) => {
    return (
        <div className="mb-2">
        <span className="font-medium">Số chứng chỉ: </span> {cert.certCode || "(Chưa có thông tin)"}
    </div>
    );
};

export default DisplayCertNumber
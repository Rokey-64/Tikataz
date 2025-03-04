
/**
 * Display certificate time
 * @param {*} param0 
 * @returns 
 */
const DisplayCertTime = ({ cert }) => {
    return (
        <div className="mb-2">
            <span className="font-medium">Thời gian hiệu lực: </span>
            {cert.certValidDate ? `${cert.certValidDate} - ${cert.certExpiredDate || "(Không xác định)"}` : "(Chưa có thông tin)"}
        </div>
    );
};

export default DisplayCertTime;
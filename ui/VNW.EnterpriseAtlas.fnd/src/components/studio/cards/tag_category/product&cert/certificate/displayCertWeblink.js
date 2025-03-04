/**
 * Display the website link of the certificate
 * @param {*} param0 
 * @returns 
 */
const DisplayCertWeblink = ({ cert }) => {
    return (
        <div>
            <span className="font-medium">Website: </span>
            {cert.certWeblink ? (
                <a href={cert.certWeblink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {cert.certWeblink}
                </a>
            ) : (
                " (Chưa có thông tin)"
            )}
        </div>
    );

};

export default DisplayCertWeblink;
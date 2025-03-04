import certsTemplate from "../../../../../../services/certTemplate";

const DisplayCertLogo = ({ cert }) => {

    // Get certificate path by name
    const getCertPath = (name) => {
        const obj = certsTemplate.find((cert) => {
            if (cert.name === name) {
                return cert;
            }
        });

        if (obj)
            return obj.path;
    }

    return (
        <div className="flex items-center space-x-2 mb-4">
            <img
                src={`/cert/${getCertPath(cert.certype)}`}
                alt=""
                className="w-8 h-8 object-contain"
            />
            <span className="font-semibold text-base">{cert.certype || "Tên chứng chỉ"}</span>
        </div>
    );

};

export default DisplayCertLogo;
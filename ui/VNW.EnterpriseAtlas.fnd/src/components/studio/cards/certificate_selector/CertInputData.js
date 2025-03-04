/**
 * This component is used to input the certificate number
 * @param {*} param0 
 * @returns 
 */
const CertInputData = ({value, callback, placeholder, name, type}) => {
    return (
        <input
            type={type || "text"}
            name={name}
            value={value}
            onChange={callback}
            placeholder={placeholder}
            className="p-1 text-[12px] border border-gray-300 rounded shadow-sm"
        />
    );
};

export default CertInputData;
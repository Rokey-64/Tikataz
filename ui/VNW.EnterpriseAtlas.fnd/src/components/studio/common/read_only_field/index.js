const InfoField = ({ label, value }) => {
    return (
      <div className="flex text-[13px] leading-tight font-sans">
        <span className={`${label ? "w-28 text-gray-600" : "hiden" }`}>{label}</span>
        <span className="text-gray-700">
          {value}
        </span>
      </div>
    );
  };
  
  export default InfoField;
  
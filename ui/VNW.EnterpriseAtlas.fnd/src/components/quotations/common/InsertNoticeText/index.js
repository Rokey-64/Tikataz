
/**
 * This component is used to display the notice text as a standard format
 * @param {*} param0 
 * @returns 
 */
const InsertNoticeText = ({ header, content }) => {
    return (
        <div className="font-sans text-wrap mt-2">
            <h3 className="font-semibold mb-2 text-[14px] text-[#a2a2a2]">{header}</h3>
            <label className="block mb-2 text-[13px] text-[#a2a2a2]">
                {content}
            </label>
        </div>
    );
};

export default InsertNoticeText;
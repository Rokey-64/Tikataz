

const CustomerItemDisplay = ({ title, content }) => {

    return (
        <div className="flex items-center mb-1 font-sans text-[14px]">
            <p className="mr-3 w-[120px] font-sans">{title}</p>
            <p className="mr-3 min-w-[120px] font-sans">{content}</p>
        </div>
    );
};

export default CustomerItemDisplay;
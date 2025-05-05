
/**
 * Display the header title
 * @param {*} param0 
 */
const HeaderDisplay = ({ title, mode }) => {
    return (
        <div>
            <h1 className="text-xl font-extrabold text-black">{title}</h1>
        </div>
    );
};

export default HeaderDisplay;
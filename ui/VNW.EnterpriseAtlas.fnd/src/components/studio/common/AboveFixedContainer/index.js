
/**
 * This container contains the fixed header bar on the top side
 * ** Header Bar is a collection of buttons and some content to help client control the page ** 
 * @param {*} param0 
 * @returns 
 */
const AboveFixedContainer = ({ children }) => {
    return (
        <div className="sticky top-0 flex justify-between items-center bg-white shadow-sm md:w-[calc(100vw-270px)] ">
            {children}
            <hr className="mb-2" />
        </div>
    );
};

export default AboveFixedContainer;
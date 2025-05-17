
/**
 * Display customer avatar
 * @param {*} param0 
 * @returns 
 */
const CustomerAvatar = ({ avatar, display}) => {
    const bgStyle = {
        backgroundImage: `url(${avatar || "/placeholder.jpg"})`,
        backgroundSize: "contain"
    };
    
    return (
        <div className="flex justify-center w-[60px] sm:w-40 h-[60px] sm:h-24 rounded-md sm:rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={bgStyle} />
            {display && (
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-md sm:rounded-2xl" />
            )}
        </div>
    );
};

export default CustomerAvatar;
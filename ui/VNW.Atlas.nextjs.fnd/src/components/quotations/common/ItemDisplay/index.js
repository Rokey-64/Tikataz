
/**
 * Display the image of the item
 * @param {*} param0 
 * @returns 
 */
const ItemDisplay = ({ path }) => {
    return (
        <div className="flex justify-center items-center w-16 h-20 shadow-md overflow-hidden 
        hover:brightness-110 transition duration-300">
            <img
                src={path || "/placeholder.jpg"}
                onError={(e) => e.target.src = "/placeholder.jpg"}
                className="max-w-full h-full object-contain"
            />
        </div>
    );
};

export default ItemDisplay;


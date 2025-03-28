import { Link } from "react-router-dom";

/**
 * Main component to render the recent cell element
 */
const RecentCellElement = ({ value, link, beg }) => {
    return (
        <div 
            className={`flex ${beg ? "justify-start" : "justify-center"} 
                        items-center p-3 text-[14px] bg-white/30 rounded-md shadow-sm 
                        transition-all duration-300 hover:bg-white/60`}
        >
            {link ? (
                <Link 
                    to={link} 
                    className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-all duration-200"
                >
                    {value}
                </Link>
            ) : (
                <span className="text-gray-900 font-medium">{value}</span>
            )}
        </div>
    );
};

export default RecentCellElement;


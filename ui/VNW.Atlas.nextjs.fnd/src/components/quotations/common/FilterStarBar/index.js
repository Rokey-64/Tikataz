import { useState } from "react";
import { FaStar } from "react-icons/fa";

const FilterStarBar = ({ initialRating = 0, onChange }) => {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (star) => {
        setRating(star);
        if (onChange) onChange(star);
    };

    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar 
                    key={star} 
                    size={24} 
                    className={`cursor-pointer transition-colors duration-200 ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
                    onClick={() => handleClick(star)}
                />
            ))}
        </div>
    );
};

export default FilterStarBar;
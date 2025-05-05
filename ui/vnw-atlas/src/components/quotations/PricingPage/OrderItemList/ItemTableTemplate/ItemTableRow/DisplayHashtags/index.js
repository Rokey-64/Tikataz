import { FaHashtag } from "react-icons/fa";

const DisplayHashtags = ({ hashtags = [] }) => {
    return (
        <div className="flex flex-wrap gap-x-2">
            {hashtags.map((tag, index) => (
                <div key={index} className="flex items-center gap-x-1 bg-gray-100 px-1 rounded-md hover:bg-blue-500 group">
                    <p className="text-[10px] text-gray-800 group-hover:text-white">#{tag}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayHashtags;

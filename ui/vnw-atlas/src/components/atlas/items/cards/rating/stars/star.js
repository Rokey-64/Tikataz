import { FaStar } from "react-icons/fa";


const Star = ({isEnable}) => {

    if(!isEnable){
        return (
            <div>
                <FaStar className="size-3 sm:size-6 text-[#dbdbdb] transform transition-transform duration-300 ease-in-out hover:scale-110"/>
            </div>
        );
    }

    return (
        <div>
            <FaStar className="size-3 sm:size-6 text-yellow-400 transform transition-transform duration-300 ease-in-out hover:scale-125"/>
        </div>
    );
}

export default Star;
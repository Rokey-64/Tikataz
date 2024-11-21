import { GrLocation } from "react-icons/gr";
import { Link } from "react-router-dom";

const ShowDistance = () => {
    return (
        <div>
            <Link>
                <div className="flex opacity-55 hover:opacity-100 hover:text-red-500 transition-colors duration-300">
                    <GrLocation className="size-3 sm:size-4 mr-1 sm:mr-2" />
                    <span className="text-[0.5rem] sm:text-[0.75rem] font-semibold text-[#292929] hover:text-red-500 hover:underline">
                        Cách 30km - Hóa An, Đồng Nai
                    </span>
                </div>
            </Link>
        </div>
    );
}

export default ShowDistance;
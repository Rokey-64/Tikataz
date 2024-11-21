import Star from "./stars/star";
import Reaction from "./reaction/reaction";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";


const Rating = () => {
    return (
        <div>
            <div className="flex">
                <Star isEnable={true} />
                <Star isEnable={true} />
                <Star isEnable={true} />
                <Star />
                <Star />
            </div>
            <div className="flex">
                <div className="my-1 mr-1">
                    <Reaction icon={<AiFillLike className="text-[#0B4D99] size-3 sm:size-5" />} background="bg-yellow-300" />
                </div>
                <div className="my-1">
                    <Reaction icon={<FcLike className="size-3 sm:size-5" />} />
                </div>
                <div className="flex items-center ml-2">
                    <span className="text-[#848484] font-semibold text-[0.75rem] sm:text-base">100k</span>
                </div>
                <div className="flex items-center ml-8 sm:ml-16">
                    <span className="text-[#848484] font-semibold mr-2 text-[0.75rem] sm:text-base">20</span>
                    <Link to="#" className="flex items-center hover:underline hover:underline-offset-1 hover:text-[#848484]">
                        <span className="text-[#848484] font-semibold text-[0.75rem] sm:text-base">Bình luận</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Rating;
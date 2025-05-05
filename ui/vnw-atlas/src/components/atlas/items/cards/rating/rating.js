import Star from "./stars/star";
import Reaction from "./reaction/reaction";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import Link from 'next/link';


const Rating = ({rating}) => {
    // const rand = Math.floor(Math.random() * (1+rating));
    
    return (
        <div>
            <div className="flex">
                <Star isEnable={rating >= 1 ? true : false}/>
                <Star isEnable={rating >= 2 ? true : false}/>
                <Star isEnable={rating >= 3 ? true : false}/>
                <Star isEnable={rating >= 4 ? true : false}/>
                <Star isEnable={rating >= 5 ? true : false}/>
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
                    <Link href="#" className="flex items-center hover:underline hover:underline-offset-1 hover:text-[#848484]">
                        <span className="text-[#848484] font-semibold text-[0.75rem] sm:text-base">Bình luận</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Rating;
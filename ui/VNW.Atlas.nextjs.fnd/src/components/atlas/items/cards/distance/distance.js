import { GrLocation } from "react-icons/gr";
import Link from 'next/link';

const ShowDistance = ({data}) => {
    //Cách 30km - Hóa An, Đồng Nai
    return (
        <div>
            <Link href="#">
                <div className="flex opacity-55 hover:opacity-100 hover:text-red-500 group">
                    <GrLocation className="size-3 sm:size-4 mr-1 sm:mr-2" />
                    <span className="text-[0.5rem] sm:text-[0.75rem] font-semibold text-[#292929] group-hover:text-red-500 group-hover:underline">
                        {
                            data.general.address
                        }
                    </span>
                </div>
            </Link>
        </div>
    );
}

export default ShowDistance;
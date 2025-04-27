


const TagElement = ({ icon, content, isActive }) => {


    if (isActive) {
        return (
            <button className="bg-sky-100 hover:bg-sky-200 rounded-md sm:rounded-lg w-32 sm:w-40 h-7 sm:h-10 ">
                <div className="flex items-center justify-start mx-2">
                    {icon}
                    <p className="text-[12px] sm:text-base font-bold ml-1 sm:ml-2 block w-full overflow-hidden whitespace-nowrap text-ellipsis text-left">{content}</p>
                </div>
            </button>
        )
    }

    return (
        <button className="hover:bg-sky-200 rounded-md sm:rounded-lg w-32 sm:w-40 h-7 sm:h-10" >
            <div className="flex items-center justify-start mx-2  hover:opacity-65">
                {icon}
                <p className="text-[12px] sm:text-base font-bold ml-1 sm:ml-2 block w-full overflow-hidden whitespace-nowrap text-ellipsis text-left">{content}</p>
            </div>
        </button>
    );
};

export default TagElement;


/**
 * This component is used to display the status of the customer | Online | Ofline | Absent.
 * @returns 
 */
const Status = ({status}) => {
  switch (status) {
    case "online":
      return (
        <div className="flex items-center">
          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full"></div>
          <span className="text-[0.5rem] sm:text-xs text-[#a9bfd3] ml-1 ">Online</span>
        </div>
      );
    case "offline":
      return (
        <div className="flex items-center">
          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full"></div>
          <span className="text-[0.5rem] sm:text-xs text-[#a9bfd3] ml-1 ">Offline</span>
        </div>
      );
    case "absent":
      return (
        <div className="flex items-center">
          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-[0.5rem] sm:text-xs text-[#a9bfd3] ml-1 ">Absent</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-[0.5rem] sm:text-xs text-[#a9bfd3] ml-1 ">Online</span>
        </div>
      );
  }
};

export default Status;
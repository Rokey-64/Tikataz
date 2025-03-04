import React, { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * This component is used to display the status of the customer | Online | Ofline | Absent.
 * @returns 
 */
const Status = ({ index }) => {
  const statusList = useSelector((state) => state.status);
  let status = '';

  useEffect(() => {
    if (statusList && statusList.length > 0) {
      status = statusList && statusList.find((status) => status._id === index).status;
    }
  }, []);

  switch (status) {
    case "online":
      return (
        <div className="flex items-center">
          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full"></div>
          <span className="text-[0.5rem] sm:text-xs text-[#a9bfd3] ml-1 ">{status}</span>
        </div>
      );
    case "offline":
      return (
        <div className="flex items-center">
          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full"></div>
          <span className="text-[0.5rem] sm:text-xs text-[#a9bfd3] ml-1 ">{status}</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-[0.5rem] sm:text-xs text-[#a9bfd3] ml-1 ">{status}</span>
        </div>
      );
  }
};

export default React.memo(Status);
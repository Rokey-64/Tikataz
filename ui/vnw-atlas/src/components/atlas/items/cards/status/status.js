import React, { useEffect, useState } from "react";

/**
 * This component is used to display the status of the customer | Online | Ofline | Absent.
 * @returns 
 */
const Status = ({ card }) => {
  const [status, setStatus] = useState("online");
  const workingTime = card.data.general.workingTime;



  useEffect(() => {
    const checkOnlineStatus = () => {
      const now = new Date();
      const dayOfWeek = (now.getDay() + 6) % 7; // monday = 0, sunday = 6

      const currentDay = workingTime.find((item) => item.index === dayOfWeek);

      if (!currentDay || !currentDay.active) {
        setStatus("offline");
        return;
      }

      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const [startHours, startMinutes] = [currentDay.start.substring(0, 2), currentDay.start.substring(2)].map(Number);
      const [endHours, endMinutes] =  [currentDay.end.substring(0, 2), currentDay.end.substring(2)].map(Number);

      const currentTotalMinutes = currentHours * 60 + currentMinutes;
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;

      const isCurrentlyOnline =
        currentTotalMinutes >= startTotalMinutes &&
        currentTotalMinutes <= endTotalMinutes;

        setStatus(isCurrentlyOnline ? "online" : "offline");
    };

    checkOnlineStatus();

    // Cập nhật trạng thái mỗi phút (tuỳ chọn)
    const interval = setInterval(checkOnlineStatus, 60000*5);
    return () => clearInterval(interval);
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
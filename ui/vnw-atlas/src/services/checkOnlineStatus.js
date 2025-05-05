/**
 * Checks if the current time is within the working hours defined in the workingTime array.

 * @returns {boolean} - Returns true if the current time is outside working hours, false otherwise. 
 */
const checkOnlineStatus = (workingTime) => {
    const now = new Date();
    const dayOfWeek = (now.getDay() + 6) % 7; // monday = 0, sunday = 6

    const currentDay = workingTime.find((item) => item.index === dayOfWeek);

    if (!currentDay || !currentDay.active) {
        return false;
    }

    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const [startHours, startMinutes] = [currentDay.start.substring(0, 2), currentDay.start.substring(2)].map(Number);
    const [endHours, endMinutes] = [currentDay.end.substring(0, 2), currentDay.end.substring(2)].map(Number);

    const currentTotalMinutes = currentHours * 60 + currentMinutes;
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    const isCurrentlyOnline =
        currentTotalMinutes >= startTotalMinutes &&
        currentTotalMinutes <= endTotalMinutes;

    return isCurrentlyOnline ? false : true
};

export default checkOnlineStatus;
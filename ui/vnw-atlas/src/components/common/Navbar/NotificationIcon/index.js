import { FaBell } from 'react-icons/fa';

// Reusable Notification Icon Component
const NotificationIcon = ({ count }) => (
  <div className="relative">
    <FaBell className="text-gray-600 dark:text-gray-300 text-xl cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors" />
    {count > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {count}
      </span>
    )}
  </div>
);

export default NotificationIcon;
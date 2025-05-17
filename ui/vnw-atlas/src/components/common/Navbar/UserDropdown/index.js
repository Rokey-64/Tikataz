import { 
  FaUserCircle, 
  FaCaretDown
} from 'react-icons/fa';

const UserDropdown = ({ 
  isOpen, 
  onToggle, 
  user
}) => {

  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className="flex items-center space-x-2 focus:outline-none"
        aria-label="User menu"
      >
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt="User avatar" 
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-gray-600 dark:text-gray-300 text-2xl" />
        )}
        <FaCaretDown className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
    </div>
  );
};

export default UserDropdown;
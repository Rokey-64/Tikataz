

const TagElement = ({ 
    icon, 
    content, 
    isActive = false
  }) => {
    // Kích thước
    const sizeClasses = {
      small: "text-xs h-6 rounded-md w-24",
      medium: "text-sm h-8 rounded-lg w-36",
      large: "text-base h-10 rounded-xl w-44"
    };
    
    // Màu sắc
    const colorClasses = {
      sky: {
        active: "bg-sky-100 hover:bg-sky-200 text-sky-800",
        inactive: "hover:bg-sky-50 text-sky-700"
      },
      gray: {
        active: "bg-gray-100 hover:bg-gray-200 text-gray-800",
        inactive: "hover:bg-gray-50 text-gray-700"
      },
      red: {
        active: "bg-red-100 hover:bg-red-200 text-red-800",
        inactive: "hover:bg-red-50 text-red-700"
      },
      // Thêm các màu khác nếu cần
    };
    
    const selectedSize = sizeClasses.medium;
    const selectedColor = colorClasses.gray;
    
    return (
      <button
        className={`
          flex items-center justify-start
          transition-all duration-200
          font-medium rounded-md
          text-xs h-6  w-32
          sm:text-sm sm:h-8  sm:w-36
          ${isActive ? selectedColor.active : selectedColor.inactive}
        `}
      >
        <div className="flex items-center px-3 w-full">
          {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
          <span className="block w-full overflow-hidden whitespace-nowrap text-ellipsis text-left">
            {content}
          </span>
        </div>
      </button>
    );
  };
  
  export default TagElement;
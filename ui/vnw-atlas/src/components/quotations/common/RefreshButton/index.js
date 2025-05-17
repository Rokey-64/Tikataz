import { FiRefreshCcw } from "react-icons/fi";
import { useTranslations } from "next-intl";

/**
 * Minimal RefreshButton without border and background
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional classes
 * @param {number} props.iconSize - Icon size (default 16)
 * @param {string} props.textClassName - Text style classes
 */
const RefreshButton = ({ 
  onClick, 
  className = "", 
  iconSize = 16, 
  textClassName = "text-gray-600 hover:text-gray-900" 
}) => {
  const t = useTranslations('trans');

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 cursor-pointer mt-4 mb-2 group ${className}`}
      aria-label={t("refresh")}
    >
      <FiRefreshCcw 
        size={iconSize}
        className="text-current group-hover:rotate-45 transition-transform duration-200"
      />
      <span className={`text-sm font-sans space-x-2 ${textClassName}`}>
        {t("refresh")}
      </span>
    </button>
  );
};

export default RefreshButton;
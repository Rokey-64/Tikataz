import {
    FaUserCircle,
    FaSignOutAlt,
    FaCog,
    FaUser,
    FaGlobe,
    FaMoon,
    FaPalette,
    FaShieldAlt,
    FaSun,
    FaLifeRing ,
    FaChevronRight
} from 'react-icons/fa';

import DropdownMenuItem from '../DropdownMenuItem';
import { useTranslations } from "next-intl";

const UserDropdownMenu = ({
    user,
    darkMode,
    language,
    restrictedMode,
    onToggleDarkMode,
    onChangeLanguage,
    onToggleRestrictedMode,
    onLogout
}) => {
    const t = useTranslations('trans.atlas.dropdown_menu');

    return (
        <div className="w-80 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* User Info Section */}
            <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                <div className="flex items-center space-x-4">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt="User avatar"
                            className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm"
                        />
                    ) : (
                        <FaUserCircle className="text-gray-600 dark:text-gray-300 text-5xl" />
                    )}
                    <div className="overflow-hidden">
                        <p className="font-bold text-lg text-gray-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{user.email}</p>
                        <div className="mt-1">
                            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
                                {user.role || 'Member'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Settings Section */}
            <div className="py-2">
                <div className="px-6 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t("account")}
                </div>
                <DropdownMenuItem 
                    icon={<FaUser className="text-blue-500" size={18} />} 
                    label={t("profile")}
                    rightIcon={<FaChevronRight className="text-gray-400 text-xs" />}
                    className="px-6 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/10"
                />
            </div>

            {/* Preferences Section */}
            <div className="py-2 border-t border-gray-100 dark:border-gray-700">
                <div className="px-6 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t("preferences")}
                </div>
                <DropdownMenuItem
                    icon={<FaPalette className="text-purple-500" size={18} />}
                    label={t("apprearance")}
                    subLabel={darkMode ? 'Dark theme' : 'Light theme'}
                    rightIcon={darkMode ? (
                        <FaMoon className="text-indigo-500 dark:text-yellow-300" />
                    ) : (
                        <FaSun className="text-amber-500" />
                    )}
                    onClick={onToggleDarkMode}
                    className="px-6 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/10"
                />
                <DropdownMenuItem
                    icon={<FaGlobe className="text-green-500" size={18} />}
                    label={t("language")}
                    subLabel={language}
                    rightIcon={<FaChevronRight className="text-gray-400 text-xs" />}
                    onClick={() => onChangeLanguage(language === 'English' ? 'Tiếng Việt' : 'English')}
                    className="px-6 py-3 hover:bg-green-50 dark:hover:bg-green-900/10"
                />
                <DropdownMenuItem
                    icon={<FaShieldAlt className="text-red-500" size={18} />}
                    label={t("restrictedmode")}
                    subLabel={restrictedMode ? 'Enabled' : 'Disabled'}
                    rightIcon={
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center 
                            ${restrictedMode ? 'bg-red-100 dark:bg-red-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            <div className={`w-3 h-3 rounded-full ${restrictedMode ? 'bg-red-500' : 'bg-gray-400'}`} />
                        </div>
                    }
                    onClick={onToggleRestrictedMode}
                    className="px-6 py-3 hover:bg-red-50 dark:hover:bg-red-900/10"
                />
            </div>

            {/* Settings Section */}
            <div className="py-2 border-t border-gray-100 dark:border-gray-700">
                <div className="px-6 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t("moreoptions")}
                </div>
                <DropdownMenuItem 
                    icon={<FaCog className="text-gray-500" size={18} />} 
                    label={t("settings")}
                    rightIcon={<FaChevronRight className="text-gray-400 text-xs" />}
                    className="px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                />
                <DropdownMenuItem 
                    icon={<FaLifeRing  className="text-red-500" size={18} />} 
                    label={t("help")}
                    rightIcon={<FaChevronRight className="text-gray-400 text-xs" />}
                    className="px-6 py-3 hover:bg-red-50 dark:hover:bg-red-900/10"
                />
            </div>

            {/* Sign Out Section */}
            <div className="py-2 border-t border-gray-100 dark:border-gray-700">
                <DropdownMenuItem
                    icon={<FaSignOutAlt className="text-gray-500" size={18} />}
                    label={t("signout")}
                    onClick={onLogout}
                    className="px-6 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                />
            </div>
        </div>
    )
}

export default UserDropdownMenu;
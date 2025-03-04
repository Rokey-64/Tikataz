import { Link } from "react-router-dom";


const LeftMenuItem = ({icon: Icon, link, selectedKey, routerOptions, additionalClasses = '', iconClasses = '', contentClasses = ''}) => {
    const linkOption = routerOptions[link];
    return (
        <>
            <li className={`${additionalClasses} ${selectedKey === linkOption[0] ? 'bg-[#ebebeb] hover:bg-gray-200 font-medium shadow-sm' : 'hover:bg-[#f1f1f1]'}`}>
                <Link to={link} className="flex items-center py-1">
                    <div className="mr-2">
                        <Icon className={iconClasses} />
                    </div>
                    <p className={contentClasses}>{linkOption[1]}</p>
                </Link>
            </li>
        </>
    )
};

export default LeftMenuItem
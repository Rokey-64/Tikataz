import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from 'react-router-dom'


const MenuBar = (props) => {
    const currTag = useRef();
    const [catalogies, setCatalogies] = useState(false);
    let data = props.data
    useEffect(() => {
        const mouseover = (event) => {
            if (!document.getElementById('mega-menu-dropdown-button').contains(event.target) && !document.getElementById('mega-menu-dropdown').contains(event.target)) {
                setCatalogies(false);
            }
            else {
                setCatalogies(true)
            }
        };

        document.addEventListener('mousemove', mouseover);

        return () => {
            document.removeEventListener('mousemove', mouseover);
        };
    }, [])

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl">
                <div id="mega-menu" className="">
                    <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                                Danh mục
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {
                                catalogies ?
                                    <div id="mega-menu-dropdown" ref={currTag} className="absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700">
                                        <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                            <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                                                {
                                                    data && data.map((item) => {
                                                        return item.column_number == 1 ?
                                                            <ItemMenu key={item.id} content={item.name} href={item.href_url}/> : null;
                                                    })
                                                }

                                            </ul>
                                        </div>
                                        <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                                            <ul className="space-y-4">
                                                {
                                                    data && data.map((item) => {
                                                        return item.column_number == 2 ?
                                                            <ItemMenu key={item.id} content={item.name} href={item.href_url}/> : null;
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-4">
                                                {
                                                    data && data.map((item) => {
                                                        return item.column_number == 3 ?
                                                            <ItemMenu key={item.id} content={item.name} href={item.href_url}/> : null;
                                                    })
                                                }

                                            </ul>
                                        </div>
                                    </div>
                                    :
                                    <div id="mega-menu-dropdown" className="absolute z-10  hidden w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700">
                                    </div>
                            }
                        </li>
                        <li>
                            <Link to="#Doi-ngu" className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                                Đội ngũ
                            </Link>
                        </li>
                        <li>
                            <Link to="#Lien-lac" className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                                Liên lạc
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

        </nav>
    );
}
export default MenuBar


/**
|--------------------------------------------------
| Item
|--------------------------------------------------
*/

const ItemMenu = (props) => {
    return (
        <li>
            <Link to={props.href} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                {props.content}
            </Link>
        </li>
    );
}
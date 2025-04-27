import { useState, useEffect, useRef, useCallback} from "react";
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import { PiNoteBlankThin } from "react-icons/pi";
import getRFQRecentAPI from "../../../../api/getRFQRecent";
import Messages from "../../common/Messages";
import RecentRowElement from "../../common/RecentRowElement";
import HeaderDisplay from "../../common/HeaderDisplay";
import PaginationComponent from "../../common/Pagination";

/**
 * Display a list of recent quotations
 * @param {*} param0 
 * @returns 
 */
const RecentList = () => {
    const { t } = useTranslation();
    const [recentList, setRecentList] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const getRFQRecentAPICallback = useCallback(async (page) => {
        const response = await getRFQRecentAPI(page, 'default');
        if (response && response.length > 0) {
            setPageCount(response[0].page_count);
            setRecentList(response);
        }
    }, [])

    useEffect(() => {
        getRFQRecentAPICallback(1);
    }, []);

    const onPageChange = (page) => {
        getRFQRecentAPICallback(page);
    }

    /***
     * 
     * 2// Add a discard button to the component to discard the order => dialog to confirm discard
     * 3// 
     * 4// Create a component to display the list of recent orders
     * 5// Add next and previous buttons to the component to navigate through the list of recent orders
     * 6// Provider UI to check the order status and update the order status
     * 7// Inform the user when the provider has updated the order status
     */

    return (
        <div>
            <HeaderDisplay title="Recent Quotations" />
            <Messages type="AutRFQRecentMessage" />
            <div>
                {
                    recentList.map((recent, index) => {
                        return (
                            <RecentRowElement item={recent} key={index} stt={index}/>
                        );
                    })
                }
            </div>
            <div>
                {
                    // alert(recentList.length === 0)
                    recentList.length === 0 ? (
                        <div>
                            <div className="flex justify-start items-start text-gray-500 font-medium text-sm mt-5 gap-2">
                                <PiNoteBlankThin className="text-5xl mr-2" />
                                <div className="w-72">
                                    {t("rfq_history_empty")}
                                </div>
                            </div>
                        </div>
                    ) : (

                        <PaginationComponent totalPages={pageCount} onPageChange={onPageChange}/>
                    )
                }
            </div>

        </div>
    );
};

export default RecentList;
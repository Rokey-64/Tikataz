import RecentRowElement from "../../common/RecentRowElement";
import HeaderDisplay from "../../common/HeaderDisplay";
import { Link } from "react-router-dom";

/**
 * Display a list of recent quotations
 * @param {*} param0 
 * @returns 
 */
const RecentList = ({ recentList }) => {
    const temporaryRecentList = [
        { name: "Quotation 1: Vật dụng văn phòng, chi nhánh 2", type: "Type 1", date: "2021-10-10", state: "State 1" },
        { name: "Quotation 2: Nguyên liệu cho lò đúc", type: "Type 2", date: "2021-10-11", state: "State 2" },
        { name: "Quotation 3", type: "Type 3", date: "2021-10-12", state: "State 3" },
        { name: "Quotation 4", type: "Type 4", date: "2021-10-13", state: "State 4" },
    ];
    return (
        <div>
            <HeaderDisplay title="Recent Quotations" />
            <div>
                {
                    temporaryRecentList.map((recent, index) => {
                        return (
                            <RecentRowElement key={index} stt={index + 1} name={recent.name} type={recent.type} date={recent.date} state={recent.state} />
                        );
                    })
                }
            </div>
            <div className="my-5">
                <Link to="/quotations" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">(View all...)</Link>
            </div>
        </div>
    );
};

export default RecentList;
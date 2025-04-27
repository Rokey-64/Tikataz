import RecentCellElement from './RecentCellElement';

/**
 * Component for displaying a single row in the recent quotations list.
 */
const RecentRowElement = ({ stt, index, item}) => {
    const bgColors = [
        "bg-gradient-to-r from-purple-400 to-blue-400",
        "bg-gradient-to-r from-pink-400 to-orange-400"
    ];
    
    return (
        <div 
            className={`w-[60rem] border-b border-gray-300 shadow-lg rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl`}
        >
            <div className={`grid grid-cols-5 gap-4 p-3 ${bgColors[index % 2]} text-white`}>
                <RecentCellElement value={stt+1} beg={true} />
                <RecentCellElement value={item.order_name} beg={true} link={`/rfq/dashboard/history/views?id=${item.id}`} />
                <RecentCellElement value={item.order_type} />
                <RecentCellElement value={item.start_date} />
                <RecentCellElement value={item.end_date} />
            </div>
        </div>
    );
};

export default RecentRowElement;


import RequestForQuotation from "./RFQ";
import RFQHistory from "./RFQHistory";
import RecentList from "./RecentList";
import CustomerShortcutList from "./CustomerShortcutList";


/**
 * This component is used to display the Quotations Dashboard. Dashboard will dispatch the Quotations List component.
 * @returns 
 */
const QuotationsDashboard = () => {
    return (
        <div className="w-screen h-screen mt-5">
            <div className="flex justify-center items-start overflow-y-auto overflow-x-auto max-h-[calc(100vh-120px)] min-h-[calc(100vh-120px)] w-[calc(100vw-10px)] md:w-[calc(100vw-5px)] p-2">
                <div>
                    <div className="flex gap-x-20 mb-16">
                        <RequestForQuotation />
                        <RFQHistory />
                    </div>
                    <RecentList />
                    <CustomerShortcutList />
                </div>
            </div>
        </div>
    );
};

export default QuotationsDashboard;
import RequestForQuotation from "./RFQ";
import RFQHistory from "./RFQHistory";
import RecentList from "./RecentList";
import CustomerShortcutList from "./CustomerShortcutList";
import Messages from "../common/Messages";


/**
 * This component is used to display the Quotations Dashboard. Dashboard will dispatch the Quotations List component.
 * @returns 
 */
const QuotationsDashboard = () => {
    return (
        <div className="w-screen h-screen mt-6 md:mt-1">
            <div className="flex items-start justify-start lg:justify-center overflow-y-auto overflow-x-auto 
            max-h-[calc(100vh-105px)] min-h-[calc(100vh-105px)]
            md:max-h-[calc(100vh-70px)] md:min-h-[calc(100vh-70px)]
             w-[calc(100vw)] md:w-[calc(100vw)] p-2">
                <div>
                    <div className="flex gap-x-20 mb-16 mt-5">
                        <RequestForQuotation />
                        <RFQHistory />
                    </div>
                    <div className="mb-10">
                        <RecentList />
                    </div>
                    {/* <CustomerShortcutList /> */}
                </div>
            </div>
        </div>
    );
};

export default QuotationsDashboard;
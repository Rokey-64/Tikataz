import QuotationDateBoard from "../QuotationDateBoard";
import QuotationState from "../QuotationState";


const QuotationHeader = ({setType}) => {
    return (
        <div className="flex">
            <div className="mt-5 mx-5">
                <QuotationState setType={setType}/>
            </div>
            {/* <QuotationDateBoard /> */}
        </div>
    );
}

export default QuotationHeader;
import QuotationTable from "../QuotationTable";

const QuotationBody = ({ quotationType }) => {
    return (
        <div className="quotation-body">
            <QuotationTable quotationType={quotationType}/>
        </div>
    );
}

export default QuotationBody;
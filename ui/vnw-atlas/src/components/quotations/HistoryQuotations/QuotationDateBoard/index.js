
import TopDateButton from '../../common/TopDateButton';

const QuotationDateBoard = () => {
    return (
        <div className="flex">
            <TopDateButton title="Từ ngày:"/>
            <TopDateButton title="Đến ngày:"/>
        </div>
    );
}

export default QuotationDateBoard;
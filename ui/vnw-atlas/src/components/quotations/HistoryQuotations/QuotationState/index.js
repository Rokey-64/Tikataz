import React, {useState} from 'react';
import { useTranslations } from "next-intl";
import { Tooltip } from 'react-tooltip';
import QuotationStateButton from './QuotationStateButton';

const QuotationState = ({setType}) => {
    const t = useTranslations('trans');
    const [current, setCurrent] = useState(0);

    const handleClick = (index) => {
        setCurrent(index);

        switch (index) {
            case 0:
                setType("ALL");
                break;
            case 1:
                setType("PENDING");
                break;
            case 2:
                setType("PROCESSING");
                break;
            case 3:
                setType("REJECTED");
                break;
            case 4:
                setType("FINISHED");
                break;
        }
    }

    const getClickState = (index) => {
        if (index === current) {
            return true;
        }
        return false;
    }
    return (
        <div className='flex items-start justify-start w-fix h-fix'>
            <QuotationStateButton state={t("rfqtype_all")} onClick={() => { handleClick(0) }} isClicked={getClickState(0)}/>
            <QuotationStateButton state={t("rfqtype_pending")} onClick={() => { handleClick(1) }} isClicked={getClickState(1)}/>
            <QuotationStateButton state={t("rfqtype_processing")} onClick={() => { handleClick(2) }} isClicked={getClickState(2)}/>
            <QuotationStateButton state={t("rfqtype_rejected")} onClick={() => { handleClick(3) }} isClicked={getClickState(3)} />
            <QuotationStateButton state={t("rfqtype_finished")} onClick={() => { handleClick(4) }} isClicked={getClickState(4)} />
        </div>
    );
}

export default QuotationState;
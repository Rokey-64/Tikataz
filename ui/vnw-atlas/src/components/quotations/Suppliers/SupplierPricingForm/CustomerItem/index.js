import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from "next-intl";
import { useRFQSupliersContext } from '@/contexts/RFQSuppliersContext';
import ItemHeader from './ItemHeader';
import PriceInput from './PriceInput';
import TotalAmountDisplay from './TotalAmtDisplay';


const CustomerItem = ({ item }) => {
    const { state, dispatch } = useRFQSupliersContext();
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('1');
    const [totalAmount, setTotalAmount] = useState(0);
    const [skip, setSkip] = useState(false);

    // Calculate total amount whenever price or quantity changes
    useEffect(() => {
        const amount = price && item.quantity
            ? parseFloat(price) * parseInt(item.quantity)
            : 0;
        setTotalAmount(amount);
    }, [price]);

    useEffect(() => {
        if (item.quantity || skip === true) {
            const updatedPrices = state.prices.map(p => {
                if (p.id === item.id) {
                    return {
                        ...p,
                        orderItemID: item.id,
                        price: price,
                        currencyID: currency,
                        state: skip ? "skipped" : "complete",
                    };
                }
                return p;

            });

            dispatch({
                type: 'SET_PRICES',
                payload: updatedPrices
            });
        }
    }, [price, currency, skip]);

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }

    const handleCurrencyChange = useCallback((e) => {
        setCurrency(e.target.value);
    }, []);

    // const hasImage = Boolean(item.image);
    const showTotalAmount = Boolean(price);

    const formatCurrencyValue = (value, currency) => {
        const symbol = state.listCurrency.find(c => c.id.toString() === currency)?.symbol || '';
        return `${Number(value.toFixed(5)).toLocaleString('en-US')} ${symbol}`;
    };


    return (
        <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm relative group">
            {
                skip && (
                    <div className="absolute inset-0 bg-white/70  z-10 rounded-lg pointer-events-auto transition-opacity duration-300" />
                )
            }
            <div className="absolute -top-3 -right-3 z-10 group-hover:opacity-100 opacity-0 transition-opacity">
                <SkipButton onClick={() => setSkip(!skip)} className="text-sm px-3" skip={skip} />
            </div>

            <div className={`flex flex-col md:flex-row gap-4`}>
                <div className="md:w-1/4">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-auto rounded object-cover"
                        onError={(e) => {
                            e.target.onerror = null; // prevents looping
                            e.target.src = '/placeholder.jpg'; // fallback image
                        }}
                    />
                </div>

                <div className='md:w-3/4'>
                    <ItemHeader item={item} />

                    <div className="mt-3 space-y-4">
                        <PriceInput
                            price={price}
                            currency={currency}
                            state={state}
                            onPriceChange={handlePriceChange}
                            onCurrencyChange={handleCurrencyChange} />

                        <TotalAmountDisplay
                            amount={totalAmount}
                            currency={currency}
                            showTotalAmount={showTotalAmount}
                            formatCurrencyValue={formatCurrencyValue}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


const SkipButton = ({ onClick, skip }) => {
    const t = useTranslations('trans');

    const bgColor = skip ? "bg-blue-500 hover:bg-blue-600 border-blue-600" : "bg-yellow-500 hover:bg-yellow-600 border-yellow-600";
    const textColor = "text-white";

    return (
        <button
            onClick={onClick}
            className={`relative group px-5 py-2 ${bgColor} ${textColor}
                transition-all duration-200 shadow-md hover:shadow-lg 
                bookmark-label rounded-lg`}
            aria-label={skip ? t("unskip") : t("skip")}
        >
            <div className="flex items-center justify-center space-x-1">
                <span className="text-sm font-medium">
                    {skip ? t("unskip") : t("skip")}
                </span>
                <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </button>
    );
};






export default CustomerItem;
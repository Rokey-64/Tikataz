import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRFQSupliersContext } from '../../../../../contexts/RFQSuppliersContext';

const CURRENCY_OPTIONS = [
    { code: 'VND', symbol: '₫', name: 'Vietnamese' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'KRW', symbol: '₩', name: 'Korean Won' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
];

const formatCurrencyValue = (value, currency) => {
    const symbol = CURRENCY_OPTIONS.find(c => c.code === currency)?.symbol || '';
    if (['VND', 'KRW', 'JPY'].includes(currency)) {
        return `${symbol}${Math.round(value).toLocaleString()}`;
    }
    return `${symbol}${value.toFixed(2)}`;
};

const CustomerItem = ({ item }) => {
    const { t } = useTranslation();
    const { state, dispatch } = useRFQSupliersContext();

    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('VND');
    const [totalAmount, setTotalAmount] = useState(0);

    // Calculate total amount whenever price or quantity changes
    useEffect(() => {
        const amount = price && item.quantity
            ? parseFloat(price) * parseInt(item.quantity)
            : 0;
        setTotalAmount(amount);
    }, [price]);

    useEffect(() => {
        if (price && item.quantity) {
            const findedPrice = state.prices.find(p => p.id === item.id);
            if (findedPrice) {
                const updatedPrices = state.prices.map(p => {
                    if (p.id === item.id) {
                        return {
                            ...p,
                            price: price,
                            currency: currency,
                            totalAmount: totalAmount
                        };
                    }
                    return p;

                });

                dispatch({
                    type: 'SET_PRICES',
                    payload: updatedPrices
                });
            }
        }
    }, [price, currency]);

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
    }

    const handleCurrencyChange = useCallback((e) => {
        setCurrency(e.target.value);
    }, []);

    const hasImage = Boolean(item.image);
    const showTotalAmount = Boolean(price);

    return (
        <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
            <div className={`flex flex-col ${hasImage ? 'md:flex-row' : ''} gap-4`}>
                {hasImage && (
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
                )}

                <div className={`${hasImage ? 'md:w-3/4' : 'w-full'}`}>
                    <ItemHeader item={item} t={t} />

                    <div className="mt-3 space-y-4">
                        <PriceInput
                            price={price}
                            currency={currency}
                            onPriceChange={handlePriceChange}
                            onCurrencyChange={handleCurrencyChange}
                            t={t}
                        />

                        {showTotalAmount && (
                            <TotalAmountDisplay
                                amount={totalAmount}
                                currency={currency}
                                t={t}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-components for better organization
const ItemHeader = ({ item, t }) => {
    const itemDetails = [
        { label: t("item_specification"), value: item.specification },
        { label: t("item_quantity"), value: item.quantity },
        ...(item.description ? [{ label: t("item_description"), value: item.description }] : [])
    ];

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
            </h3>

            <div className="space-y-1.5">
                {itemDetails.map((detail, index) => (
                    <p key={`${detail.label}-${index}`} className="text-gray-600">
                        <span className="font-medium text-gray-700">{detail.label}:</span>{' '}
                        <span className="text-gray-600">{detail.value}</span>
                    </p>
                ))}
            </div>
        </div>
    );
};

const PriceInput = ({ price, currency, onPriceChange, onCurrencyChange, t }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("suppliers.items.your_quote_price")}
        </label>
        <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center">
                <input
                    type="number"
                    value={price}
                    onChange={onPriceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("suppliers.items.enter_your_quote_price")}
                    min="0"
                    step="0.01"
                />
            </div>
            <div className="w-full md:w-56">
                <select
                    value={currency}
                    onChange={onCurrencyChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    {CURRENCY_OPTIONS.map(curr => (
                        <option key={curr.code} value={curr.code}>
                            {curr.code} ({curr.symbol}) - {curr.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center text-gray-500">
                <span>/ {t("item_unit")}</span>
            </div>
        </div>
    </div>
);

const TotalAmountDisplay = ({ amount, currency, t }) => (
    <div className="flex items-center space-x-2 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
            {t("suppliers.items.total_amount")}:
        </h4>
        <p className="text-lg font-semibold text-blue-600 mb-1">
            {formatCurrencyValue(amount, currency)}
        </p>
    </div>
);

export default CustomerItem;
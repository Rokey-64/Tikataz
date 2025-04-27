import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const PriceInput = (props) => {
    const { t } = useTranslation();

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("suppliers.items.your_quote_price")}
            </label>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center">
                    <input
                        type="number"
                        value={props.price}
                        onChange={props.onPriceChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t("suppliers.items.enter_your_quote_price")}
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="w-full md:w-56">
                    <select
                        value={props.currency}
                        onChange={props.onCurrencyChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        {props.state.listCurrency.map(curr => (
                            <option key={curr.id} value={curr.id}>
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
}

export default PriceInput;
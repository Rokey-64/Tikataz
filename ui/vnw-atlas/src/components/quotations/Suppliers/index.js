import { useState, useEffect, useReducer, Suspense} from 'react';
import { RFQSupliersProvider } from '../../../contexts/RFQSuppliersContext';
import {quoteVenderReducer, initialState} from '../../../reducers/quoteVenderReducer';
import { useSearchParams, useRouter } from 'next/navigation';
import GreatingLetter from './GreetingLetter';
import SupplierPricingForm from './SupplierPricingForm';
import PageFooter from './PageFooter';
import getRFQSupplierOrderAPI from '../../../api/getRFQSupplierOrder';
import getListCurrencyAPI from '@/api/getListCurrency';
import { t } from 'i18next';

const Supliers = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [state, dispatch] = useReducer(quoteVenderReducer, initialState);

    // Simulate data fetching
    useEffect(() => {
        if (!token) {
            router.push('/');
            return;
        }

        const fetchQuoteData = async () => {
            
            try {
                const response = await getRFQSupplierOrderAPI(token);
                if (!response) {
                    throw new Error("Không tìm thấy thông tin báo giá");
                }
                
                if(response === 'Unauthorized') {
                    dispatch({ type: 'SET_EXPIRED', payload: true });
                    return;
                }

                // Parse response data
                const items = response.items.map(item => ({
                    id: item.orderItemID,
                    name: item.itemName,
                    image: item.image,
                    specification: item.spec,
                    quantity: item.qty,
                    description: item.description,
                    unit: item.unit
                }));

                const info = response.info;

                // Simulate API call
                const mockData = {
                    customerName: info.companyName,
                    address: info.address,
                    taxCode: info.taxCode,
                    quoteTitle: info.orderName,
                    createdAt: info.startDate,
                    expiryDate: info.endDate,
                    notes: info.remark,
                    items: items
                };

                const prices = items.map(item => ({
                    id: item.id,
                    price: null,
                    currency: '1',
                    state: 'processing'
                }));

                dispatch({ type: 'SET_QUOTE_DATA', payload: mockData });
                dispatch({ type: 'SET_STATISTICS', payload: response.statistics });
                dispatch({ type: 'SET_PRICES', payload: prices });

                // Fetch currency list
                const currencyResponse = await getListCurrencyAPI(token);
                if (currencyResponse) {
                    dispatch({ type: 'SET_LIST_CURRENCY', payload: currencyResponse });
                }
            } catch (err) {
                dispatch({ type: 'SET_ERROR', payload: err.message });
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        fetchQuoteData();
    }, [token]);

    const handleRegisterClick = () => {
        router.push('/register', { state: { } });
    };

    if (state.loading) {
        return <div className="flex justify-center items-center h-screen">Đang tải...</div>;
    }

    if (state.error) {
        return <div className="text-red-500 text-center p-8">Lỗi: {state.error}</div>;
    }

    if (state.expired) {
        router.push('/expired', { state: {} });
        return null;
    }

    return (
        <RFQSupliersProvider state ={state} dispatch={dispatch}>
            <div className="mx-auto p-6 overflow-y-auto overflow-x-auto
                 md:max-h-[calc(100vh-70px)] md:min-h-[calc(100vh-70px)]
                 max-h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] w-[calc(100vw-10px)] md:w-[calc(100vw)]">
                <GreatingLetter/>
                <SupplierPricingForm/>
                <PageFooter onRegisterClick={handleRegisterClick} />
            </div>
        </RFQSupliersProvider>
    );
};


const SupliersSuspense = () => (
    <Suspense fallback={<div className="w-screen h-screen flex justify-center items-center"><h1 className="text-2xl font-bold">Loading...</h1></div>}>
        <Supliers />
    </Suspense>
);

export default SupliersSuspense;
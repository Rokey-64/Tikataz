import { useState, useEffect, useReducer} from 'react';
import { RFQSupliersProvider } from '../../../contexts/RFQSuppliersContext';
import {quoteVenderReducer, initialState} from '../../../reducers/quoteVenderReducer';
import { useParams, useNavigate } from 'react-router-dom';
import GreatingLetter from './GreetingLetter';
import SupplierPricingForm from './SupplierPricingForm';
import PageFooter from './PageFooter';

const Supliers = () => {
    const { quoteId } = useParams();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(quoteVenderReducer, initialState);

    // Simulate data fetching
    useEffect(() => {
        const fetchQuoteData = async () => {
            try {
                // Check if quote is expired
                const currentDate = new Date();
                const expiryDate = new Date('2025-12-31'); // Example expiry date

                if (currentDate > expiryDate) {
                    dispatch({ type: 'SET_EXPIRED', payload: true });
                    return;
                }

                // Simulate API call
                const mockData = {
                    customerName: "Công ty TNHH ABC",
                    taxCode: "0123456789",
                    quoteTitle: "Yêu cầu báo giá vật liệu xây dựng",
                    createdAt: "2023-10-15",
                    expiryDate: "2023-12-31",
                    notes: "Ưu tiên các nhà cung cấp có kho hàng tại Hà Nội",
                    items: [
                        {
                            id: 1,
                            name: "Gạch ốp tường loại A",
                            image: "https://example.com/image1.jpg",
                            specification: "Kích thước 30x60cm, màu trắng sứ",
                            quantity: 500,
                            description: "Gạch chống trơn, độ hút nước thấp"
                        },
                        {
                            id: 2,
                            name: "Xi măng PCB40",
                            image: "https://example.com/image2.jpg",
                            specification: "Bao 50kg",
                            quantity: 100,
                            description: "Xi măng đa dụng, thời gian đông kết 4-6 giờ"
                        }
                    ]
                };

                dispatch({ type: 'SET_QUOTE_DATA', payload: mockData });

            } catch (err) {
                dispatch({ type: 'SET_ERROR', payload: err.message });
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        fetchQuoteData();
    }, [quoteId]);

    const handleRegisterClick = () => {
        navigate('/register', { state: { fromQuote: quoteId } });
    };

    if (state.loading) {
        return <div className="flex justify-center items-center h-screen">Đang tải...</div>;
    }

    if (state.error) {
        return <div className="text-red-500 text-center p-8">Lỗi: {state.error}</div>;
    }

    if (state.expired) {
        navigate('/expired', { state: { fromQuote: quoteId } });
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

export default Supliers;
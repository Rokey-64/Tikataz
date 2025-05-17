import { useEffect, useReducer, Suspense} from 'react';
import DisplayRFQHeader from './DisplayRFQHeader';
import DisplayRFQItems from './DisplayRFQItems';
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from 'next/navigation';
import getRFQOrderAPI from '../../../../api/getRFQOrder';
import { initialState, quotationDataReducer } from '../../../../reducers/quotationDataReducer';


/**
 * Display the RFQ in detail
 * @param {*} param0 
 * @returns 
 */
const DisplayRFQDetail = () => {
    const t = useTranslations('trans');
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [state, dispatch] = useReducer(quotationDataReducer, initialState);

    useEffect(() => {
        if (!id) {
            router.push("/rfq/dashboard");
            return;
        }

        const fetchData = async () => {
            const response = await getRFQOrderAPI(id);
            if (response) {
                const orderBillData = {
                    ...state,
                    id: response[0].id,
                    header: {
                        orderName: response[0].orderName,
                        startDate: response[0].startDate,
                        endDate: response[0].endDate,
                        address: response[0].address,
                        createDate: response[0].created,
                        remark: response[0].remark,
                    },
                    items: response.map((item, index) => ({
                        id: index + 1,
                        name: item.itemName,
                        code: item.itemHashtag,
                        image: item.shortLink,
                        specification: item.itemSpec,
                        quantity: item.itemQty,
                        unit: item.itemUnit,
                        description: item.itemDesc
                    }))
                };

                dispatch({ type: 'SET_ALL', payload: orderBillData });

            } else {
                navigate("/rfq/dashboard");
            }
        }
        fetchData();
    }
        , [id, router]);

    return (
        <div className="w-screen h-screen mt-5 md:mt-1">
            <div className="flex flex-col justify-start items-start overflow-y-auto overflow-x-auto
                 md:max-h-[calc(100vh-70px)] md:min-h-[calc(100vh-70px)]
                 max-h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] w-[calc(100vw-10px)] md:w-[calc(100vw)] p-2">
                <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100 max-h-[calc(100vh-75px)] min-h-[calc(100vh-75px)]">
                    <DisplayRFQHeader data={state?.header} />
                    <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">{t("requested_items")}</h3>
                        <DisplayRFQItems items={state?.items} />
                        <div className="flex justify-end mt-10"/>
                    </div>
                </div>
            </div>
        </div>
    );
};




const DisplayRFQDetailSuspense = () => (
    <Suspense fallback={<div className="w-screen h-screen flex justify-center items-center"><h1 className="text-2xl font-bold">Loading...</h1></div>}>
        <DisplayRFQDetail />
    </Suspense>
);

export default DisplayRFQDetailSuspense;
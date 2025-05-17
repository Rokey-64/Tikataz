import React, { useCallback, useEffect, Suspense } from "react";
import CardEditMode from "./CardEditMode";
import { throttle } from "lodash";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setDefault, initialState } from "../../../../redux/cardsSlice";

import loadCardAPI from "../../../../api/loadCard";
import { useRouter, useSearchParams } from 'next/navigation';
import { nanoid } from "nanoid";

/**
 * Create new or update card
 * @param {*} param0 
 * @returns 
 */
const CardEditModeInit = () => {
    const dispatch = useDispatch();
    // const location = useLocation();
    // const navigate = useNavigate();
    const router = useRouter();
    const searchParams = useSearchParams();

    // const card = useSelector((state) => state.cards);

    /**
     * Initialize new card
     */
    const initNewCardCallback = useCallback(
        throttle(
            async (status) => {
                const cardId = nanoid();
                const data = await loadCardAPI(cardId, status);

                if (!data) return;
                const payload = data.payload;

                const cloneCard = _.cloneDeep(initialState);
                cloneCard.general = {
                    ...cloneCard.general,
                    email: payload.email || "",
                    phone: payload.phone || "",
                    businessField: payload.business_field || "",
                    address: payload.address || [],
                }

                dispatch(setDefault(cloneCard));
            },
            3000, { trailing: false }),
        [router]
    )

    /**
     * Load existing card data from server
     */
    const loadCardCallback = useCallback(
        throttle(
            async (initCard, cardID, status) => {
                const data = await loadCardAPI(cardID, status);
                if (!data) return;

                dispatch(setDefault({
                    ...initCard,
                    id: data.payload.id,
                    general: data.payload.general,
                    products: data.payload.products,
                    certificates: data.payload.certificates,
                    customers: data.payload.customers,
                    category: data.payload.category
                }));
            },
            3000, { trailing: false }),
        [router]
    )

    const getUrlParams = () => {
        const cardId = searchParams.get('id');
        const cardStatus = searchParams.get('st');

        return { cardId, cardStatus };
    }

    useEffect(() => {

        const { cardId, cardStatus } = getUrlParams();
        if (!cardId || !cardStatus) return;

        if (cardStatus === 'u') {
            loadCardCallback(_.cloneDeep(initialState), cardId, cardStatus);

        } else if (cardStatus === 'n') {
            initNewCardCallback(cardStatus);
        }

    }, []);


    return (
        <div className="flex items-center justify-center bg-black bg-opacity-50 z-10 top-24">
            <div className="bg-white w-fit">
                <div className="flex  border rounded shadow-md">
                    <div className="h-screen">
                        <CardEditMode />
                    </div>
                </div>
            </div>
        </div>

    );
};

const CardEditModeInitSuspense = () => {

    return (
        <Suspense fallback={<div className="w-screen h-screen flex justify-center items-center"><h1 className="text-2xl font-bold">Loading...</h1></div>}>
            <CardEditModeInit />
        </Suspense>
    )
}

export default CardEditModeInitSuspense;

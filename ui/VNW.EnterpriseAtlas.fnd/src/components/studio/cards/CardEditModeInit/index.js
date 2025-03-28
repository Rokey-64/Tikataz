import React, { useCallback, useEffect } from "react";
import CardEditMode from "./CardEditMode";
import { throttle } from "lodash";
import _ from "lodash";
import { useDispatch, useSelector} from "react-redux";
import { setDefault, initialState } from "../../../../redux/cardsSlice";

import loadCardAPI from "../../../../api/loadCard";
import { useLocation, useNavigate} from "react-router-dom";
import { nanoid } from "nanoid";

/**
 * Create new or update card
 * @param {*} param0 
 * @returns 
 */
const CardEditModeInit = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const card = useSelector((state) => state.cards);

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
        [navigate]
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
        [navigate]
    )

    const getUrlParams = () => {
        
        const search = location.search;
        const params = new URLSearchParams(search);
        const cardId = params.get('id');
        const cardStatus = params.get('st');

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

export default CardEditModeInit;

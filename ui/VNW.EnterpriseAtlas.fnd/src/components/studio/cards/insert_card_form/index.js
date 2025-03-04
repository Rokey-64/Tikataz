import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGeneral } from "../../../../redux/cardsSlice";
import TagCategory from "../tag_category/index";
import loadCard from "../../../../api/loadCard";

/**
 * Create new or update card
 * @param {*} param0 
 * @returns 
 */
const InsertCardForm = ({ options }) => {
    const dispatch = useDispatch();
    const general = useSelector(state => state.cards.general);

    useEffect(() => {
        
        /**
         * Get data from server
         */
        const dataAPI = async () => {
            // call api
            const data = await loadCard();
            if (!data) return;

            const payload = data.payload;

            // set data to redux store
            dispatch(setGeneral({
                ...general, 
                email: payload.email || "",
                phone: payload.phone || "",
                businessField: payload.business_field || "",
                address: payload.address || [],
            }));
        }

        dataAPI();
    }, [])

    return (
        <div className="flex items-center justify-center bg-black bg-opacity-50 z-10 top-24">
            <div className="bg-white w-fit">
                <div className="flex  border rounded shadow-md">
                    <div className="h-screen">
                        <TagCategory/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default InsertCardForm;

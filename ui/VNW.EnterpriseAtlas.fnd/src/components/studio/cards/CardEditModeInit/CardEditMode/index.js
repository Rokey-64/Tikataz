import React, { useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHistory, setID, setChangedTarget } from "../../../../../redux/cardsSlice";
import CardGeneral from "./CardGeneral";
import CardCustomers from "./CardCustomers";
import CardProdCerts from "./CardProdCerts";
import CardLeftMenu from "./CardLeftMenu";
import CardQuestions from "./CardQuestions"
import CreateCardFormData from "../../../../../services/createCardFormData";
import throttle from "lodash.throttle";
import UploadCardImagesAPI from "../../../../../api/uploadCardImages";
import UploadCardDataAPI from "../../../../../api/uploadCardData";
import updateCardHistory from "../../../../../services/updateCardHistory";
import cloneDeep from "lodash/cloneDeep";
import { useTranslation } from "react-i18next";


const CardEditMode = () => {
    const [companyInfo, setCompanyInfo] = useState(1)
    const card = useSelector((state) => state.cards)
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const setActiveTab = () => {
        switch (companyInfo) {
            case 1:
                return <CardGeneral />
            case 2:
                return <CardProdCerts />
            case 3:
                return <CardCustomers />
            case 4:
                return <CardQuestions />
        }
    }

    /**
     * This function is used to upload data to server
     * @param {*} card 
     * @param {*} payload 
     */
    const uploadData = async (card) => {
        // const cardData = createCardData(card, payload);
        const cardData = cloneDeep(card);

        delete cardData.history;

        const response = await UploadCardDataAPI({ payload: cardData });
        return response;
    };


    /**
     * This function is used to upload images to server
     * @param {*} formData 
     * @returns 
     */
    const uploadImages = async (formData) => {
        const response = await UploadCardImagesAPI(formData);
        return response;
    }

    const throttledSave = useCallback(
        throttle(async (card) => {
            /**❌ Need a function to check data before upload❌📛 
             * ❌❌❌❌❌❌
             * ❌❌❌❌❌❌❌
             * ❌❌❌❌❌❌❌❌
            */
            // If nothing has changed, return
            if (!Object.keys(card.changedTarget.general).length
                && !card.changedTarget.products
                && !card.changedTarget.certificates
                && !card.changedTarget.customers
                && !Object.keys(card.changedTarget.category).length) {
                alert(t("node_save_nothing"));
                return;
            }

            const result = await uploadData(card)
            if (!result) {
                alert(t("note_save_failed"));
                return;
            }

            const formData = await CreateCardFormData(card);

            const response = await uploadImages(formData);
            if (!response) {
                alert(t("note_save_failed"));
                return;
            }

            const history = updateCardHistory(card, response.payload);

            // set ID
            if (!card.id)
                dispatch(setID(response.id));

            // reset history
            dispatch(setHistory(history));

            // reset changedTarget
            dispatch(setChangedTarget({ general: {}, products: false, certificates: false, customers: false, category: {} }));

            alert(t("note_save_success"));

        }, 2000, { trailing: false }),
        []
    )

    const onClickSave = () => {
        throttledSave(card);
    }

    return (
        <div className="flex items-start justify-start">
            {/* Sidebar */}
            <CardLeftMenu setCompanyInfo={setCompanyInfo} companyInfo={companyInfo} />

            {/* Content */}
            <div className="max-h-[calc(100vh-110px)] min-h-[calc(100vh-110px)] min-w-[100vw] max-w-[100vw] md:min-w-[calc(100vw-220px)] md:max-w-[calc(100vw-220px)]">
                <div className="flex items-start pl-1 overflow-y-auto max-h-[calc(100vh-110px)] min-h-[calc(100vh-110px)] ">
                    {setActiveTab()}
                </div>

                <div className="flex justify-end items-center sticky bottom-0 p-3 space-x-4 bg-white border-t border-gray-300">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md border border-gray-300 text-[13px] font-semibold"
                        onClick={onClickSave}>{t("apply")}</button>
                </div>
            </div>
        </div>
    );
};

export default CardEditMode;
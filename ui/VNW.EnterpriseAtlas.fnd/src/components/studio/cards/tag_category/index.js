import React, { useState, useCallback} from "react";
import { useSelector } from "react-redux";
import CustomerCategory from "../customer_category";
import IFCommon from "./overview/index";
import IFPartner from "./partner/index";
import IFProductCert from "./product&cert/index";
import CardMenu from "./card_menu";
import IFQuest from "./category"
import CreateCardFormData from "../../../../services/createCardFormData";
import throttle from "lodash.throttle";
import UploadCardImages from "../../../../api/uploadCardImages";


const TagCategory = () => {
    const [companyInfo, setCompanyInfo] = useState(1)
    const card = useSelector((state) => state.cards)

    const setActiveTab = () => {
        switch (companyInfo) {
            case 1:
                return <IFCommon />
            case 2:
                return <IFProductCert />
            case 3:
                return <IFPartner CustomerCategory={CustomerCategory} />
            case 4:
                return <IFQuest />
        }
    }

    const throttledSave = useCallback(
        throttle(async (card) => {
            const formData = await CreateCardFormData(card);

            if (!formData) {
                return;
            }
            
            const uploadImages = async (formData) => {
                // call api to upload images
                UploadCardImages(formData).then((data) => {
                    if (data) {
                        alert("Images uploaded successfully")
                    }
                })
            }
    
            uploadImages(formData);
    
    
        }, 1000, { trailing: false }),
        []
    )

    const onClickSave = () => {
        throttledSave(card);
    }


    return (
        <div className="flex items-start justify-start">
            {/* Sidebar */}
            <CardMenu setCompanyInfo={setCompanyInfo} companyInfo={companyInfo} />

            {/* Content */}
            <div className="max-h-[calc(100vh-110px)] min-h-[calc(100vh-110px)] min-w-[100vw] max-w-[100vw] md:min-w-[calc(100vw-220px)] md:max-w-[calc(100vw-220px)]">
                <div className="flex items-start pl-1 overflow-y-auto max-h-[calc(100vh-110px)] min-h-[calc(100vh-110px)] ">
                    {setActiveTab()}
                </div>
                <div className="flex justify-end items-center sticky bottom-0 p-3 space-x-4 bg-white border-t border-gray-300">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md border border-gray-300 text-[13px] font-semibold"
                        onClick={onClickSave}>
                        Áp dụng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TagCategory;
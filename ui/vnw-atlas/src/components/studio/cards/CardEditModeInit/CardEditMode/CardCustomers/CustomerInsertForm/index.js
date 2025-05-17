import ImageLoadingBoard from "@/components/studio/common/ImageLoadingBoard";
import ElementSingleText from "@/components/studio/common/textInputs/ElementSingleText";
import InsertNoticeText from "@/components/studio/common/InsertNoticeText";
import { useTranslations } from "next-intl";


/**
 * Default input template for the partner card
 * @param {*} param0 
 * @returns 
 */
const CustomerInsertForm = ({ object, callback }) => {
    const t = useTranslations('trans');

    const inputCallback = (key, value) => {
        callback({...object, [key]: value});
    };

    return (
        <div>
            <form className="grid grid-cols-2 gap-3 max-w-[400px]">
                <div className="col-span-2">
                    <InsertNoticeText
                        header={t("studio.card.edit.header")}
                        content={
                            <>
                                * {t("studio.card.edit.m1")}<br /><br />
                                * {t("studio.card.edit.m2")}
                            </>
                        }
                    />
                </div>
                <div className="flex items-center mb-6 col-span-2 space-x-4">
                    <ImageLoadingBoard
                        label={t("studio.card.edit.sel")}
                        aditionalClasses='h-20 w-24'
                        callback={inputCallback.bind(this, "custLogo")}
                        defaultValue=''
                    />
                </div>

                <div className="col-span-2">
                    <ElementSingleText callback={inputCallback.bind(this, "custName")} defaultValue=''
                        options={{ text: t("studio.card.edit.custname"), holder: t("studio.card.edit.custholder"), isRequired: true, limmit: 200}} />
                </div>
                <div>
                    <ElementSingleText callback={inputCallback.bind(this, "taxcode")} defaultValue=''
                        options={{ text: t("tax_code"), holder: t("studio.card.edit.taxholder") }} />
                </div>

                <div className="mt-3 col-span-2">
                    <ElementSingleText callback={inputCallback.bind(this, "custAddress")} defaultValue=''
                        options={{ text: t("address"), holder: t("studio.card.edit.addrrholder")}} />
                </div>

                
            </form>
        </div>
    );
};

export default CustomerInsertForm;
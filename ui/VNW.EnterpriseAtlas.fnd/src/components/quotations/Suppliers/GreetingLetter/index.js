// import { useReducer } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useRFQSupliersContext } from "../../../../contexts/RFQSuppliersContext";
import AboutMe from "./AboutMe";
import SupplierProfile from "./SupplierProfile";


const GreatingLetter = () => {
    const { t } = useTranslation();
    const { state } = useRFQSupliersContext();


    const GreatingLetterHeader = () => {
        return (
            < div className="mb-6 pb-4 border-b border-gray-200" >
                <h1 className="text-2xl font-bold text-blue-600 mb-2">{t("suppliers.greeting")}</h1>
                <p className="text-gray-700">
                    <Trans
                        i18nKey="suppliers.description"
                        components={{
                            1: <span className="text-blue-500 font-semibold">{state.quoteData.customerName}</span>
                        }}
                    />
                </p>
            </div >
        );
    }
    return (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-blue-100">
            <GreatingLetterHeader />
            <div className="flex flex-col md:flex-row gap-6">
                <SupplierProfile />
                {/* <div className="md:w-3/5"> */}
                <AboutMe />
            </div>

        </div>
    );
}

export default GreatingLetter;
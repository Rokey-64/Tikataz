import { useTranslations } from "next-intl";
import formatDate from "@/services/formatDate";

const CustomerIntro = ({ quoteData }) => {
    const t = useTranslations('trans');

    return (
        <div className="mb-8 border-b pb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{quoteData.quoteTitle}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-600"><span className="font-semibold">{t("customer")}:</span> {quoteData.customerName}</p>
                    <p className="text-gray-600"><span className="font-semibold">{t("tax_code")}:</span> {quoteData.taxCode}</p>
                    <p className="text-gray-600"><span className="font-semibold">{t("created_date")}:</span> {formatDate(quoteData.createdAt)}</p>
                    <p className="text-gray-600"><span className="font-semibold">{t("end_date")}:</span> {formatDate(quoteData.expiryDate)}</p>
                </div>
                <div>
                    <p className="text-gray-600"><span className="font-semibold">{t("address")}:</span> {quoteData.address}</p>
                </div>
            </div>

            {quoteData.notes && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <h3 className="font-semibold text-yellow-800 mb-1">{t("customer_note")}:</h3>
                    <p className="text-yellow-700">{quoteData.notes}</p>
                </div>
            )}
        </div>
    );
}

export default CustomerIntro;
import { MdAddBox } from "react-icons/md";
import { IoBarChart } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";
import PanelButton from "../../common/PanelButton";
import HeaderDisplay from "../../common/HeaderDisplay";
import { useRouter } from 'next/navigation';
import { debounce } from "lodash";
import { useCallback } from "react";
import getQuoteInitAPI from "../../../../api/getQuoteInit";
import { useTranslations } from "next-intl";

/**
 * Display a panel listing the quotation types
 * @returns 
 */
const RequestForQuotation = () => {
    const t = useTranslations('trans');
    const router = useRouter();

    const createQuotation = useCallback(debounce(() => {
        // Call the API to get the quote ID
        getQuoteInitAPI().then((id) => {
            if (id) {
                router.push(`/rfq/dashboard/pricing?id=${id}`);
            }
        }
        ).catch((error) => {
            router.push("/err");
        });
        
    }, 1000), []);

    const createQuotationEvent = () => {
        createQuotation();
    }

    return (
        <div>
            <HeaderDisplay title={t("rfq_create")} />
            <div className="flex flex-wrap justify-start items-center w-full h-full space-x-4 ">
                <PanelButton icon={MdAddBox}
                    imgBg={<IoMdAdd className="text-[60px] text-green-700" />}
                    content={t("rfq_auto")}
                    grad="bg-gradient-to-b from-blue-400 to-blue-700 "
                    event={createQuotationEvent} />
                <PanelButton icon={MdAddBox} imgBg={<MdPersonSearch className="text-[60px] text-blue-500" />} content={t("rfq_find_provider")} grad="bg-gradient-to-b from-[#a855f7] to-[#7c3aed]" />
                <PanelButton icon={MdAddBox} imgBg={<IoBarChart className="text-[60px] text-red-500" />} content={t("rfq_market_research")} grad="bg-gradient-to-b from-[#FF7EB3] to-[#FF3D68] " />
            </div>
        </div>
    );
};

export default RequestForQuotation;
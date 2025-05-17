
import ReadOnlyText from "../../../common/ReadOnlyText";
import InsertNoticeText from "../../../common/InsertNoticeText";
import { useTranslations } from "next-intl";

/**
 * Display the company information
 * @param {*} param0 
 * @returns 
 */
const CompanyInfoDisplay = ({ profile}) => {
    const t = useTranslations('trans');

    return (
        <div className="min-w-[600px]">
            <div className="flex space-x-6 ">
                <div className="flex flex-col items-center border border-gray-300 rounded-md w-fit h-fit mt-6">
                    <img
                        src={profile.logo || ""}
                        alt="Company Logo"
                        className="w-24 h-24 object-contain m-6 "
                    />
                </div>
                <div className="space-y-2 ">
                    <InsertNoticeText header={t('studio.profiles.conpany.header_01')} content={t('studio.profiles.conpany.content_01')} />
                    <ReadOnlyText label={`${t("company_name")}`} value={profile.name} />
                    <ReadOnlyText label={`${t("tax_code")}`} value={profile.taxCode} />
                    <ReadOnlyText label={`${t("business_licence_date")}`} value={profile.date} />
                    
                </div>
            </div>
            <div className="space-y-2 mt-5">
                <InsertNoticeText header={t('studio.profiles.conpany.header_02')} content={t('studio.profiles.conpany.content_02')} />
                <ReadOnlyText label={`${t("phone")}`} value={profile.phone} />
                <ReadOnlyText label={`${t("fax")}`} value={profile.fax} />
                <ReadOnlyText label={`${t("email")}`} value={profile.email} />
            </div>
            <div className="space-y-2 mt-5">
                <InsertNoticeText header={t('studio.profiles.conpany.header_03')} content={t('studio.profiles.conpany.content_03')} />
                <ReadOnlyText label={`${t("address")}`} value={profile.address} />
                <ReadOnlyText label={`${t("country")}`} value={profile.nation.value} />
            </div>
            <div className="space-y-2 mt-5">
                <InsertNoticeText header={t('studio.profiles.conpany.header_04')} content={t('studio.profiles.conpany.content_04')} />
                <ReadOnlyText label={`${t("bussiness_type")}`} value={profile.businessField} />
                <ReadOnlyText label={`${t("vision")}`} value={profile.vision} />
                <ReadOnlyText label={`${t("mission")}`} value={profile.mission} />
            </div>
        </div>
    );
};

export default CompanyInfoDisplay
import { useState, useEffect } from "react";
import getAtlasCardProfileAPI from "@/api/getAtlasCardProfile";
import { useTranslations } from "next-intl";

const ProfileViewport = ({ card, visible }) => {
    const [profile, setProfile] = useState(null);
    const t = useTranslations('trans');

    function formatDateToDDMMYYYY(dateString) {
        if (!dateString) return "";
    
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {

        if (profile) return;
        if (!visible) return;


        // Fetch the card profile data when the component mounts or when the card prop changes
        const fetchCardProfile = async () => {
            const { uid, cid, ctype } = card;
            const payload = await getAtlasCardProfileAPI(uid, cid, ctype);
            if (!payload) return;
            setProfile(payload);
        };

        fetchCardProfile();
    }
        , [visible]);

    return (
        <div className={`md:col-span-4 space-y-4 sm:space-y-5 ${visible ? 'block' : 'hidden'}`}>
            {/* Body with proper spacing - Business Profile */}
            <div className="p-5 space-y-6">
                {/* Giới thiệu doanh nghiệp */}
                {/* <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-start space-x-3">
                        <span className="text-pink-500 text-xl">🌸</span>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Giới thiệu doanh nghiệp</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                123flower là thương hiệu hàng đầu trong lĩnh vực cung cấp hoa tươi và quà tặng tại Việt Nam và quốc tế.
                                Chúng tôi cam kết mang đến những sản phẩm chất lượng nhất với dịch vụ giao hoa nhanh chóng,
                                đúng hẹn và tận tâm.
                            </p>
                        </div>
                    </div>
                </div> */}

                {/* Thông tin doanh nghiệp */}
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-start space-x-3">
                        <span className="text-blue-500 text-xl">💼</span>
                        <div className="w-full">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t("atlas.tags.company_info")}</h3>
                            <div className="grid grid-cols-1  gap-3">
                                <InfoItem label={t("atlas.tags.company_name")} value={profile?.corpName.toUpperCase()} />
                                <InfoItem label={t("atlas.tags.company_code")} value={profile?.taxcode} />
                                <InfoItem label={t("atlas.tags.company_type")} value="" />
                                <InfoItem label={t("atlas.tags.reg_date")} value={formatDateToDDMMYYYY(profile?.regDate)} />
                                <InfoItem label={t("atlas.tags.major")} value={profile?.bizFields} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trụ sở chính */}
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-start space-x-3">
                        <span className="text-green-500 text-xl">🏢</span>
                        <div className="w-full">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t("atlas.tags.main_office")}</h3>
                            <div className="grid grid-cols-1 gap-3">
                                <InfoItem label={t("atlas.tags.address")} value={profile?.officeAddr}/>
                                <InfoItem label={t("atlas.tags.phone")} value={profile?.phoneNumber}/>
                                <InfoItem label={t("atlas.tags.email")} value={profile?.email}/>
                                <InfoItem label={t("atlas.tags.website")} value={profile?.website}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sứ mệnh & Giá trị */}
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-start space-x-3">
                        <span className="text-yellow-500 text-xl">⭐</span>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t("atlas.tags.mission_value")}</h3>
                            <div className="space-y-2">
                                <p className="text-gray-600 text-sm">
                                    <span className="font-medium">{t("atlas.tags.mission")}:</span> {profile?.vision}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    <span className="font-medium">{t("atlas.tags.value")}:</span> {profile?.mission}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Đội ngũ & Khách hàng */}
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-start space-x-3">
                        <span className="text-red-500 text-xl">👨‍💼</span>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t("atlas.tags.customer")}</h3>
                            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                                <li>Đội ngũ hơn 50 nhân viên và nghệ nhân cắm hoa chuyên nghiệp</li>
                                <li>Hơn 100.000 khách hàng cá nhân và doanh nghiệp</li>
                                <li>Đối tác tiêu biểu: Tiki, Shopee, Grab, Lazada, Samsung</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default ProfileViewport;

// Component phụ trợ hiển thị thông tin chi tiết
const InfoItem = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-3">
        <span className="text-gray-500 text-sm font-medium min-w-[120px]">{label}:</span>
        {value ? (
            <span className="text-gray-700 text-sm mt-1 sm:mt-0">{value}</span>
        ) : (
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-orange-400 text-white shadow-sm border border-orange-500 mt-1 sm:mt-0">
                Chưa cung cấp
            </span>
        )}
    </div>
);
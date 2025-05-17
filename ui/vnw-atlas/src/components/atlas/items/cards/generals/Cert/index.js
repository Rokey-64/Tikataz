import { useState } from 'react';
import { LuAward, LuCalendar, LuClock, LuGlobe, LuHash, LuFocus } from 'react-icons/lu';
import certsTemplate from "@/services/certTemplate";
import { useTranslations } from "next-intl";

const Cert = ({ cert}) => {
    const [isHovered, setIsHovered] = useState(false);
    const t = useTranslations('trans');

    const formatDate = (dateString) => {
        if (!dateString) return null;
        
        const date = new Date(dateString);
        
        // Lấy ngày, tháng, năm
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
      };

    const CertDetails = () => {
        if (!isHovered) return null;
        if (!cert) return null;
        
        return (
            <div className="absolute z-20 mt-2 w-72 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 left-0 animate-fade-in">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <LuAward className="text-indigo-500 text-lg flex-shrink-0" />
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">{cert.certype}</h3>
                            {cert.certProvider && (
                                <p className="text-xs text-gray-500 mt-1">{t("atlas.provided_by")}: {cert.certProvider}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                        <LuHash className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">{t("atlas.cert_code")}</p>
                            <p className="text-sm font-medium text-gray-700 break-all">
                                {cert.certCode || <span className="text-gray-400">{t("atlas.no_code")}</span>}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <LuGlobe className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">{t("atlas.website")}</p>
                            {cert.certWeblink ? (
                                <a 
                                    href={cert.certWeblink.startsWith('http') ? cert.certWeblink : `https://${cert.certWeblink}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-blue-600 hover:underline break-all"
                                >
                                    {cert.certWeblink.replace(/^https?:\/\//, '')}
                                </a>
                            ) : (
                                <span className="text-sm text-gray-400">{t("atlas.no_website")}</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-start gap-3">
                            <LuCalendar className="text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500">{t("atlas.valid_date")}</p>
                                <p className="text-sm font-medium text-gray-700">
                                    {formatDate(cert.certValidDate) || <span className="text-gray-400">--/--/----</span>}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <LuClock className="text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500">{t("atlas.expired_date")}</p>
                                <p className="text-sm font-medium text-gray-700">
                                    {formatDate(cert.certExpiredDate) || <span className="text-gray-400">--/--/----</span>}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {cert.description && (
                    <div className="px-4 pb-4 pt-3 bg-gray-50 border-t border-gray-100">
                        <p className="text-xs text-gray-600">{cert.description}</p>
                    </div>
                )}
            </div>
        );
    };

    const GetCertIcon = () => {
        const certObj = cert && certsTemplate.find((item) => item.name === cert.certype);
        
        if (certObj) {
            return (
                <img 
                    src={`cert/${certObj.path}`} 
                    alt={cert.certype} 
                    className="w-full h-full object-contain rounded-sm" 
                />
            );
        }

        return <LuFocus className="text-gray-400 text-lg" />;
    };

    return (
        <div className="relative">
            <div 
                className="w-6 h-6 m-1 bg-white rounded-md flex justify-center items-center cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:shadow-sm"
                onMouseEnter={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
                {
                    GetCertIcon()
                }
            </div>
            
           {
            CertDetails()
           }
        </div>
    );
};

export default Cert;
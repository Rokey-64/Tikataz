import React from "react";
import Image from 'next/image';
import { useTranslations } from "next-intl";
import certsTemplate from "@/services/certTemplate";
import _ from "lodash";

const BasicCardCerts = ({ card }) => {
    const t = useTranslations('trans');

    const getCertInfo = (cert) => {
        const certInfo = certsTemplate.find(item => item.name === cert.certype);
        return certInfo;
    }

    return (
        <div>
            <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">{t("atlas.certs_group")}</h2>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
                {card.data.certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm min-w-[160px] sm:min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 relative flex-shrink-0">
                            <Image
                                src={`cert/${getCertInfo(cert)?.path}`}
                                alt={cert?.name || "invalid"}
                                width={32}
                                height={32}
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm font-medium text-gray-800">{getCertInfo(cert)?.shortname}</div>
                            <div className="text-[9px] text-gray-500">{getCertInfo(cert)?.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BasicCardCerts;
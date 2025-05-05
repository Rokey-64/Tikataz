import Partner from "../generals/Partner";
import { MdCenterFocusWeak } from 'react-icons/md';
import Cert from "../generals/Cert";
import Badge from "../generals/Badge";
import { useTranslation } from "react-i18next";


/**
 * * This component contains the left bar of the atlas card.
 * @returns 
 */
const LeftBar = ({ card }) => {
    const { t } = useTranslation();

    return (
        <div className="h-full mt-1 ml-1">
            <div>
                <span className="pl-2 text-[12px] font-medium text-[#262424]">{t("atlas.bagdes_group")}</span>
                <div className="grid grid-flow-row grid-cols-3 grid-rows-2 ">
                    {

                        Array(6).fill().map((_, i) => (
                            <Badge key={`${i}`} badge={card.badges?.[i]} />
                        ))
                    }

                </div>
            </div>
            <div className="grid grid-rows-3 row-span-2 space-y-2 mt-4">
                <div>
                    <span className="pl-2 text-[12px] font-medium text-[#262424]">
                        {t("atlas.certs_group")}
                    </span>
                    <div className="grid grid-flow-row grid-cols-4 grid-rows-2 ">
                        {
                            card.data.certificates?.length === 0
                            && <MdCenterFocusWeak className="text-gray-400 text-xl ml-2" />
                        }
                        {
                            card.data.certificates.map((cert, i) => (
                                <Cert key={`${i}`} cert={cert} />
                            )
                            )}
                    </div>
                </div>
                <div className="row-span-2 mt-4">
                    <span className="pl-2 text-[12px] font-medium text-[#262424]">{t("atlas.partner_group")}</span>
                    <div className="grid grid-flow-row grid-cols-3 grid-rows-3 mt-2 h-[7rem]">
                        {
                            card.data.customers?.length === 0 &&
                            <MdCenterFocusWeak className="text-gray-400 text-xl ml-2" />
                        }
                        {
                            card.data.customers.map((cust, i) => (
                                <Partner key={`${i}`} cust={cust} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftBar;
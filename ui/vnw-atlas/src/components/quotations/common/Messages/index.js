import React from 'react';
import InsertNoticeText from '../InsertNoticeText';
import { useTranslations, Trans } from "next-intl";
import Link from 'next/link';

/**
 * Get a message to notify the user about the card
 * @param {*} param0 
 */
const Messages = ({ type }) => {

    switch (type) {
        case 'AutRFQGenerMessage':
            return <AutRFQGenerMessage />
        case 'AutRFQItemsMessage':
            return <AutRFQItemsMessage />
        case 'AutRFQFilterMessage':
            return <AutRFQFilterMessage />
        case 'AutRFQRecentMessage':
            return <AutRFQRecentMessage />
        case 'AutRFQHistoryMessage':
            return <AutRFQHistoryMessage />
        default:
            return <></>


    }
};

const AutRFQHistoryMessage = () => {
    const t = useTranslations("mes");

    return (
        <InsertNoticeText
            header={<p className='text-base'>{t("F0001")}</p>}
            content={
                <div className="text-[14px] font-sans text-justify leading-5 w-[600px]">
                    {
                        t.rich("F0002", {
                            "first": () => <Link href='/' className='text-blue-400 hover:text-blue-600 hover:underline' />
                        })
                    }
                </div>
            }
        />
    );
};

const AutRFQRecentMessage = () => {
    const t = useTranslations("mes");
    const tTrans = useTranslations("trans");
    return (
        <InsertNoticeText
            header={t("D0001")}
            content={
                <div className="text-[14px] font-sans text-justify leading-5">
                    <p>® {t("D0002")}</p>
                    <p> {t("D0003")}</p> <br />
                    <p> ⚠ {tTrans("note")}:</p>
                    <p className='ml-5'>* {t("D0004")}</p><br />
                </div>
            }
        />
    );
};


const AutRFQGenerMessage = () => {
    const t = useTranslations("mes");
    return (
        <InsertNoticeText
            header={t("A0001")}
            content={
                <div className="text-[12px] font-sans text-justify leading-5">
                    <p>{t("A0002")} <br /></p>
                    <p>{t("A0003")}<br />{t("A0004")}<br /></p>
                </div>
            }
        />
    );
};

const AutRFQItemsMessage = () => {
    const t = useTranslations("mes");
    return (
        <InsertNoticeText
            header={t("B0005")}
            content={
                <div className="text-[12px] font-sans text-justify leading-5 space-y-2">
                    <div className='space-y-2'>
                        <div>
                            * <strong>{t("B0006")}</strong><br />
                            {t("B0007")}<br />
                            {t("B0008")}<br />
                            <strong><i>✔ Hashtag</i></strong> {t("B0009")}&nbsp;
                            {t("B0010")}<br />
                        </div>
                        <div>
                            * <strong>{t("B0011")}</strong><br />
                            {t("B0012")}<br />
                            {t("B0013")}&nbsp;
                            <a className='text-blue-600 hover:text-blue-700 hover:underline' href="/" target="_blank">
                                Tikataz Atlas
                            </a>.<br />
                        </div>
                        <div>
                            * <strong>{t("B0014")}</strong><br />
                            {t("B0015")}<br />
                            {t("B0016")}
                        </div>
                    </div>

                </div>
            }
        />
    );
};

const AutRFQFilterMessage = () => {
    const t = useTranslations("mes");
    return (
        <InsertNoticeText
            header={t("C0017")}
            content={
                < div className="text-[12px] font-sans text-justify leading-5 space-y-2" >
                    <p>
                        {t("C0018")}<br />
                        {t("C0019")}
                    </p>
                </div >
            }
        />
    );
};


export default Messages;
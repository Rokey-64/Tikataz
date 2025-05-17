import React from 'react';
import InsertNoticeText from '../InsertNoticeText';
import { useTranslations } from "next-intl";

/**
 * Get a message to notify the user about the card
 * @param {*} param0 
 */
const Messages = ({ type }) => {
    switch (type) {
        case 'ProductMessage':
            return <ProductMessage />
        case 'CertMessage':
            return <CertMessage />
        case 'CertMessage2':
            return <CertMessage2 />
        case "CertInputMessage":
            return <CertInputMessage />
        case "CertRemoveMessage":
            return <CertRemoveMessage />
        case "CategoryMessage":
            return <CategoryMessage />
        case "DelBranchInfoMessage":
            return <DelBranchInfoMessage />
        case "ExpBranchInfoMessage":
            return <ExpBranchInfoMessage />
        case "GeneralProfileMessage":
            return <GeneralProfileMessage />
        case "ManagerMessage":
            return <ManagerMessage />
        case "ManagerListMessage":
            return <ManagerListMessage />
        case "ManagerListMessage2":
            return <ManagerListMessage2 />
        case "BasicSettingMessage":
            return <BasicSettingMessage />
        case "NotifySettingMessage":
            return <NotifySettingMessage />
        case "PrivacySettingMessage":
            return <PrivacySettingMessage />
        default:
            return <></>
    }
};

const PrivacySettingMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText
            header={<strong className="text-[14px]">{t('studio.profiles.settings.privacy.m1')}</strong>}
            content={
                <div className="text-[13px] font-sans text-justify leading-5 space-y-3 text-wrap max-w-[800px]">
                    <p>{t('studio.profiles.settings.privacy.m2')}</p>
                    <p>{t('studio.profiles.settings.privacy.m3')}</p>
                    <p>{t('studio.profiles.settings.privacy.m4')}</p>
                    <h2 ><strong>{t('note_p')}</strong></h2>
                    <p>{t('studio.profiles.settings.privacy.m5')}</p>
                </div>
            }
        />
    )
}

const NotifySettingMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText
            header={<strong className="text-[14px]">{t('studio.profiles.settings.notify.m1')}</strong>}
            content={
                <div className="text-[13px] font-sans text-justify leading-5 space-y-2 text-wrap max-w-[800px]">
                    <p >{t('studio.profiles.settings.notify.m2')}</p>
                    <p>{t('studio.profiles.settings.notify.m3')}</p>
                    <h2 ><strong>{t('note_p')}</strong></h2>
                    <p>{t('studio.profiles.settings.notify.m4')}</p>
                </div>
            }
        />
    )
}

const BasicSettingMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText
            header={<strong className="text-[14px]">{t('studio.profiles.settings.basic.m1')}</strong>}
            content={
                <div className="text-[13px] font-sans text-justify leading-5 space-y-2 w-[50rem]">
                    <p>{t('studio.profiles.settings.basic.m2')}</p>
                    <p>{t('studio.profiles.settings.basic.m3')}</p>
                </div>
            }
        />
    )
}

const ManagerListMessage2 = () => {
    const t = useTranslations("trans");

    return (
        <InsertNoticeText header={<strong className="text-[14px] text-black ">{t('studio.profiles.manager.m16')}</strong>}
            content={
                <div className="text-[13px] text-black font-sans text-justify leading-5 space-y-2">
                    <p>{t('studio.profiles.manager.m17')}</p>
                    <p>{t('studio.profiles.manager.m18')}</p>
                    <p>{t('studio.profiles.manager.m19')}</p>
                </div>
            }
        />
    )
}

const ManagerListMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText header={<strong>{t('studio.profiles.manager.m10')}</strong>}
            content={
                <div className="w-[35rem] space-y-1 space-x-1">
                    <h2><strong>{t('studio.profiles.manager.m11')}</strong></h2>
                    <p>{t('studio.profiles.manager.m12')}p</p>
                    <p>{t('studio.profiles.manager.m13')}</p>
                    <p>{t('studio.profiles.manager.m14')}</p>
                    <br />
                    <h2 ><strong>{t('note_p')}</strong></h2>
                    <p>{t('studio.profiles.manager.m15')}</p>
                </div>
            }
        />
    )

}

const ManagerMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText header={<strong className="text-[14px] text-black ">{t('studio.profiles.manager.m1')}</strong>}
            content={
                <div className="text-[13px] text-black font-sans text-justify leading-5 space-y-2">
                    <p>{t('studio.profiles.manager.m2')}</p>
                    <p>{t('studio.profiles.manager.m3')}</p>
                    <p>{t('studio.profiles.manager.m4')}</p>
                </div>
            }
        />
    )
}

const GeneralProfileMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText header={<strong>{t('studio.profiles.conpany.mess01')}</strong>}
            content={
                <div className="w-[35rem] space-y-1 space-x-1">
                    <h2><strong>{t('studio.profiles.conpany.mess02')}</strong></h2>
                    <p>
                        {t('studio.profiles.conpany.mess03')}
                        <br />
                        {t('studio.profiles.conpany.mess04')}
                    </p>
                    <br />
                    <h2><strong>{t('studio.profiles.conpany.mess05')}</strong></h2>
                    <p>{t('studio.profiles.conpany.mess06')}</p>
                    <p>{t('studio.profiles.conpany.mess07')}</p>
                    <p>{t('studio.profiles.conpany.mess08')}</p>
                    <br />
                    <h2 ><strong>{t('studio.profiles.conpany.mess09')}</strong></h2>
                    <p>{t('studio.profiles.conpany.mess10')}</p>
                </div>
            }
        />
    )
};

const DelBranchInfoMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText header={<strong className="text-[14px] text-black ">{t('studio.profiles.branches.mess01')}</strong>}
            content={
                <div className="text-[13px] text-black font-sans text-justify leading-5 space-y-2">
                    <p>{t('studio.profiles.branches.mess02')}</p>
                    <p>{t('studio.profiles.branches.mess03')}</p>
                    <p>{t('studio.profiles.branches.mess04')}</p>
                </div>
            }
        />
    );
};

const ExpBranchInfoMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText header={<strong>{t('studio.profiles.branches.mess05')}</strong>}
            content={
                <div className="w-[35rem] space-y-1 space-x-1">
                    <h2><strong>{t('studio.profiles.branches.mess06')}</strong></h2>
                    <p>{t('studio.profiles.branches.mess07')}</p>
                    <p>{t('studio.profiles.branches.mess08')}</p>
                    <p>{t('studio.profiles.branches.mess09')}</p>
                    <br />
                    <h2 ><strong>{t('studio.profiles.branches.mess10')}</strong></h2>
                    <p>{t('studio.profiles.branches.mess11')}</p>
                </div>
            }
        />
    );
};

const CategoryMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText
            header={t('studio.card.category.mess01')}
            content={
                <div className="text-[12px] font-sans text-justify leading-5 space-y-2 ml-6 w-[1000px]">
                    <p>
                        {t('studio.card.category.mess02')}<br />
                        {t('studio.card.category.mess03')}<br />
                        {t('studio.card.category.mess04')}<br />

                    </p>
                </div>
            }
        />
    );
};

const CertRemoveMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText header={<strong className="text-[12px] ">{t('studio.card.cert.m01')}</strong>}
            content={
                <div className="text-[12px] font-sans text-justify leading-5 space-y-2">
                    <p>{t('studio.card.cert.m02')}</p>
                </div>
            }
        />
    );
};


const CertInputMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText header={<strong className="text-[12px] ">{t('studio.card.cert.m03')}</strong>}
            content={
                <div className="text-[12px] font-sans text-justify leading-5 space-y-2">
                    <p>{t('studio.card.cert.m04')}<br />
                        {t('studio.card.cert.m05')}<br />
                        {t('studio.card.cert.m06')}
                    </p>
                </div>
            }
        />
    );
};

const CertMessage2 = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText
            header={t('studio.card.cert.m07')}
            content={
                <>
                    {t('studio.card.cert.m08')}<br />
                    <strong>{t('studio.card.cert.m09')}</strong> {t('studio.card.cert.m10')}<br />
                    <strong>{t('studio.card.cert.m11')}</strong>{t('studio.card.cert.m12')}<br /><br />
                </>
            }
        />
    );
};

const CertMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText
            header={t('studio.card.cert.m13')}
            content={
                <>
                    {t('studio.card.cert.m14')}<br /><br />
                    *<b> {t('studio.card.cert.m15')}</b> {t('studio.card.cert.m16')}<br />
                    {t('studio.card.cert.m17')}<br />
                    {t('studio.card.cert.m18')}<br /><br />

                </>
            }
        />
    );
};

const ProductMessage = () => {
    const t = useTranslations('trans');

    return (
        <InsertNoticeText
            header={t('studio.card.cert.m19')}
            content={
                <>
                    {t('studio.card.cert.m20')}<br />
                    <strong>{t('studio.card.cert.m21')}</strong> {t('studio.card.cert.m22')}<br />
                    <strong>{t('studio.card.cert.m23')}</strong> {t('studio.card.cert.m24')}<br />
                    <strong>{t('studio.card.cert.m25')}</strong> {t('studio.card.cert.m26')}<br /><br />

                    {/* * Lưu ý: Nếu bạn không cung cấp thêm, mặc định sẽ lấy thông tin từ hồ sơ của bạn. Vui lòng hoàn tất hồ sơ của bạn. */}
                </>
            }
        />
    );
};



export default Messages;
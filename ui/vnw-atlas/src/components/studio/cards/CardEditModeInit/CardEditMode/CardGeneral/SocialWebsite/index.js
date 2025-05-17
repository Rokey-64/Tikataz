import { useState, useEffect, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGeneral } from "@/redux/cardsSlice";
import InsertNoticeText from "@/components/studio/common/InsertNoticeText";
import TextSingleInput from "@/components/studio/common/TextSingleInput";
import debounce from "lodash.debounce";
import { useTranslations } from "next-intl";

/**
 * This component is used to get the social network information of a company
 * @returns 
 */
const SocialWebsite = () => {
    const t = useTranslations("trans");
    const dispatch = useDispatch();
    const general = useSelector(state => state.cards.general);
    const [social, setSocial] = useState({
        facebook: "",
        youtube: "",
        tiktok: "",
        instagram: "",
        twitter: "",
        linkedin: ""
    });

    useEffect(() => {
        setSocial({
            facebook: general.social.find(s => s.type === 'facebook')?.link || "",
            youtube: general.social.find(s => s.type === 'youtube')?.link || "",
            tiktok: general.social.find(s => s.type === 'tiktok')?.link || "",
            instagram: general.social.find(s => s.type === 'instagram')?.link || "",
            twitter: general.social.find(s => s.type === 'twitter')?.link || "",
            linkedin: general.social.find(s => s.type === 'linkedin')?.link || ""

        });
    }, [general]);

    const socialDebounced = useCallback(debounce((general, key, value) => {
        const nSocial = general.social.filter(s => s.type !== key);
        nSocial.push({type: key, link: value});
        dispatch(setGeneral({
            ...general,
            social: nSocial
        }));
    }, 500), [dispatch]);

    const callback = (general, key, value) => {
        socialDebounced(general, key, value);
        setSocial({...social, [key]: value});
    };

    return (
        <>
            <div className="col-span-2 mt-2 max-w-[700px]">
                <InsertNoticeText
                    header={t("studio.card.gen.socical")}
                    content={t("studio.card.gen.m7")}
                />
            </div>
            
            <TextSingleInput title="Facebook" type="text" content={social.facebook} callback={callback.bind(this, general, 'facebook')} imgsrc="/social/facebook.svg"/>
            <TextSingleInput title="Youtube" type="text" content={social.youtube} callback={callback.bind(this, general, 'youtube')} imgsrc="/social/youtube.svg"/>
            <TextSingleInput title="tiktok" type="text" content={social.tiktok} callback={callback.bind(this, general, 'tiktok')} imgsrc="/social/tiktok.svg"/>
            <TextSingleInput title="Instagram" type="text" content={social.instagram} callback={callback.bind(this, general, 'instagram')} imgsrc="/social/instagram.svg"/>
            <TextSingleInput title="Twitter" type="text" content={social.twitter} callback={callback.bind(this, general, 'twitter')} imgsrc="/social/twitch.svg"/>
            <TextSingleInput title="Linkedin" type="text" content={social.linkedin} callback={callback.bind(this, general, 'linkedin')} imgsrc="/social/linkedin.svg"/>
        </>
    );
};

export default SocialWebsite;
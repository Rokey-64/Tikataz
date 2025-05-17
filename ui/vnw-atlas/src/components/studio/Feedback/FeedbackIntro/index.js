import { first } from "lodash";
import { useTranslations } from "next-intl";

const FeedbackIntro = () => {
    const t = useTranslations('trans');

    return (
        <div className="w-[29rem] space-y-3 space-x-1">
            <h2><strong></strong></h2>
            <p>{t("studio.profiles.feedback.m1")}</p>
            <p>
                {
                    t.rich("studio.profiles.feedback.m2", {
                        first: (chunks) => (
                            <a
                                href="tel:0333462905"
                                className="hover:text-blue-500 text-blue-400 underline"
                            >
                                <i>{chunks}</i>
                            </a>
                        ),
                    })
                }
            </p>
            <br />
            <h2 ><strong>{t("note_p")}</strong></h2>
            <p>
                {
                    t.rich("studio.profiles.feedback.m3", {
                        first: (chunks) => (
                            <a href="/" className="hover:text-blue-500 text-blue-400 underline">
                                {chunks}
                            </a>
                        ),
                    })
                }
            </p>
            <p>{t("studio.profiles.feedback.m4")}</p>
            <p>
                {
                    t.rich("studio.profiles.feedback.m5", {
                        first: (chunks) => (
                            <a href="/" className="hover:text-blue-500 text-blue-400 underline">
                                {chunks}
                            </a>
                        ),
                    })
                }
            </p>
        </div>
    );
};

export default FeedbackIntro;
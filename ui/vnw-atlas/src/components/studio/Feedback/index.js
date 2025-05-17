import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import FeedbackContainer from "./FeedbackContainer";
import AboveFixedContainer from "../common/AboveFixedContainer";
import AboveInsertedButton from "../common/AboveInsertedButton";
import InsertNoticeText from "../common/InsertNoticeText";
import FeedbackIntro from "./FeedbackIntro";
import SaveFeedback from "../../../api/saveFeedback";
import DelayedRoute from "../../../services/routeDelay";
import { useTranslations } from "next-intl";

const Feedback = () => {
    const t = useTranslations('trans');
    const [feedback, setFeedback] = useState({ content: '', emailNotify: true });
    const [showAddBox, setShowAddBox] = useState(false);

    /**
     * This function will be called when the user click on the "Tạo phản hồi" button
     */
    const addCallback = () => {
        setShowAddBox(true);
    }

    /**
     * This function will be called when the textarea content is changed
     * @param {*} e 
     */
    const textChange = (e) => {
        setFeedback({ ...feedback, content: e.target.value });
    }

    /**
     * This function will be called when the checkbox is changed
     * @param {*} e
     * @returns
     */
    const emailNotifyChange = (e) => {
        setFeedback({ ...feedback, emailNotify: e.target.checked });
    }

    /**
     * This function will be called when the user click on the "gửi" button
     */
    const sendCallback = async () => {
        if (feedback.content === '') {
            alert(t("feedback_retuire_content"));
            return;
        }
        SaveFeedback(feedback).then((response) => {
            if (response) {
                setShowAddBox(false);
                setFeedback({ content: '', emailNotify: false });
            }
        });
    }

    return (
        <DelayedRoute>
            <div className="md:ml-10 pt-14 md:pt-6">
                {
                    showAddBox &&
                    <FeedbackContainer setShowBranch={setShowAddBox} closeCallback={() => setShowAddBox(false)} saveCallback={sendCallback}>
                        <div className="mr-10">
                            <InsertNoticeText header={<strong>{t("feedback_remark")}</strong>}
                                content={<FeedbackIntro />}
                            />
                            <div className="mt-5 space-y-5 font-sans text-[13px]">
                                <div>
                                    <h3>{t("feedback_content")}</h3>
                                    <textarea className="w-[28rem] h-[8rem] border-blue-800 rounded-md shadow-sm focus:ring-1 ring-1 p-3 m-2"
                                        placeholder={t("feedback_content_placeholder")}
                                        value={feedback.content}
                                        onChange={textChange}
                                    />
                                </div>

                                <div className="flex items-center space-x-2 ">
                                    <input type="checkbox" className="h-5 w-5"
                                        checked={feedback.emailNotify}
                                        onChange={emailNotifyChange} />
                                    <label className="ml-3">{t("feedback_email_confirm")}</label>
                                </div>
                            </div>
                        </div>
                    </FeedbackContainer>
                }

                <AboveFixedContainer>
                    <div className="flex items-center justify-end space-x-10 ">
                        <AboveInsertedButton content={t("create_feedback")} options={{ icon: IoAdd }} callback={addCallback} />

                    </div>
                </AboveFixedContainer>

                <div className="mt-5 px-2 overflow-y-auto overflow-x-auto max-h-[calc(100vh-8.5rem)] max-w-[calc(100vw-10px)] md:max-w-[calc(100vw-270px)] bg-[#fdfdfd] [clip-path:inset(0px_0px_0px_0px)]">
                    <div className=" min-h-[calc(100vh-9.25rem)]" style={{ width: 'fit-content' }}>
                        <div>
                            <InsertNoticeText header={<strong>{t("feedback_content2")}</strong>}
                                content={<FeedbackIntro />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DelayedRoute>
    );
};

export default Feedback;
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import FeedbackContainer from "./feedback_container";
import AboveFixedContainer from "../common/above_fixed_container";
import AboveInsertedButton from "../common/above_inserted_button";
import InsertNoticeText from "../insert_notice"
import FeedbackIntro from "./feedback_intro";
import SaveFeedback from "../../../api/saveFeedback";
import DelayedRoute from "../../../services/routeDelay";

const Feedback = () => {
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
            alert('Vui lòng nhập nội dung phản hồi');
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
            <div className="ml-10 mt-6">
                {
                    showAddBox &&
                    <FeedbackContainer setShowBranch={setShowAddBox} closeCallback={() => setShowAddBox(false)} saveCallback={sendCallback}

                        children={
                            <div className="mr-10">
                                <InsertNoticeText header={<strong>Hãy giúp chúng tôi cải thiện tốt hơn</strong>}
                                    content={<FeedbackIntro />}
                                />
                                <div className="mt-5 space-y-5 font-sans text-[13px]">
                                    <div>
                                        <h3>Mô tả ý kiến phản hồi của bạn</h3>
                                        <textarea className="w-[28rem] h-[8rem] border-blue-800 rounded-md shadow-sm focus:ring-1 ring-1 p-3 m-2"
                                            placeholder="Hãy cho chúng tôi biết điều gì khiến bạn đưa ra ý kiến này."
                                            value={feedback.content}
                                            onChange={textChange}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2 ">
                                        <input type="checkbox" className="h-5 w-5"
                                            checked={feedback.emailNotify}
                                            onChange={emailNotifyChange} />
                                        <label className="ml-3">Chúng tôi có thể gửi yêu cầu qua email của bạn để xác nhận thêm thông tin.</label>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                }

                <AboveFixedContainer
                    children={
                        <div className="flex items-center justify-end space-x-10 ">
                            <AboveInsertedButton content="Tạo phản hồi" options={{ icon: IoAdd }} callback={addCallback} />

                        </div>
                    }
                />

                <div className="mt-5 px-2 overflow-y-auto overflow-x-auto max-h-[calc(100vh-8.5rem)] max-w-[calc(100vw-10px)] md:max-w-[calc(100vw-270px)] bg-[#fdfdfd] [clip-path:inset(0px_0px_0px_0px)]">
                    <div className=" min-h-[calc(100vh-9.25rem)]" style={{ width: 'fit-content' }}>
                        <div>
                            <InsertNoticeText header={<strong>Gửi phản hồi để cập nhật ý kiến, khiếu nại, và đề xuất để giúp chúng tôi cải thiện tốt hơn</strong>}
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
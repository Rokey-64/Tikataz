import { useState, useEffect } from "react";
import { MdNotificationsActive } from "react-icons/md";
import AboveFixedContainer from "../../common/AboveFixedContainer/index";
import InsertNoticeText from "../../common/InsertNoticeText";
import RadioOptionButton from "../../common/RadioOptionButton";
import loadQuestionSettingsAPI from "@/api/loadQuestionSettings";
import ApplyButton from "../ApplyButton";
import UpdateQuestionSettings from "@/api/updateQuestionSettings";
import DelayedRoute from "@/services/routeDelay";

/**
 * Notify setting component
 * @returns 
 */
const NotifySetting = () => {

    const [changedAnswers, setChangedAnswers] = useState([
        /**
         * {
         * "id": 1, - the question id
         * "val": "1" - the changed answer
         * }
         */
    ]);

    const [privacySettings, setPrivacySettings] = useState([
        /** Example Data structure
         * {
         *  "id": 1,
         *  "question": "Cho phép chúng tôi hiện thị công khai số điện thoại đã được cung cấp trên \u003CInlineLinkText text=\"hồ sơ doanh ngiệp\" link=\"/me/general?tab=info\" /\u003E  đến với mọi người",
         *  "defaultAnswer": 1,
         *  "labels": [
         *    {
         *      "id": "1",
         *      "value": "Có"
         *    },
         *    {
         *      "id": "2",
         *      "value": "Không"
         *    },
         *    {
         *      "id": "3",
         *      "value": "Chỉ hiện thị với đối tượng có tài khoản xác thực"
         *    }
         *  ]
         *  }
         */
    ]);

    /** Load the privacy setting data */
    useEffect(() => {
        const key = "announce";
        loadQuestionSettingsAPI(key).then(data => {
            if (data[key]) {
                setPrivacySettings(data[key]);
            }
        });
    }, []);

    /**
     * Radio on change event
     */
    const radioOnChange = (e) => {
        const answers = changedAnswers.filter(question => question.id !== e.target.name);
        answers.push({ "id": e.target.name, "val": e.target.value });
        setChangedAnswers(answers);
    }

    /**
     * Apply the changes
     */
    const applyOnclick = () => {
        UpdateQuestionSettings("announce", changedAnswers).then((data) => {
            if (data) {
                setChangedAnswers([]);
            }
        });
    }

    return (
        <DelayedRoute>
            <div className="flex flex-col min-h-[calc(100vh-5.5rem)]">
                <AboveFixedContainer
                    children={
                        <div className="flex my-4 space-x-3">
                            <MdNotificationsActive className="text-[22px] text-yellow-500" />
                            <h1 className="font-semibold ">Thiết lập thông báo</h1>
                        </div>
                    } />

                <div className="overflow-y-auto min-h-[calc(100vh-180px)] max-h-[calc(100vh-180px)] min-w-[calc(100vw-9px)] max-w-[calc(100vw-9px)]
                            md:min-w-[calc(100vw-268px)] md:max-w-[calc(100vw-268px)]"
                >
                    <InsertNoticeText
                        header={<strong className="text-[14px]">Thiết lập thông báo hỗ trợ bạn điều gì?</strong>}
                        content={
                            <div className="text-[13px] font-sans text-justify leading-5 space-y-2 text-wrap max-w-[800px]">
                                <p > Hệ thống chúng tôi sẽ tự động mặc định gửi thông báo đến với bạn thông qua thông tin liên lạc mà bạn cung cấp ở mục hồ sơ
                                    hoặc mục thẻ Tag của bạn.
                                    Chúng tôi sẽ gửi thông báo ở các tác vụ sẽ được liệt kê ở phần thiết lập bên dưới khi cần thiết.
                                </p>
                                <p>Điều này giúp bạn tiếp cận thông tin cập nhật cách nhanh nhất có thể. Tuy nhiên, bạn có thể thiết lập những thông báo sẽ được nhận
                                    thông qua mục thiết lập bên dưới.
                                </p>
                                <h2 ><strong>⚠ Lưu ý:</strong></h2>
                                <p>Điều này không bao gồm các tác vụ mang tính cấp thiết, ví dụ như thông báo về việc xác minh tài khoản, thông báo về việc
                                    thay đổi điều khoảng sử dụng dịch vụ, thông báo về việc thay đổi quyền riêng tư, thông báo về việc thay đổi thông tin, ...
                                </p>
                            </div>
                        }
                    />
                    <div className="flex flex-wrap">
                        {privacySettings.map((item, index) => (
                            <RadioOptionButton data={item} key={index} callback={radioOnChange} />
                        ))}
                    </div>
                </div>

                <div className="sticky bottom-0 flex justify-end items-center bg-white p-3 border-t border-gray-300">
                    <ApplyButton onClick={applyOnclick} hasChanged={changedAnswers.length > 0 ? true : false} />
                </div>
            </div>
        </DelayedRoute>
    )
};

export default NotifySetting;
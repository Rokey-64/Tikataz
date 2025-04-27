import { useState, useEffect } from "react";
import AboveFixedContainer from "../../common/AboveFixedContainer/index";
import { MdPrivacyTip } from "react-icons/md";
import InsertNoticeText from "../../common/InsertNoticeText/index";
import RadioOptionButton from "../../common/RadioOptionButton/index";
import loadQuestionSettings from "../../../../api/loadQuestionSettings";
import ApplyButton from "../ApplyButton";
import UpdateQuestionSettings from "../../../../api/updateQuestionSettings";
import DelayedRoute from "../../../../services/routeDelay";

const PrivacySetting = () => {

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
        const key = "privacy";
        loadQuestionSettings(key).then(data => {
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
        UpdateQuestionSettings("privacy", changedAnswers).then((data) => {
            if (data) {
                setChangedAnswers([]);
            }
        });
    }

    return (
        <DelayedRoute>
            <div className="flex flex-col ">
                <AboveFixedContainer
                    children={
                        <div className="flex my-4 space-x-3">
                            <MdPrivacyTip className="text-xl text-blue-400" />
                            <h1 className="font-semibold ">Thiết lập quyền riêng tư</h1>


                        </div>
                    } />

                <div className="overflow-y-auto min-h-[calc(100vh-180px)] max-h-[calc(100vh-180px)] min-w-[calc(100vw-9px)] max-w-[calc(100vw-9px)]
                            md:min-w-[calc(100vw-268px)] md:max-w-[calc(100vw-268px)]"
                >
                    <InsertNoticeText
                        header={<strong className="text-[14px]">Thiết lập quyền riêng tư hộ trợ bạn điều gì?</strong>}
                        content={
                            <div className="text-[13px] font-sans text-justify leading-5 space-y-3 text-wrap max-w-[800px]">
                                <p>✔ Giúp bạn quản lý quyền truy cập và chia sẽ thông tin của bạn đối với hồ sơ của mình</p>
                                <p>✔ Đảm bảo quyền bảo vệ thông tin cá nhân của bạn, và cung cấp cho chung tôi biết về cách thức bạn triển
                                    khai thông tin của mình
                                </p>
                                <p>
                                    ✔ Các thông tin nhạy cảm như email, số điện thoại, địa chỉ sẽ được bảo vệ chặt chẽ và không được chia sẻ
                                    nếu bạn không muốn
                                </p>
                                <h2 ><strong>⚠ Lưu ý:</strong></h2>
                                <p>Quyền truy cập thông tin có thể trách sự lợi dụng của các đối tượng, tuy nhiên điều này cũng có thể gây ảnh hưởng
                                    đến việc kết nối với đối tác tiềm năng. Chúng tôi khuyến khích bạn cân nhắc kỹ trước khi thay đổi quyền riêng tư,
                                    đồng thời cũng sẽ hỗ trợ để các đối tác kết nối với bạn là đối tác tiềm năng nhất có thể.
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
    );
};

export default PrivacySetting;
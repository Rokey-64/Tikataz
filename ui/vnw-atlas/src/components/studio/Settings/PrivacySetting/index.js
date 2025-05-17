'use client'

import { useState, useEffect } from "react";
import AboveFixedContainer from "../../common/AboveFixedContainer/index";
import { MdPrivacyTip } from "react-icons/md";
import InsertNoticeText from "../../common/InsertNoticeText/index";
import RadioOptionButton from "../../common/RadioOptionButton/index";
import loadQuestionSettings from "@/api/loadQuestionSettings";
import ApplyButton from "../ApplyButton";
import UpdateQuestionSettings from "@/api/updateQuestionSettings";
import DelayedRoute from "@/services/routeDelay";
import Messages from "../../common/Messages";
import { useTranslations } from "next-intl";

const PrivacySetting = () => {
    const t = useTranslations('trans');

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
                <AboveFixedContainer>
                    <div className="flex my-4 space-x-3">
                        <MdPrivacyTip className="text-xl text-blue-400" />
                        <h1 className="font-semibold ">{t('studio.profiles.settings.privacy.header')}</h1>
                    </div>
                </AboveFixedContainer>

                <div className="overflow-y-auto 
                            min-w-[calc(100vw-20px)] max-w-[calc(100vw-20px)]
                            md:min-w-[calc(100vw-280px)] md:max-w-[calc(100vw-280px)]
                            max-h-[calc(100vh-215px)] min-h-[calc(100vh-215px)]"
                            >
                    <Messages type="PrivacySettingMessage" />
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
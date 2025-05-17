'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguages, setTimezones } from "@/redux/optionsSlice";
import { FiSettings } from "react-icons/fi";
import AboveFixedContainer from "../../common/AboveFixedContainer/index";
import SelectBox from "../../common/SelectBox";
import LanguageCategoryAPI from "@/api/languageCategory";
import TimezoneCategoryAPI from "@/api/timezoneCategory";
import LoadBasicSettingsAPI from "@/api/loadBasicSettings";
import UpdateBasicSettingsAPI from "@/api/updateBasicSettings";
import ApplyButton from "../ApplyButton";
import DelayedRoute from "@/services/routeDelay";
import Messages from "../../common/Messages";
import { useTranslations } from "next-intl";

const BasicSetting = () => {
    const t = useTranslations('trans');
    const dispatch = useDispatch();
    const languages = useSelector((state) => state.options.languages);
    const timeZones = useSelector((state) => state.options.timezones);
    const [basicSettings, setBasicSettings] = useState({});
    const [alterBasicSettings, setAlterBasicSettings] = useState({});
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        /**Load languages if not exists */
        if (languages.length === 0) {
            LanguageCategoryAPI().then((data) => {
                if (data) {
                    dispatch(setLanguages(data.languages));
                }
            });
        }

        /**Load timezones if not exists */
        if (timeZones.length === 0) {
            TimezoneCategoryAPI().then((data) => {
                if (data) {
                    dispatch(setTimezones(data.timezones));
                }
            });
        }

        /**Loads the default setting */
        LoadBasicSettingsAPI().then((data) => {
            if (data?.basic) {
                setBasicSettings({ ...data.basic });
                setAlterBasicSettings({ ...data.basic });
            }
        });
    }, []);

    /**
     * Raising when the language is changed
     * @param {*} id - the nation id
     */
    const languageCallback = (id) => {
        setAlterBasicSettings({ ...alterBasicSettings, lang_id: id });
        setIsChanged(hasChanged(basicSettings, { ...alterBasicSettings, lang_id: id }));
    }

    /**
     * Raising when the timezone is changed
     * @param {*} id - the timezone id
     */
    const timezoneCallback = (id) => {
        setAlterBasicSettings({ ...alterBasicSettings, timezone_id: id });
        setIsChanged(hasChanged(basicSettings, { ...alterBasicSettings, timezone_id: id }));
    }

    /**
     * Check if the basic setting is already changed
     * @returns 
     */
    const hasChanged = (rootJson, alterJson) => {
        for (const key of Object.keys(rootJson)) {
            if ((rootJson[key] ?? '').toString() !== (alterJson[key] ?? '').toString()) {
                return true;
            }
        };
        return false;
    }

    /**
     * Save the changes
     */
    const applyOnclick = () => {
        UpdateBasicSettingsAPI(alterBasicSettings).then((data) => {
            if (data) {
                setBasicSettings({ ...alterBasicSettings });
                setIsChanged(false);
            }
        });
    }

    return (
        <DelayedRoute>
            <div>
                <AboveFixedContainer>
                    <div className="flex my-4 space-x-3">
                        <FiSettings className="text-xl" />
                        <h1 className="font-semibold">{t('studio.profiles.settings.basic.header')}</h1>
                    </div>
                </AboveFixedContainer>
                <div className="overflow-y-auto 
                            min-w-[calc(100vw-20px)] max-w-[calc(100vw-20px)]
                            md:min-w-[calc(100vw-280px)] md:max-w-[calc(100vw-280px)]
                            max-h-[calc(100vh-215px)] min-h-[calc(100vh-215px)]"
                            >
                    <Messages type="BasicSettingMessage" />

                    <h2 className="font-sans text-base  my-2">{t('studio.profiles.settings.basic.timezone')}</h2>
                    <SelectBox header="Ngôn ngữ"
                        object={languages.map((lang) => ({ value: lang.id, label: lang.language }))}
                        defaultValue={basicSettings.lang_id}
                        callback={languageCallback} />
                    <SelectBox
                        header="Múi giờ"
                        object={timeZones.map((timezone) => ({ value: timezone.id, label: timezone.timezone }))}
                        defaultValue={basicSettings.timezone_id}
                        callback={timezoneCallback}
                    />
                    <h2 className="font-sans text-base mb-2 mt-10">{t('studio.profiles.settings.basic.ui')}</h2>
                    <div>
                        <div className="flex flex-col items-start space-x-4">
                            <div className="flex items-center space-x-2 ml-12 mb-2">
                                <input type="radio" name="theme" id="dark" checked title={t('studio.profiles.settings.basic.light')} />
                                <label for="dark" className="font-sans text-sm">{t('studio.profiles.settings.basic.light')}</label>
                            </div>
                            <div className="w-32 h-32 rounded-lg border shadow-md flex items-center justify-center bg-white text-black">
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0  flex justify-end items-center p-3 bg-white border-t border-gray-300">
                    <ApplyButton onClick={applyOnclick} hasChanged={isChanged} />
                </div>
            </div >
        </DelayedRoute>
    );
};

export default BasicSetting;

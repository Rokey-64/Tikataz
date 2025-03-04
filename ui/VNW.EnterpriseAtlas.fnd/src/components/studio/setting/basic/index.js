import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguages, setTimezones } from "../../../../redux/optionsSlice";
import { FiSettings } from "react-icons/fi";
import AboveFixedContainer from "../../common/above_fixed_container/index";
import SelectBox from "../../common/select_box";
import InsertNoticeText from "../../insert_notice/index";
import LanguageCategory from "../../../../api/languageCategory";
import TimezoneCategory from "../../../../api/timezoneCategory";
import LoadBasicSettings from "../../../../api/loadBasicSettings";
import UpdateBasicSettings from "../../../../api/updateBasicSettings";
import ApplyButton from "../apply_button";
import DelayedRoute from "../../../../services/routeDelay";

const BasicSetting = () => {
    const dispatch = useDispatch();
    const languages = useSelector((state) => state.options.languages);
    const timeZones = useSelector((state) => state.options.timezones);
    const [basicSettings, setBasicSettings] = useState({});
    const [alterBasicSettings, setAlterBasicSettings] = useState({});
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        /**Load languages if not exists */
        if (languages.length === 0) {
            LanguageCategory().then((data) => {
                if (data) {
                    dispatch(setLanguages(data.languages));
                }
            });
        }

        /**Load timezones if not exists */
        if (timeZones.length === 0) {
            TimezoneCategory().then((data) => {
                if (data) {
                    dispatch(setTimezones(data.timezones));
                }
            });
        }

        /**Loads the default setting */
        LoadBasicSettings().then((data) => {
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
        UpdateBasicSettings(alterBasicSettings).then((data) => {
            if (data) {
                setBasicSettings({ ...alterBasicSettings });
                setIsChanged(false);
            }
        });
    }

    return (
        <DelayedRoute>
            <div>
                <AboveFixedContainer
                    children={
                        <div className="flex my-4 space-x-3">
                            <FiSettings className="text-xl" />
                            <h1 className="font-semibold">Thiết lập cơ bản</h1>
                        </div>
                    }
                />
                <div className="overflow-y-auto min-h-[calc(100vh-180px)] max-h-[calc(100vh-180px)] min-w-[calc(100vw-9px)] max-w-[calc(100vw-9px)]
                            md:min-w-[calc(100vw-268px)] md:max-w-[calc(100vw-268px)]"
                >
                    <InsertNoticeText
                        header={<strong className="text-[14px]">Bạn có thể thiết lập các thay đổi nào tại đây?</strong>}
                        content={
                            <div className="text-[13px] font-sans text-justify leading-5 space-y-2 w-[50rem]">
                                <p>Thiết lập cơ bản tập trung vào điều chỉnh các chức năng điều khiển và hiển thị hệ thống và giao diện tương tác người dùng.</p>
                                <p>Điều này giúp trực quan hơn các thao tác của bạn và góp phần đảm bảo sự thuận tiện nhất khi sử dụng website.</p>
                            </div>
                        }
                    />

                    <h2 className="font-sans text-base  my-2">Lựa chọn ngôn ngữ và định dạng múi giờ sẽ áp dụng cho trang của bạn</h2>
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
                    <h2 className="font-sans text-base mb-2 mt-10">Lựa chọn giao diện</h2>
                    <div>
                        <div className="flex flex-col items-start space-x-4">
                            <div className="flex items-center space-x-2 ml-12 mb-2">
                                <input type="radio" name="theme" id="dark" checked title="sáng" />
                                <label for="dark" className="font-sans text-sm">Sáng</label>
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

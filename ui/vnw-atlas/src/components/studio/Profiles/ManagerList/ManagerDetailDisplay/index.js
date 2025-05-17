import RightDisplayContainer from "../../../common/RightDisplayContainer";
import ReadOnlyText from "../../../common/ReadOnlyText";
import InsertNoticeText from "../../../common/InsertNoticeText";
import Messages from "../../../common/Messages";
import { useTranslations } from "next-intl";

/**
 * Display the detail of a selected manager member
 * @param {*} param0 
 * @returns 
 */
const ManagerDetailDisplay = ({ state, setState }) => {
    const t = useTranslations('trans');
    const localState = state.currentObject[0];

    return (
        <>
            <RightDisplayContainer state={state} setState={setState}
                headerContent={
                    <Messages type="ManagerMessage" />
                }>
                <div color="flex  items-center justify-center">
                    <div className="flex space-x-10 justify-center items-center flex-col space-y-5 sm:flex-row">
                        <div>
                            <img src={localState.logo || "/placeholder.jpg"} alt="Company Logo"
                                className="object-cover min-w-40 w-40 min-h-40 h-40 rounded-full border-2 border-gray-300" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <ReadOnlyText label={t('studio.profiles.manager.m5')} value={localState.name} />
                            <ReadOnlyText label={t('studio.profiles.manager.m6')} value={localState.date} />
                            <ReadOnlyText label={t('studio.profiles.manager.m7')} value={localState.position} />
                            <ReadOnlyText label={t('studio.profiles.manager.m8')} value={localState.phone} />
                            <ReadOnlyText label={t('studio.profiles.manager.m9')} value={localState.email} />
                        </div>
                    </div>
                    <div className="flex items-center mt-14 w-full text-[16px] font-sans p-10 rounded-lg text-[#8f8f8f] bg-[#f0f9ff]">
                        <p><i
                            dangerouslySetInnerHTML={{
                                __html: "“" + localState.slogan.replace(/\n/g, "<br />") + "”",
                            }}

                            className="font-bold"
                        ></i></p>
                    </div>
                </div>
            </RightDisplayContainer>

        </>
    );
};

export default ManagerDetailDisplay;
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { setProfile } from "../../../../../redux/profile_slice";
import ElementSingleText from '../../../common/textInputs/ElementSingleText';
import ElementMultipText from '../../../common/textInputs/ElementMultipText';
import ElementSelectBox from '../../../common/textInputs/ElementSelectBox';
import RightInputContainer from '../../../common/RightInputContainer';
import ImageLoadingBoard from '../../../common/ImageLoadingBoard';
import SaveCommonProfileAPI from '../../../../../api/saveCommonProfile';
import { useTranslation } from 'react-i18next';
import createBlobFromUrl from '../../../../../services/createBlobFromUrl';


/**
 * This component provides a form for adding or editing a company profile
 * @param {*}  
 * @returns 
 */
const CompanyInfoEditor = ({ setIsEdit, profile }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [temporaryProfile, settemporaryProfile] = useState({ ...profile, nation: { value: profile.nation.value, id: profile.nation.id } });
    const profileState = useSelector((state) => state.profile);
    const nation = useSelector((state) => state.options.nations);
    /**
     * Using this function to update the temporary profile when the input text changes
     * @param {*} key - the key of the object
     * @param {*} value - the value of the object
     */
    const inputCallback = (key, value) => {
        settemporaryProfile((prev) => {
            return { ...prev, [key]: value }
        })
    }

    /**
     * Using this function to update the temporary profile when the select box changes
     * @param {*} key - the key of the object
     * @param {*} value - the value of the selected item
     * @param {*} id - the id of the selected item
     */
    const selectedCallback = (key, value, id) => {
        settemporaryProfile((prev) => {
            return { ...prev, [key]: { value, id } }
        })
    }

    /**
     * Save the temporary profile to the main profile
     */
    const saveCallback = async () => {
        /** create id */
        if (!profile.id) {
            temporaryProfile.id = nanoid();
        }

        const formData = new FormData();
        const blob = await createBlobFromUrl(temporaryProfile.logo);
        if (blob) formData.append("logo", blob, "logo");

        const profileData = JSON.stringify(temporaryProfile);
        formData.append("profile", profileData);
        
        const result = await SaveCommonProfileAPI(formData);
        if (!result) {
            alert(t("note_save_failed"));
            return;
        }

        dispatch(setProfile(temporaryProfile));
        setIsEdit(false);
        alert(t("note_save_success"));
    }

    return (
        <RightInputContainer closeCallback={setIsEdit} saveCallback={saveCallback}
            children={
                <div>
                    <form className="grid grid-cols-2 gap-3 ">
                        <div className="flex items-center mb-6 col-span-2">
                            <ImageLoadingBoard
                                label="Select logo"
                                aditionalClasses='h-20 w-24'
                                callback={inputCallback.bind(this, "logo")}
                                defaultValue={profile.logo}
                            />
                            <div className="col-span-2 ml-3">
                                <ElementSelectBox callback={selectedCallback.bind(this, "nation")}
                                    defaultValue={profile.nation.id}
                                    collection={nation}
                                    options={{ text: `${t("country")}`, holder: "Việt Nam" }} />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <ElementSingleText callback={inputCallback.bind(this, "name")}
                                defaultValue={profile.name} options={{ text: `${t("company_name")}`, holder: "CÔNG TY TNHH ...", isRequired: true }} />
                        </div>

                        <div className="mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "taxCode")}
                                defaultValue={profile.taxCode} options={{ text: `${t("tax_code")}`, holder: "0300......", isRequired: true }} />
                        </div>

                        <div className="mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "date")}
                                defaultValue={profile.date} options={{ text: `${t("business_licence_date")}`, type: "date"}} />
                        </div>

                        <div className="col-span-2 mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "address")}
                                defaultValue={profile.address} options={{
                                    text: `${t("address")}`,
                                    holder: "KP2, Bài 3, Đồng Tây, Hà Nội", isRequired: true
                                }} />
                        </div>

                        <div className="col-span-2 mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "businessField")} defaultValue={profile.businessField}
                                options={{ text: `${t("bussiness_type")}`, holder: "Chuyên sản xuất và bán sís nội thất cao cấp,..."}} />
                        </div>
                        <div className="mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "phone")}
                                defaultValue={profile.phone} options={{ text: `${t("phone")}`, holder: "0123456...", type: "tel", isRequired: true }} />
                        </div>

                        <div className="mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "fax")}
                                defaultValue={profile.fax} options={{ text: `${t("fax")}`, holder: "0123456..." }} />
                        </div>

                        <div className="mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "email")}
                                defaultValue={profile.email} options={{ type: `${t("email")}`, holder: "...@gmail.com", text: "Email", isRequired: true }} />
                        </div>
                        <div className="col-span-2 mt-3">
                            <ElementMultipText callback={inputCallback.bind(this, "vision")}
                                defaultValue={profile.vision} options={{ text: `${t("vision")}`, holder: "..." }} />
                        </div>
                        <div className="col-span-2 mt-3">
                            <ElementMultipText callback={inputCallback.bind(this, "mission")}
                                defaultValue={profile.mission} options={{ text: `${t("mission")}`, holder: "..." }} />
                        </div>
                    </form>
                </div>}
        />
    )
}

export default CompanyInfoEditor;
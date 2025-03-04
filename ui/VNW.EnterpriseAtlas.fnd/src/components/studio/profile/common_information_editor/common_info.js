import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from '@reduxjs/toolkit';
import { setProfile } from "../../../../redux/profile_slice";
import ElementSingleText from '../../common/text_input_component/elementSingleText';
import ElementMultipText from '../../common/text_input_component/elementMultipText';
import ElementSelectBox from '../../common/text_input_component/elementSelectBox';
import RightInputContainer from '../../common/right_input_container';
import ImageLoadingBoard from '../../common/image_loading_board';
import SaveCommonProfile from '../../../../api/saveCommonProfile';

const CommonInfo = ({ setIsEdit, profile }) => {
    const dispatch = useDispatch();
    const [temporaryProfile, settemporaryProfile] = useState({ ...profile, nation: { value: profile.nation.value, id: profile.nation.id } });

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
            return { ...prev, [key]: {value, id} }
        })
    }

    /**
     * Save the temporary profile to the main profile
     */
    const saveCallback = () => {
        /** create id */
        if (!profile.id) {
            temporaryProfile.id = nanoid();
        }
        dispatch(setProfile(temporaryProfile));
        setIsEdit(false);

        SaveCommonProfile(temporaryProfile).then((data) => {
            if (data) {
            }
        })
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
                                    options={{ text: "Quốc gia trụ sở", holder: "Việt Nam"}} />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <ElementSingleText callback={inputCallback.bind(this, "name")}
                                defaultValue={profile.name} options={{ text: "Tên công ty", holder: "CÔNG TY TNHH ...", isRequired: true}} />
                        </div>

                        <div className="mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "taxCode")}
                                defaultValue={profile.taxCode} options={{ text: "Mã số thuế", holder: "0300......", isRequired: true}} />
                        </div>

                        <div className="mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "date")}
                                defaultValue={profile.date} options={{ text: "Ngày cấp GPKD", type: "date", isRequired: true}} />
                        </div>

                        <div className="col-span-2 mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "address")}
                                defaultValue={profile.address} options={{
                                    text: "Địa chỉ", type: "Địa chỉ trụ sở",
                                    holder: "KP2, Bài 3, Đồng Tây, Hà Nội",isRequired: true
                                    
                                }} />
                        </div>

                        <div className="col-span-2 mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "businessField")} defaultValue={profile.businessField}
                                options={{ text: "Lĩnh vực kinh doanh", holder: "Chuyên sản xuất và bán sís nội thất cao cấp,..." , isRequired: true}} />
                        </div>
                        <div className="mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "phone")}
                                defaultValue={profile.phone} options={{ text: "SĐT", holder: "0123456...", type: "tel" , isRequired: true}} />
                        </div>

                        <div className="mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "fax")}
                                defaultValue={profile.fax} options={{ text: "Fax", holder: "0123456..." }} />
                        </div>

                        <div className="mt-3">
                            <ElementSingleText callback={inputCallback.bind(this, "email")}
                                defaultValue={profile.email} options={{ type: "email", holder: "...@gmail.com", text: "Email" , isRequired: true}} />
                        </div>
                        <div className="col-span-2 mt-3">
                            <ElementMultipText callback={inputCallback.bind(this, "vision")}
                                defaultValue={profile.vision} options={{ text: "Tầm Nhìn", holder: "..." }} />
                        </div>
                        <div className="col-span-2 mt-3">
                            <ElementMultipText callback={inputCallback.bind(this, "mission")}
                                defaultValue={profile.mission} options={{ text: "Sứ mệnh", holder: "..." }} />
                        </div>
                    </form>
                </div>}
        />
    )
}

export default CommonInfo;
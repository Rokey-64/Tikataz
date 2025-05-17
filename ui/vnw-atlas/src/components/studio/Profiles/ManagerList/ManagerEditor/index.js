import ElementSingleText from '../../../common/textInputs/ElementSingleText';
import ElementMultipText from '../../../common/textInputs/ElementMultipText';
import RightInputContainer from '../../../common/RightInputContainer/index';
import ImageLoadingBoard from '../../../common/ImageLoadingBoard/index';
import { useDispatch } from 'react-redux';
import { insertLeaders, updateLeaders } from "../../../../../redux/leadersSlice";
import SaveLeadersAPI from "../../../../../api/updateLeader";
import createBlobFromUrl from '../../../../../services/createBlobFromUrl';
import { useTranslations } from "next-intl";

/**
 * Edit the information of a selected manager member
 * @param {*} param0 
 * @returns 
 */
const ManagerEditor = ({ state, setState }) => {
    const dispatch = useDispatch();
    const t = useTranslations('trans');
    const manager = { ...state.currentObjects[0] };

    /**
     * Save the user's input to the database
     */
    const saveHandleClick = async () => {
        if (!manager.name || !manager.position) {
            alert(t("field_required"));
            return;
        }
        

        const formData = new FormData();

        // Push the logo to the form data
        if (manager.logo.startsWith("blob")) {
            const avata = await createBlobFromUrl(manager.logo)
            if (avata) {
                formData.append("logo", avata, "logo");
            }
        }

        // Push the rest of the data to the form data
        const dataConvert = JSON.stringify(manager);
        if (dataConvert) formData.append("data", dataConvert);

        // Add state to the form data
        formData.append("state", state.state);

        SaveLeadersAPI(formData).then((res) => {
            if (res) {
                if (state.state === "add") {
                    dispatch(insertLeaders({ ...manager, id: res.id }));
                    setState({ ...state, state: "" });;
                }
                else if (state.state === "edit") {
                    dispatch(updateLeaders({ ...manager }));
                    setState({ ...state, currentObjects: [{ ...manager }] });
                }

                alert(t("note_save_success"));
            }
            else {
                alert(t("note_save_failed"));
            }
        });
    }

    const textInputChange = (key, value) => {
        manager[key] = value
    }

    const inputCallback = (key, value) => {
        manager[key] = value
    }

    /**
     * Set state when the user wants to close the current box
     */
    const setshowBranch = () => {
        setState({ ...state, state: "" });
    }

    return (
        <RightInputContainer saveCallback={saveHandleClick} closeCallback={setshowBranch}>
            <div>

                <form className="grid grid-cols-2 gap-3 ">
                    <div className="flex items-center mb-6 col-span-2 space-x-4">
                        <ImageLoadingBoard
                            label="Select logo"
                            aditionalClasses='h-20 w-24'
                            callback={inputCallback.bind(this, "logo")}
                            defaultValue={manager.logo}
                        />
                        <div>
                            <ElementSingleText callback={textInputChange.bind(this, "name")} defaultValue={manager.name}
                                options={{ text: `${t("person_name")}`, holder: "Nguyễn Văn A", isRequired: true }} />

                        </div>
                    </div>

                    <div>
                        <ElementSingleText callback={textInputChange.bind(this, "position")} defaultValue={manager.position}
                            options={{ text: `${t("position")}`, holder: "Giám đốc", isRequired: true }} />
                    </div>
                    <div>
                        <ElementSingleText callback={textInputChange.bind(this, "date")} defaultValue={manager.date}
                            options={{ text: `${t("assign_date")}`, type: "date" }} />
                    </div>
                    <div className="mt-3">
                        <ElementSingleText callback={textInputChange.bind(this, "phone")} defaultValue={manager.phone}
                            options={{ text: `${t("phone")}`, holder: "0123456789", type: "tel" }} />
                    </div>

                    <div className="mt-3">
                        <ElementSingleText callback={textInputChange.bind(this, "email")} defaultValue={manager.email}
                            options={{ text: `${t("email")}`, holder: "...@example.com", type: "mail" }} />
                    </div>
                    <div className="col-span-2 mt-3">
                        <ElementMultipText callback={textInputChange.bind(this, "slogan")}
                            defaultValue={manager.slogan} options={{ text: `${t("slogan")}`, holder: "" }} />
                    </div>
                </form>
            </div>
        </RightInputContainer>
    )
};

export default ManagerEditor;
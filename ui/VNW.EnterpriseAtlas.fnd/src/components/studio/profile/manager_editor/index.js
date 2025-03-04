import ElementSingleText from '../../common/text_input_component/elementSingleText';
import ElementMultipText from '../../common/text_input_component/elementMultipText';
import RightInputContainer from '../../common/right_input_container/index';
import ImageLoadingBoard from '../../common/image_loading_board/index';
import { useDispatch } from 'react-redux';
import { insertLeaders, updateLeaders} from "../../../../redux/leadersSlice";
import SaveLeaders from "../../../../api/updateLeader";


const ManagerEditor = ({ state, setState }) => {
    const dispatch = useDispatch();
    const manager = { ...state.currentObjects[0] };

    /**
     * Save the user's input to the database
     */
    const saveHandleClick = () => {
        SaveLeaders(manager).then((res) => {
            if (res) {
                if (state.state === "add") {
                    dispatch(insertLeaders({ ...manager }));
                    setState({ ...state, state: "" });;
                }
                else if (state.state === "edit") {
                    dispatch(updateLeaders({ ...manager }));
                    setState({ ...state, currentObjects: [{ ...manager }] });
                }
            }
            else {
                alert("Cập nhật thất bại");
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
        <RightInputContainer saveCallback={saveHandleClick} closeCallback={setshowBranch}
            children={
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
                                    options={{ text: "Tên", holder: "Nguyễn Văn A", isRequired: true}} />

                            </div>
                        </div>

                        <div>
                            <ElementSingleText callback={textInputChange.bind(this, "position")} defaultValue={manager.position}
                                options={{ text: "Chức vụ", holder: "Giám đốc", isRequired: true}} />
                        </div>
                        <div>
                            <ElementSingleText callback={textInputChange.bind(this, "date")} defaultValue={manager.date}
                                options={{ text: "Ngày đảm nhận", type: "date" }} />
                        </div>
                        <div className="mt-3">
                            <ElementSingleText callback={textInputChange.bind(this, "phone")} defaultValue={manager.phone}
                                options={{ text: "Số điện thoại", holder: "0123456789", type: "tel" }} />
                        </div>

                        <div className="mt-3">
                            <ElementSingleText callback={textInputChange.bind(this, "email")} defaultValue={manager.email}
                                options={{ text: "email", holder: "...@example.com", type: "mail" }} />
                        </div>
                        <div className="col-span-2 mt-3">
                            <ElementMultipText callback={textInputChange.bind(this, "slogan")}
                                defaultValue={manager.slogan} options={{ text: "Châm ngôn sống", holder: "" }} />
                        </div>
                    </form>
                </div>
            } />
    )
};

export default ManagerEditor;
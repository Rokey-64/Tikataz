
import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { setLeaders, deleteLeaders } from "../../../../redux/leadersSlice";
import AboveFixedContainer from "../../common/AboveFixedContainer";
import AboveInsertedButton from "../../common/AboveInsertedButton";
import ManagerEditor from "./ManagerEditor";
import ManagerShortDisplay from "./ManagerShortDisplay";
import InsertNoticeText from "../../common/InsertNoticeText";
import RightDeleteContainer from "../../common/RightDeleteContainer";
import ManagerDetailDisplay from "./ManagerDetailDisplay";
import loadLeadersAPI from "../../../../api/loadLeaders";
import DeleteLeadersAPI from "../../../../api/deleteLeader";
import DelayedRoute from "../../../../services/routeDelay";
import { useTranslation } from "react-i18next";

/** */
const ManagerList = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const leaders = useSelector((state) => state.leaders);
    const [leadersInspector, setLeadersInspector] = useState({
        referenceState: ["add", "edit", "delete", "display"],
        state: "",
        currentObjects: [],
        selectedObjects: [],
        objectTemplate: {
            id: "",
            name: "",
            position: "",
            date: "",
            phone: "",
            email: "",
            slogan: "",
            logo: ""
        }
    });

    /** 
     * Load leaders from the server for the first time 
     */
    useEffect(() => {
        if (leaders.length > 0)
            return;

        /**
         * Load leaders from the server
         */
        loadLeadersAPI().then((data) => {
            if (data) {
                dispatch(setLeaders(data.leaders));
            }
        });
    }, []);

    /**
     * Handles the addition of a new row to the table.
     * Adds a new object to the objects array.
     */
    const addHandleClick = () => {
        /**
         * Create a temporary id for the new object and it will be replaced by the real id when the object is saved.
         */
        const temporaryID = nanoid();

        /**
         * Make a copy of the object template and add the temporary id to it.
         */
        const curentObject = { ...leadersInspector.objectTemplate, id: temporaryID };

        /**
         * Set the state to "add" and set the currentObject to the new object.
         */
        setLeadersInspector({ ...leadersInspector, state: "add", currentObjects: [curentObject] });
    };

    /**
     * Handles the editing of a row in the table. 
     * Sets the state to "edit" and sets the currentObject to the object that is being edited.
     */
    const editHandleClick = (item) => {
        setLeadersInspector({ ...leadersInspector, state: "edit", currentObjects: [item] });
    };

    /**
     * Handles the deletion of a row in the table. 
     * Sets the state to "delete" and sets the currentObject to the object that is being deleted.
     * 
     * @param {string} id The id of the object that is being deleted.
     */
    const deleteHandleClick = (item) => {
        setLeadersInspector({ ...leadersInspector, state: "delete", selectedObjects: [item.id], currentObjects: [item] });
    }

    /**
     * Show a object in detail
     * 
     * @param {string} id The id of the object that you want to display.
     */
    const displayHandleClick = (item) => {
        setLeadersInspector({ ...leadersInspector, state: "display", currentObject: [item] });
    }

    /**
     * When the user clicks the delete button, it raises a request to delete the selected objects.
     */
    const deleteCallback = () => {
        if (leadersInspector.selectedObjects.length === 0)
            return;

        DeleteLeadersAPI(leadersInspector.selectedObjects[0]).then((res) => {
            if (res) {
                dispatch(deleteLeaders([...leadersInspector.selectedObjects]));
                setLeadersInspector({ ...leadersInspector, state: "" });
            }
            else {
                alert(t("delete_failed"));
            }
        });
    };

    return (
        <DelayedRoute>
            <div>
                <AboveFixedContainer children={<AboveInsertedButton callback={addHandleClick} content={`${t("add_member")}`} options={{ icon: IoAdd }} />} />
                <div className="flex">
                    <div className="overflow-y-auto overflow-x-auto max-h-[calc(100vh-8.5rem)] min-h-[calc(100vh-7.2rem)] w-[calc(100vw-10px)] md:w-[calc(100vw-270px)] p-2 
                    flex justify-start">
                        <div className="flex flex-wrap gap-4 items-start justify-start sm:justify-start">
                            {
                                leaders && leaders.map((item, index) =>
                                    <ManagerShortDisplay key={index} profile={item}
                                        deleteOnclick={deleteHandleClick.bind(this, item)}
                                        editOnclick={editHandleClick.bind(this, item)}
                                        displayOnClick={displayHandleClick.bind(this, item)} />
                                )
                            }
                        </div>
                        {
                            leaders.length === 0 && (
                                <div className="mt-3">
                                    <InsertNoticeText header={<strong>Hãy cập nhật thông tin ban lãnh đạo của doanh nghiệp bạn</strong>}
                                        content={
                                            <div className="w-[35rem] space-y-1 space-x-1">
                                                <h2><strong>🔰 Điều này giúp bạn</strong></h2>
                                                <p>✔ Hoàn thiện hồ sơ năng lực của doanh nghiệp</p>
                                                <p>✔ Tăng mức độ uy tính doanh nghiệp bạn</p>
                                                <p>✔ Hệ thống sẽ đánh giá điểm số thông tin mà bạn cung cấp, từ đó tăng đề xuất với khách hàng tiềm năng</p>
                                                <br />
                                                <h2 ><strong>⚠ Lưu ý:</strong></h2>
                                                <p>Chúng tôi kiểm duyệt trước khi chấp thuận nó như một phần của hồ sơ doanh nghiệp của bạn.</p>
                                            </div>
                                        }
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                {["add"].includes(leadersInspector.state) && <ManagerEditor state={leadersInspector} setState={setLeadersInspector} />}
                {["edit"].includes(leadersInspector.state) && <ManagerEditor state={leadersInspector} setState={setLeadersInspector} />}
                {["display"].includes(leadersInspector.state) && <ManagerDetailDisplay state={leadersInspector} setState={setLeadersInspector} />}
                {
                    ["delete"].includes(leadersInspector.state) &&
                    <RightDeleteContainer headerContent={<h2 className="text-lg font-semibold text-gray-800">{t("delete_member")}</h2>}
                        state={leadersInspector} setState={setLeadersInspector}
                        callback={deleteCallback}
                        children={
                            <InsertNoticeText header={<strong className="text-[14px] text-black ">Việc xóa thành viên tác động như thế nào đến quy trình của bạn?</strong>}
                                content={
                                    <div className="text-[13px] text-black font-sans text-justify leading-5 space-y-2">
                                        <p>Thành viên bị xóa sẽ không thể tiếp tục hiện thị trên hồ sơ doanh nghiệp của bạn.
                                            Thông tin thành viên sẽ được lưu trữ 30 ngày và bạn có thể khôi phục lại sau khi xóa.
                                        </p>
                                        <p>Mặc dù thông tin sẽ được xóa, nhưng những tác động đến uy tính doanh nghiệp của bạn tạo bởi thành viên vẫn sẽ được lưu trữ
                                            dùng cho mục đích đánh giá mức độ uy tính doanh nghiệp bạn</p>
                                        <p>Việc bạn thêm mới thành viên sẽ được chúng tôi kiểm duyệt và đánh giá trước khi cập nhật tới hồ sơ doanh nghiệp của bạn.</p>
                                    </div>
                                }
                            />}>
                    </RightDeleteContainer>
                }
            </div>
        </DelayedRoute>
    )
};

export default ManagerList;
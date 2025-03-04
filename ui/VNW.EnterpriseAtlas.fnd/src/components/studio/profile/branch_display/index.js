import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBranches, deleteBranch } from "../../../../redux/branchesSlice";
import { nanoid } from "@reduxjs/toolkit";
import { IoAdd } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import InsertBranch from "../branch_editor/insertBranch";
import AboveFixedContainer from "../../common/above_fixed_container/index";
import AboveInsertedButton from "../../common/above_inserted_button/index";
import RightDeleteContainer from "../../common/right_delete_container/index";
import InsertNoticeText from "../../insert_notice/index";
import loadBranches from "../../../../api/loadBranches";
import DeleteBranches from "../../../../api/deleteBranches";

const BranchInfo = () => {
    const dispatch = useDispatch();
    const branches = useSelector((state) => state.branches);
    const [branchInspector, setBranchInspector] = useState({
        referenceState: ["add", "edit", "delete"],
        state: "",
        currentObjects: [],
        selectedObjects: [],
        objectTemplate: {
            id: "",
            name: "",
            taxcode: "",
            date: "",
            phone: "",
            email: "",
            address: ""
        }
    });

    /** 
     * Load branches from the server for the first time 
     */
    useEffect(() => {
        if (branches.length > 0) 
            return;

        /**
         * Load branches from the server
         */
        loadBranches().then((data) => {
            if (data) {
                dispatch(setBranches(data.branches));
            }
        });
    }, []);

    /**
     * Handles the addition of a new row to the table.
     * Adds a new object to the objects array.
     */
    const addRowHandler = () => {
        const curentObject = { ...branchInspector.objectTemplate, id: nanoid()};
        setBranchInspector({ ...branchInspector, state: "add", currentObjects: [curentObject]});
    };

    /**
     * Handles the editing of a row in the table. 
     * Sets the state to "edit" and sets the currentObject to the object that is being edited.
     */
    const editRowHandler = () => {
        const curentObject = branches.filter((item) => branchInspector.selectedObjects.includes(item.id))[0];
        setBranchInspector({ ...branchInspector, state: "edit", currentObjects: [curentObject] });
    };

    /**
     * Handles the deletion of a row in the table. 
     * Sets the state to "delete" and sets the currentObject to the object that is being deleted.
     */
    const deleteRowHandler = () => {
        const curentObjects = branches.filter((item) => branchInspector.selectedObjects.includes(item.id));
        setBranchInspector({ ...branchInspector, state: "delete", currentObjects: curentObjects });
    };

    /**
     * Handles row selection for the table. If the row is selected, adds its id to the selectedRow array.
     * If the row is deselected, removes its id from the selectedRow array.
     * @param {string} id id of the row
     * @param {boolean} isCheck whether the row is selected
     */
    const handleRowSelect = (id, isCheck) => {
        if (isCheck) {
            setBranchInspector({ ...branchInspector, selectedObjects: [...branchInspector.selectedObjects, id] });
        }
        else {
            setBranchInspector({ ...branchInspector, selectedObjects: branchInspector.selectedObjects.filter((item) => item !== id) });
        }
    }

    /**
     * When the user clicks the delete button, it raises a request to delete the selected objects.
     */
    const deleteCallback = () => {
        DeleteBranches([...branchInspector.selectedObjects]).then((res) => {
            if (res) {
                dispatch(deleteBranch([...branchInspector.selectedObjects]));
            }
            else {
                alert("Xóa thất bại");
            }
        });
        
    };

    return (
        <div className="">
            {
                ["add"].includes(branchInspector.state) && (<InsertBranch state={branchInspector} setState={setBranchInspector} />)
            }
            {
                ["edit"].includes(branchInspector.state) && (<InsertBranch state={branchInspector} setState={setBranchInspector} />)
            }

            {branchInspector.state === "delete" && (<RightDeleteContainer state={branchInspector} setState={setBranchInspector} callback={deleteCallback}
                headerContent={<h1 className="text-[18px]"><strong>Xóa chi nhánh</strong></h1>}
                children={
                    <InsertNoticeText header={<strong className="text-[14px] text-black ">Việc xóa chi nhánh tác động như thế nào đến quy trình của bạn?</strong>}
                        content={
                            <div className="text-[13px] text-black font-sans text-justify leading-5 space-y-2">
                                <p>Các chi nhánh được chọn sẽ bị xóa. Điều này sẽ cập nhật đến hồ sơ năng lực của bạn.</p>
                                <p>Hệ thống sẽ bỏ qua gợi ý vị trí địa lý đối với những chi nhánh này.
                                    Và những đơn hàng phù hợp trước đây sẽ không hiện thị nếu nằm ngoài phạm vi mới.</p>
                                <p>Việc bạn thêm mới lại chi nhánh sẽ được chúng tôi kiểm duyệt và đánh giá trước khi bắt đầu liên kết đơn hàng.</p>
                            </div>
                        }
                    />}
            />)}

            <AboveFixedContainer
                children={
                    <div className="flex items-center justify-end space-x-10 ">
                        <AboveInsertedButton callback={addRowHandler} content="Thêm chi nhánh" options={{ icon: IoAdd }} />
                        <AboveInsertedButton callback={editRowHandler} content="Chỉnh sửa" options={{
                            icon: FaUserEdit,
                            isFreezeed: branchInspector.selectedObjects.length === 1 ? false : true
                        }} />
                        <div className="flex items-center justify-end">
                            <AboveInsertedButton callback={deleteRowHandler} content="Delete"
                                options={{
                                    icon: MdDeleteForever,
                                    additionalClasses: "text-red-600",
                                    isFreezeed: branchInspector.selectedObjects.length >= 1 ? false : true
                                }} />
                        </div>
                    </div>

                } />

            <div className="mt-5 px-2 overflow-y-auto overflow-x-auto max-h-[calc(100vh-8.5rem)] max-w-[calc(100vw-10px)] md:max-w-[calc(100vw-270px)] bg-[#fdfdfd] [clip-path:inset(0px_0px_0px_0px)]">
                <div className=" min-h-[calc(100vh-9.25rem)]" style={{ width: 'fit-content' }}>
                    {
                        branches.length === 0 && (
                            <div>
                                <InsertNoticeText header={<strong>Hãy cập nhật thông tin về các chi nhánh mở rộng của doanh nghiệp bạn</strong>}
                                    content={
                                        <div className="w-[35rem] space-y-1 space-x-1">
                                            <h2><strong>🔰 Chi nhánh giúp bạn</strong></h2>
                                            <p>✔ Liên kết và tìm kiếm đối tác phù hợp với bạn thông qua địa chỉ mà bạn cung cấp</p>
                                            <p>✔ Tăng mức độ uy tính doanh nghiệp bạn</p>
                                            <p>✔ Hệ thống sẽ đánh giá điểm số thông tin mà bạn cung cấp, từ đó tăng đề xuất với khách hàng tiềm năng</p>
                                            <br />
                                            <h2 ><strong>⚠ Lưu ý:</strong></h2>
                                            <p>Chi nhánh được thêm sẽ được chúng tôi kiểm duyệt trước khi chấp thuận nó như một phần của hồ sơ doanh nghiệp của bạn.</p>
                                        </div>
                                    }
                                />
                            </div>
                        )
                    }
                    <table className={`table-auto ${branches.length === 0 ? "hidden" : ""}  font-sans`}>
                        <thead className="sticky top-0 z-10  min-w-[500px] ">
                            <tr className="bg-white">
                                <th className="p-4 text-[13px] text-start min-w-[30px] sticky left-0 bg-white">Sel</th>
                                <th className="p-4 text-[13px] text-start min-w-[200px]">Tên chi nhánh</th>
                                <th className="p-4 text-[13px] text-start min-w-[150px]">Mã chi nhánh</th>
                                <th className="p-4 text-[13px] text-start min-w-[150px]">Ngày thành lập</th>
                                <th className="p-4 text-[13px] text-start min-w-[100px]">SĐT</th>
                                <th className="p-4 text-[13px] text-start min-w-[200px]">Email</th>
                                <th className="p-4 text-[13px] text-start min-w-[300px]">Địa chỉ chi nhánh</th>
                            </tr>
                        </thead>

                        <tbody>
                            {branches.length > 0 && branches.map((branch, index) => (
                                <tr key={index} className="border-b border-[#e4e4e7]">
                                    <td className="p-2 sticky left-0 bg-white ">
                                        <div className="flex items-center justify-center">
                                            <input type="checkbox" className="w-5 h-5" checked={branchInspector.selectedObjects.includes(branch.id)}
                                                onChange={(e) => handleRowSelect(branch.id, e.target.checked)} />
                                        </div>
                                    </td>
                                    <td className="p-2">
                                        <p className="text-[13px]">{branch.name}</p>

                                    </td>
                                    <td className="p-2">
                                        <p className="text-[13px]">{branch.taxcode}</p>
                                    </td>
                                    <td className="p-2">
                                        <p className="text-[13px]">{branch.date}</p>
                                    </td>
                                    <td className="p-2">
                                        <p className="text-[13px]">{branch.phone}</p>
                                    </td>
                                    <td className="p-2">
                                        <p className="flex items-start text-[13px]">{branch.email}</p>
                                    </td>
                                    <td className="p-2">
                                        <p className="text-[13px]">{branch.address}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BranchInfo;

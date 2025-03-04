import React, { useState, useEffect } from "react";
import ElementSingleText from '../../common/text_input_component/elementSingleText';
import ElementMultipText from '../../common/text_input_component/elementMultipText';
import RightInputContainer from '../../common/right_input_container/index';
import { useDispatch } from "react-redux";
import { insertBranch, updateBranch } from "../../../../redux/branchesSlice";
import UpdateBranches from "../../../../api/updateBranch";

const InsertBranch = ({ state, setState }) => {
    const dispatch = useDispatch();
    const branch = {...state.currentObjects[0]};

    /**
     * This function is called when the user clicks the save button
     */
    const saveCallback = () => {
        if (!branch.name.trim() || !branch.address.trim()) {
            alert("Tên chi nhánh và địa chỉ không được để trống");
            return;
        }
        UpdateBranches(branch).then((res) => {
            if (res) {
                if (state.state === "add") {
                    dispatch(insertBranch({...branch}));
                    setState({ ...state, state: "" });;
                }
                else if (state.state === "edit") {
                    dispatch(updateBranch({...branch}));
                    setState({ ...state, currentObjects: [{...branch}] });
                }
            }
            else{
                alert("Cập nhật thất bại");
            }
        });
    }

    /**
     * Listen to all input changes
     * @param {*} key 
     * @param {*} value 
     */
    const inputCallback = (key, value) => {
        branch[key] = value
    };

    /**Call it when you want to hide the current box*/
    const closeHandleClick = () => {
        setState({ ...state, state: "" });
    };

    return (
        <RightInputContainer closeCallback={closeHandleClick} saveCallback={saveCallback}
            children={<div>
                <form className="grid grid-cols-2 gap-3 ">
                    <div className="col-span-2">
                        <ElementSingleText options={{ text: "Tên chi nhánh", holder: "Chi nhánh 1", isRequired: true }}
                            callback={inputCallback.bind(this, "name")} defaultValue={branch.name} />
                    </div>
                    <div className="mt-3">
                        <ElementSingleText options={{ text: "Mã số thuế", holder: "0103..." }}
                            callback={inputCallback.bind(this, "taxcode")} defaultValue={branch.taxcode} />
                    </div>

                    <div className="mt-3">
                        <ElementSingleText options={{ text: "Ngày thành lập", holder: "dd/mm/yyyy", type: "date" }}
                            callback={inputCallback.bind(this, "date")} defaultValue={branch.date} />
                    </div>
                    <div className="mt-3">
                        <ElementSingleText options={{ text: "Sđt", holder: "0123456789" }}
                            callback={inputCallback.bind(this, "phone")} defaultValue={branch.phone} />
                    </div>

                    <div className="mt-3">
                        <ElementSingleText options={{ text: "email", holder: "...@example.com", type: "tel" }}
                            callback={inputCallback.bind(this, "email")} defaultValue={branch.email} />
                    </div>


                    <div className="col-span-2 mt-3">
                        <ElementSingleText options={{ text: "Địa chỉ", holder: "Việt Nam",  isRequired: true}}
                            callback={inputCallback.bind(this, "address")} defaultValue={branch.address} />
                    </div>
                </form>
            </div>}
        />
    );
};

export default InsertBranch;

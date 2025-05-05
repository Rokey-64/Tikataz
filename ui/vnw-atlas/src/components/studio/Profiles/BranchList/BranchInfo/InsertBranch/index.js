import React from "react";
import ElementSingleText from '../../../../common/textInputs/ElementSingleText';
import RightInputContainer from '../../../../common/RightInputContainer';
import { useDispatch } from "react-redux";
import { insertBranch, updateBranch } from "../../../../../../redux/branchesSlice";
import UpdateBranchesAPI from "../../../../../../api/updateBranch";
import { useTranslation } from "react-i18next";

/**
 * This component provides a form for adding or editing a branch
 * @param {*} param0 
 * @returns 
 */
const InsertBranch = ({ state, setState }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const branch = {...state.currentObjects[0]};

    /**
     * This function is called when the user clicks the save button
     */
    const saveCallback = () => {
        if (!branch.name.trim() || !branch.address.trim()) {
            alert(t("field_required"));
            return;
        }
        UpdateBranchesAPI(branch).then((res) => {
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
                alert(t("note_save_failed"));
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
                        <ElementSingleText options={{ text: `${t("branch_name")}`, holder: "Chi nhánh 1", isRequired: true }}
                            callback={inputCallback.bind(this, "name")} defaultValue={branch.name} />
                    </div>
                    <div className="mt-3">
                        <ElementSingleText options={{ text: `${t("branch_code")}`, holder: "0103..." }}
                            callback={inputCallback.bind(this, "taxcode")} defaultValue={branch.taxcode} />
                    </div>

                    <div className="mt-3">
                        <ElementSingleText options={{ text: `${t("establishment_date")}`, holder: "dd/mm/yyyy", type: "date" }}
                            callback={inputCallback.bind(this, "date")} defaultValue={branch.date} />
                    </div>
                    <div className="mt-3">
                        <ElementSingleText options={{ text: `${t("phone")}`, holder: "0123456789" }}
                            callback={inputCallback.bind(this, "phone")} defaultValue={branch.phone} />
                    </div>

                    <div className="mt-3">
                        <ElementSingleText options={{ text: `${t("email")}`, holder: "...@example.com", type: "tel" }}
                            callback={inputCallback.bind(this, "email")} defaultValue={branch.email} />
                    </div>


                    <div className="col-span-2 mt-3">
                        <ElementSingleText options={{ text: `${t("branch_address")}`, holder: "Việt Nam",  isRequired: true}}
                            callback={inputCallback.bind(this, "address")} defaultValue={branch.address} />
                    </div>
                </form>
            </div>}
        />
    );
};

export default InsertBranch;

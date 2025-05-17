'use client'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBranches, deleteBranch } from "../../../../../redux/branchesSlice";
import { nanoid } from "nanoid";
import { IoAdd } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import InsertBranch from "./InsertBranch";
import AboveFixedContainer from "../../../common/AboveFixedContainer/index";
import AboveInsertedButton from "../../../common/AboveInsertedButton/index";
import RightDeleteContainer from "../../../common/RightDeleteContainer/index";
import InsertNoticeText from "../../../common/InsertNoticeText";
import loadBranches from "../../../../../api/loadBranches";
import DeleteBranches from "../../../../../api/deleteBranches";
import { useTranslations } from "next-intl";
import Messages from "../../../common/Messages";

/**
 * Display the list of branches
 * @returns 
 */
const BranchInfo = () => {
    const dispatch = useDispatch();
    const t = useTranslations('trans');
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
        const curentObject = { ...branchInspector.objectTemplate, id: nanoid() };
        setBranchInspector({ ...branchInspector, state: "add", currentObjects: [curentObject] });
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

                // Reset the state
                setBranchInspector({ ...branchInspector, state: "", selectedObjects: [] });

                alert(t("delete_success"));
            }
            else {
                alert(t("common:delete_failed"));
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
                headerContent={<h1 className="text-[18px]"><strong>{t("delete_branch")}</strong></h1>}>
                <Messages type="DelBranchInfoMessage" />
            </RightDeleteContainer>)}

            <AboveFixedContainer>
                <div className="flex items-center justify-end space-x-10 ">
                    <AboveInsertedButton callback={addRowHandler} content={`${t("add_new_branch")}`} options={{ icon: IoAdd }} />
                    <AboveInsertedButton callback={editRowHandler} content={`${t("update_branch")}`} options={{
                        icon: FaUserEdit,
                        isFreezeed: branchInspector.selectedObjects.length === 1 ? false : true
                    }} />
                    <div className="flex items-center justify-end">
                        <AboveInsertedButton callback={deleteRowHandler} content={`${t("delete")}`}
                            options={{
                                icon: MdDeleteForever,
                                additionalClasses: "text-red-600",
                                isFreezeed: branchInspector.selectedObjects.length >= 1 ? false : true
                            }} />
                    </div>
                </div>
            </AboveFixedContainer>
            <div className="mt-5 px-2 overflow-y-auto overflow-x-auto 
                            md:max-h-[calc(100vh-8.5rem)] md:min-h-[calc(100vh-8.5rem)]
                            max-h-[calc(100vh-10.5rem)] min-h-[calc(100vh-10.5rem)]
                            md:max-w-[calc(100vw-280px)] md:min-w-[calc(100vw-280px)]
                            max-w-[calc(100vw-18px)] min-w-[calc(100vw-18px)]"

            >
                <div className="min-h-[calc(100vh-5rem)]" style={{ width: 'fit-content' }}>
                    {
                        branches.length === 0 && (
                            <div>
                                <Messages type="ExpBranchInfoMessage" />
                            </div>
                        )
                    }
                    <table className={`table-auto ${branches.length === 0 ? "hidden" : ""}  font-sans`}>
                        <thead className="sticky top-0 z-10  min-w-[500px] ">
                            <tr className="bg-white">
                                <th className="p-4 text-[13px] text-start min-w-[30px] sticky left-0 bg-white">Sel</th>
                                <th className="p-4 text-[13px] text-start min-w-[200px]">{t("branch_name")}</th>
                                <th className="p-4 text-[13px] text-start min-w-[150px]">{t("branch_code")}</th>
                                <th className="p-4 text-[13px] text-start min-w-[150px]">{t("establishment_date")}</th>
                                <th className="p-4 text-[13px] text-start min-w-[100px]">{t("phone")}</th>
                                <th className="p-4 text-[13px] text-start min-w-[200px]">{t("email")}</th>
                                <th className="p-4 text-[13px] text-start min-w-[300px]">{t("branch_address")}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {branches.length > 0 && branches.map((branch, index) => (
                                <tr key={index} className="border-b border-[#e4e4e7]">
                                    <td className="pr-2 sticky left-0 bg-white ">
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

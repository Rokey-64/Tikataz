'use client'

import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { setLeaders, deleteLeaders } from "@/redux/leadersSlice";
import AboveFixedContainer from "../../common/AboveFixedContainer";
import AboveInsertedButton from "../../common/AboveInsertedButton";
import ManagerEditor from "./ManagerEditor";
import ManagerShortDisplay from "./ManagerShortDisplay";
import InsertNoticeText from "../../common/InsertNoticeText";
import RightDeleteContainer from "../../common/RightDeleteContainer";
import ManagerDetailDisplay from "./ManagerDetailDisplay";
import loadLeadersAPI from "@/api/loadLeaders";
import DeleteLeadersAPI from "@/api/deleteLeader";
import DelayedRoute from "@/services/routeDelay";
import { useTranslations } from "next-intl";
import Messages from "../../common/Messages";

/** */
const ManagerList = () => {
    const dispatch = useDispatch();
    const t = useTranslations('trans');
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
                <AboveFixedContainer>
                    <AboveInsertedButton callback={addHandleClick} content={`${t("add_member")}`} options={{ icon: IoAdd }} />
                </AboveFixedContainer>
                <div className="flex">
                    <div className="overflow-y-auto overflow-x-auto flex justify-start py-2
                        md:max-h-[calc(100vh-120px)] md:min-h-[calc(100vh-120px)] 
                        max-h-[calc(100vh-150px)] min-h-[calc(100vh-150px)] 
                        w-[calc(100vw-18px)] md:w-[calc(100vw-280px)]">

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
                                    <Messages type="ManagerListMessage" />
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
                        callback={deleteCallback}>
                        <Messages type="ManagerListMessage2" />
                    </RightDeleteContainer>
                }
            </div>
        </DelayedRoute>
    )
};

export default ManagerList;
'use client'

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "@/redux/profile_slice";
import { setNations } from "@/redux/optionsSlice";
import { LiaEdit } from "react-icons/lia";
import CompanyInfoDisplay from "./CompanyInfoDisplay";
import CompanyInfoEditor from "./CompanyInfoEditor";
import AboveFixedContainer from "../../common/AboveFixedContainer/index";
import AboveInsertedButton from "../../common/AboveInsertedButton/index";
import InsertNoticeText from "../../common/InsertNoticeText/index";
import DelayedRoute from "@/services/routeDelay";
import { useTranslations } from "next-intl";
import profileAPI from "@/api/loadCommonProfile";
import Messages from "../../common/Messages/index";

/**
 * This component allows the user to view and edit the company information
 * @returns 
 */
const CompanyInfo = ({ initNation }) => {
    const dispatch = useDispatch();
    const t = useTranslations('trans');
    const profile = useSelector((state) => state.profile);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        /**
         * Load the profile information from the server
         * @returns {Promise<void>}
         */
        const loadProfile = async () => {
            const response = await profileAPI();
            if (response && response.profile) {
                dispatch(setProfile(response.profile));
            }
        };
        loadProfile();

        /**
         * Load the nations from the server
         * @param {Object} initNation 
         */
        if (initNation && initNation.nations) {
            dispatch(setNations(initNation.nations));
        }
    }, []);


    const editHandleClick = () => {
        setIsEdit(!isEdit);
    };

    return (
        <DelayedRoute>
            <div>
                <AboveFixedContainer>
                    <AboveInsertedButton callback={editHandleClick} content={`${t("update")}`} options={{ icon: LiaEdit }} />
                </AboveFixedContainer>

                <div className="flex">
                    <div className="overflow-y-auto overflow-x-auto p-2
                     md:max-h-[calc(100vh-120px)] md:min-h-[calc(100vh-120px)] 
                     max-h-[calc(100vh-150px)] min-h-[calc(100vh-150px)] 
                     w-[calc(100vw-18px)] md:w-[calc(100vw-270px)]">
                        {
                            profile.id && <CompanyInfoDisplay profile={profile} />
                        }

                        {
                            !profile.id && <Messages type="GeneralProfileMessage" />
                        }
                    </div>

                </div>
                {isEdit &&
                    <CompanyInfoEditor setIsEdit={setIsEdit} profile={profile} />
                }
            </div>
        </DelayedRoute>
    );
};



export default CompanyInfo;
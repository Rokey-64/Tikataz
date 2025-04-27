import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../../../../redux/profile_slice";
import { setNations } from "../../../../redux/optionsSlice";
import { LiaEdit } from "react-icons/lia";
import CompanyInfoDisplay from "./CompanyInfoDisplay";
import CompanyInfoEditor from "./CompanyInfoEditor";
import AboveFixedContainer from "../../common/AboveFixedContainer/index";
import AboveInsertedButton from "../../common/AboveInsertedButton/index";
import InsertNoticeText from "../../common/InsertNoticeText/index";
import loadCommonProfile from "../../../../api/loadCommonProfile";
import nationCategoryAPI from '../../../../api/nationCategory';
import DelayedRoute from "../../../../services/routeDelay";
import { useTranslation } from "react-i18next";

/**
 * This component allows the user to view and edit the company information
 * @returns 
 */
const CompanyInfo = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const profile = useSelector((state) => state.profile);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (profile.id)
            return;

        loadCommonProfile().then((data) => {
            if (data) {
                dispatch(setProfile(data.profile));
            }
        });
    }, []);

    /**
     * Load the data of select boxs
     */
    useEffect(() => {
        nationCategoryAPI().then((data) => {
            if (data) {
                dispatch(setNations(data.nations));
            }
        })
    }, [])


    const editHandleClick = () => {
        setIsEdit(!isEdit);
    };

    return (
        <DelayedRoute>
            <div>
                <AboveFixedContainer children={<AboveInsertedButton callback={editHandleClick} content={`${t("update")}`} options={{ icon: LiaEdit }} />} />

                <div className="flex">
                    <div className="overflow-y-auto overflow-x-auto max-h-[calc(100vh-120px)] min-h-[calc(100vh-120px)] w-[calc(100vw-10px)] md:w-[calc(100vw-270px)] p-2">
                        {
                            profile.id && <CompanyInfoDisplay profile={profile} />
                        }

                        {
                            !profile.id && <InsertNoticeText header={<strong>Cập nhật thông tin cơ bản về doanh nghiệp của bạn</strong>}
                                content={
                                    <div className="w-[35rem] space-y-1 space-x-1">
                                        <h2><strong>* Thông tin cơ bản bao gồm những gì?</strong></h2>
                                        <p>Thông tin cơ bản là nhưng thông tin giúp xác định doanh nghiệp của bạn và là nơi chúng tôi có thể dựa vào để liên lạc với bạn thông qua.
                                            Bao gồm tên doanh nghiệp, mã số thuế, địa chỉ, cách thức liên lạc,...<br />
                                            Thông tin này sẽ được hiển thị trên thẻ của bạn theo mặc định. Và bạn có thể thể thiết lập tùy chỉnh chế độ hiện thị với người xem
                                            thông qua phần thiết lập cài đặt trên menu công cụ.
                                        </p>
                                        <br />
                                        <h2><strong>🔰 Chi nhánh giúp bạn</strong></h2>
                                        <p>✔ Liên kết và tìm kiếm đối tác phù hợp với bạn thông qua địa chỉ mà bạn cung cấp</p>
                                        <p>✔ Tăng mức độ uy tính doanh nghiệp bạn</p>
                                        <p>✔ Hệ thống sẽ đánh giá điểm số thông tin mà bạn cung cấp, từ đó tăng đề xuất với khách hàng tiềm năng</p>
                                        <br />
                                        <h2 ><strong>⚠ Lưu ý:</strong></h2>
                                        <p>Chúng tôi kiểm duyệt thông tin mà bạn cung cấp trước khi chấp thuận nó như một phần của hồ sơ doanh nghiệp của bạn. Nếu nó không được chấp thuận
                                            do vi phạm chính sách hoặc tiêu chí đánh giá, bạn sẽ nhận được thông báo từ hệ thống.
                                        </p>
                                    </div>
                                }
                            />
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
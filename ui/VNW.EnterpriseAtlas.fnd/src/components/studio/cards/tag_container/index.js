
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import TagInline from "../tag_inline";
import { useState } from "react";
import AboveFixedContainer from "../../common/above_fixed_container/index";
import AboveInsertedButton from "../../common/above_inserted_button";
import DelayedRoute from "../../../../services/routeDelay";

const TagContainer = () => {
    const [showAddTag, setShowAddTag] = useState(false);
    const navigate = useNavigate();

    /**
     * Raise when user click on add row button
     */
    const addRowHandler = () => {
        /** Redirect to card page */
        navigate("/me/card");
    }

    return (
        <DelayedRoute>
            <div className="flex pt-6  w-screen mx-auto">
                <div className="md:pl-10 space-y-5">

                    <div>
                        <AboveFixedContainer
                            children={
                                <div className="flex items-center justify-end space-x-10 ">
                                    <AboveInsertedButton callback={addRowHandler} content="Thêm thẻ" options={{ icon: IoAdd }} />

                                </div>
                            } />
                    </div>

                    <div className="min-h-[calc(100vh-8.3rem)] max-h-[calc(100vh-8.3rem)] max-w-[calc(100vw-10px)] md:max-w-[calc(100vw-270px)] overflow-y-auto bg-white">
                        {
                            !showAddTag &&
                            <div>
                                <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full table-auto h-fit">
                                    <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400 z-10">
                                        <tr>
                                            <th scope="col" className="text-[12px] font-bold px-2 py-3 min-w-[80px] sticky left-0 top-0 z-20 bg-white">Lựa chọn</th>
                                            <th scope="col" className="text-[12px] font-bold px-8 py-3 min-w-[500px]">Thông tin thẻ</th>
                                            <th scope="col" className="text-[12px] font-bold px-2 py-3 min-w-[100px]">Chế độ</th>
                                            <th scope="col" className="text-[12px] font-bold px-2 py-3 min-w-[100px]">Bắt đầu</th>
                                            <th scope="col" className="text-[12px] font-bold px-2 py-3 min-w-[100px]">Kết thúc</th>
                                            <th scope="col" className="text-[12px] font-bold px-2 py-3 min-w-[200px]">Đánh giá</th>
                                            <th scope="col" className="text-[12px] font-bold px-2 py-3 min-w-[200px]">Báo giá / Đặt hàng</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            Array(14).fill().map((_, index) => (
                                                <TagInline key={index} setShowAddTag={setShowAddTag} />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </DelayedRoute>
    );
};

export default TagContainer;
import RightDisplayContainer from "../../common/right_display_container";
import InfoField from "../../common/read_only_field/index";
import InsertNoticeText from "../../insert_notice/index";

const ManagerViewDetail = ({ state, setState }) => {
    const localState = state.currentObject[0];

    return (
        <>
            <RightDisplayContainer state={state} setState={setState}
                children={
                    <div color="flex  items-center justify-center">
                        <div className="flex space-x-10 justify-center items-center flex-col space-y-5 sm:flex-row">
                            <div>
                                <img src={localState.logo || "/placeholder.jpg"} alt="Company Logo"
                                    className="object-cover min-w-40 w-40 min-h-40 h-40 rounded-full border-2 border-gray-300" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <InfoField label="Họ và tên" value={localState.name} />
                                <InfoField label="Ngày đảm nhiệm" value={localState.date} />
                                <InfoField label="Chức vụ" value={localState.position} />
                                <InfoField label="Số điện thoại" value={localState.phone} />
                                <InfoField label="Email" value={localState.email} />
                            </div>
                        </div>
                        <div className="flex items-center mt-14 w-full text-[16px] font-sans p-10 rounded-lg text-[#8f8f8f] bg-[#f0f9ff]">
                            <p><i
                                dangerouslySetInnerHTML={{
                                    __html: "“" + localState.slogan.replace(/\n/g, "<br />") + "”",
                                }}

                                className="font-bold"
                            ></i></p>
                        </div>
                    </div>
                }

                headerContent={
                    <InsertNoticeText header={<strong className="text-[14px] text-black ">Ban lãnh đạo của công ty</strong>}
                        content={
                            <div className="text-[13px] text-black font-sans text-justify leading-5 space-y-2">
                                <p>Hộp thoại này hiện thị thông tin chi tiết về thành viên ban lãnh đạo.</p>
                                <p>Thông tin thành viên sẽ được cập nhật trong hồ sơ doanh nghiệp, mặc định hiện thị công khai cho đối tác tiềm năng
                                    từ hệ thống Tikataz. </p>
                                <p>Bạn có thể điều chỉnh quyền truy cập ở thư mục cài đặt của phần này.</p>
                            </div>
                        }
                    />}
            />
        </>
    );
};

export default ManagerViewDetail;
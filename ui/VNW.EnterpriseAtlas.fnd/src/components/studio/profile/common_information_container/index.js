
import InfoField from "../../common/read_only_field/index";
import InsertNoticeText from "../../insert_notice/index";

const InfoBox = ({ profile}) => {
    return (
        <div className="min-w-[600px]">
            <div className="flex space-x-6 ">
                <div className="flex flex-col items-center border border-gray-300 rounded-md w-fit h-fit mt-6">
                    <img
                        src={profile.logo || ""}
                        alt="Company Logo"
                        className="w-24 h-24 object-contain m-6 "
                    />
                </div>
                <div className="space-y-2 ">
                    <InsertNoticeText header="Thông tin công ty" content="Thông tin cơ bản về công ty" />
                    <InfoField label="Tên công ty" value={profile.name} />
                    <InfoField label="Mã số thuế" value={profile.taxCode} />
                    <InfoField label="Ngày thành lập" value={profile.date} />
                    
                </div>
            </div>
            <div className="space-y-2 mt-5">
                <InsertNoticeText header="Thông tin công ty" content="Thông tin cơ bản về công ty" />
                <InfoField label="Số điện thoại" value={profile.phone} />
                <InfoField label="Số fax" value={profile.fax} />
                <InfoField label="Email" value={profile.email} />
            </div>
            <div className="space-y-2 mt-5">
                <InsertNoticeText header="Thông tin công ty" content="Thông tin cơ bản về công ty" />
                <InfoField label="Địa chỉ" value={profile.address} />
                <InfoField label="Quốc gia" value={profile.nation.value} />
            </div>
            <div className="space-y-2 mt-5">
                <InsertNoticeText header="Thông tin công ty" content="Thông tin cơ bản về công ty" />
                <InfoField label="Lĩnh vực kinh doanh" value={profile.businessField} />
                <InfoField label="Tầm nhìn" value={profile.vision} />
                <InfoField label="Sứ mệnh" value={profile.mission} />
            </div>
        </div>
    );
};

export default InfoBox
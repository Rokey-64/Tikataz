import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../../../../redux/cardsSlice";
import QuestionCover from "./QuestionCover";
import QuestionTypeOption1 from "./QuestionTypeOption1";
import QuestionTypeOption2 from "./QuestionTypeOption2";
import QuestionTypeInput from "./QuestionTypeInput";
import Messages from "../../../../common/Messages";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import get from "lodash/get";


const CardQuestions = () => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.cards.category);
    const [isOpen, setIsOpen] = useState(false);
    const note = "Chọn lựa những loại hình kinh doanh mà công ty của bạn cung cấp:"

    const updateCategory = (root, path, value) => {
        const obj = cloneDeep(root);
        set(obj, path, value);
        dispatch(setCategory(obj));
    };

    const kindOfBusiness = () => {
        return (
            <div className="grid md:grid-cols-[350px_350px] xl:grid-cols-[450px_450px] gap-4">
                <QuestionTypeOption1 title="Sản xuất" path="kindOfBusiness.production" callback={updateCategory} root={category}
                    explain="(Nhà sản xuất có mặt hàng chủ đạo, có xưởng sản xuất và có nhu cầu tìm đối tác thương mại)" />

                <QuestionTypeOption1 title="Gia công" path="kindOfBusiness.outsourcing" callback={updateCategory} root={category}
                    explain="(Nhà gia công có xưởng sản xuất, gia công và nhận gia công sản phẩm từ bên ngoài)" />

                <QuestionTypeOption1 title="Dịch vụ" path="kindOfBusiness.service" callback={updateCategory} root={category}
                    explain="(Nhà cung cấp dịch vụ cung cấp các giải pháp, các hoạt động tạo ra các giá trị vô hình. Ví dụ: dịch vụ tư vấn, dịch vụ đào tạo, sửa chữa, bảo trì,...)" />

                <QuestionTypeOption1 title="Thương mại" path="kindOfBusiness.commerce" callback={updateCategory} root={category}
                    explain="(Nhà thương mại không đầu tư trang thiết bị, nhà máy sản xuất. Tập trung vào khía cạnh tìm kiếm khách hàng và sản phẩm tiềm năngtừ các nhà sản xuất)" />
            </div>
        );
    };

    const transportation = () => {
        return (
            <div className="space-y-6">
                <QuestionTypeOption1 title="Giao vận trong nước:" path="transportation.domestic" callback={updateCategory} root={category}
                    explain="(Cung cấp những tùy chọn chính sách về vận chuyển mà bạn có thể cung cấp cho khách hàng của mình đối với khách hàng trong nước)">
                    <QuestionTypeOption1 title="Hỗ trợ vận chuyển" path="support" callback={updateCategory} root={category} />
                    <QuestionTypeOption1 title="Bởi dịch vụ vận chuyển" path="byService" callback={updateCategory} root={category} />
                    <QuestionTypeOption1 title="Bên mua chủ động" path="byBuyer" callback={updateCategory} root={category} />
                </QuestionTypeOption1>

                <QuestionTypeOption1 title="Giao vận quốc tế:" path="transportation.international" callback={updateCategory} root={category}
                    explain="(Cung cấp những tùy chọn chính sách về vận chuyển mà bạn có thể cung cấp cho khách hàng của mình đối với khách hàng quốc tế)">
                    <QuestionTypeOption2 title="Hình thức" path="international" root={category} callback={updateCategory}
                        options={[
                            { air: "Hàng không" },
                            { sea: "Đường biển" },
                            { rail: "Đường Sắt" },
                            { road: "Đường bộ" }]} />
                    <QuestionTypeOption2 title="Phương thức" path="incoterm" root={category} callback={updateCategory}
                        options={[
                            { EXW: "EXW" },
                            { FCA: "FCA" },
                            { FAS: "FAS" },
                            { FOB: "FOB" },
                            { CFR: "CFR" },
                            { CIF: "CIF" },
                            { CPT: "CPT" },
                            { DDP: "DDP" },
                            { DAP: "DAP" },
                            { DPU: "DPU" },
                            { negotiation: "Đàm Phán" }]}
                    />
                </QuestionTypeOption1>


                <QuestionTypeOption1 title="Thời gian" path="transportation.time" callback={updateCategory} root={category}
                    explain="(Là thời gian trung bình từ lúc nhận đơn hàng đến lúc giao hàng thành công cho khách hàng)">
                    <QuestionTypeInput title="Thời gian vận chuyển trong nước trung bình" unit="ngày"
                        path="domestic" callback={updateCategory} root={category} />

                    <QuestionTypeInput title="Thời gian vận chuyển quốc tế trung bình" unit="ngày"
                        path="international" callback={updateCategory} root={category} />
                </QuestionTypeOption1>

            </div>
        );
    };

    const partner = () => {
        return (
            <div className="space-y-6">
                <QuestionTypeOption1 title="Tham quan trụ sở, nhà máy" path="partner.sightseeing" callback={updateCategory} root={category}
                    explain="(Bằng việc xác nhận cho phép tham quan, khách hàng sẽ có cơ hội khảo sát thực tế môi trường nơi mà sản phẩm của bạn được tạo ra, 
                    đánh giá được chất lượng cũng như văn hóa làm việc trực quan hơn)">
                    <QuestionTypeOption1 title="Đối tác thứ ba" path="thirdParty" callback={updateCategory} root={category}
                        explain="(Khi xác nhận, khách hàng làm về lĩnh vực thương mại có thể dẫn đối tác thương mại của họ đến trụ sở, nhà máy của bạn để tham quan)" />
                </QuestionTypeOption1>
                <QuestionTypeOption1 title="Cung cấp mẫu:" path="partner.template" callback={updateCategory} root={category}
                    explain="(Nhà gia công có xưởng sản xuất, gia công và không có mặt hàng chủ đạo)">
                    <QuestionTypeOption2 title="Biểu phí mẫu" callback={updateCategory} path="cost" root={category}
                        options={[
                            { byCustomer: "Bên mua chịu" },
                            { byProvider: "Bên bán chịu" },
                            { negotiation: "Đàm phán thêm" }]} />
                    <QuestionTypeInput title="Thời gian hoàn thành trung bình" unit="ngày" path="time" callback={updateCategory} root={category} />
                </QuestionTypeOption1>
                <QuestionTypeOption1 title="Cung cấp chứng nhận, chứng chỉ" path="partner.certification" callback={updateCategory} root={category}
                    explain="(Áp dụng khi khách hàng của bạn cần cung cấp thêm một số loại chứng nhận đặc thù khác)" />
                <QuestionTypeOption1 title="Lên lịch" path="partner.schedule" callback={updateCategory} root={category}
                    explain="(Lên lịch là dịch vụ được cung cấp mà trong đó người mua có thể đặt gia công, sản xuất trước trong tương lai bằng các cam kết
                . Từ đó nhà gia công có thể chủ động nguồn lực đồng thời tiết kiệm chi phí thông qua nhưng cơ chế chiết khấu, khuyến mãi. Bằng cách chọn, bạn đồng ý cho việc thỏa thuận lên lịch)" />
                <QuestionTypeOption1 title="Hỗ trợ công nợ" path="partner.debt" callback={updateCategory} root={category}
                    explain="(Là chính sách cho phép khách hàng mua hàng hóa được thanh toán sau đó một khoảng thời gian nhất định thông qua các cam kết,
                            điều này giúp khách hàng đảm bảo dòng tiền và nâng cao độ uy tín doanh nghiệp nhưng có thể mang lại rủi ro..)">
                    <QuestionTypeOption1 title="trong nước" path="domestic" callback={updateCategory} root={category}
                        explain="(Chỉ áp dụng cho khách hàng trong nước)" />
                    <QuestionTypeOption1 title="quốc tế" path="international" callback={updateCategory} root={category}
                        explain="(Chỉ áp dụng cho khách hàng quốc tế)" />
                </QuestionTypeOption1>
                <QuestionTypeOption1 title="Nhà cung cấp dự phòng" path="partner.failover" callback={updateCategory} root={category}
                    explain="(Nếu bạn tích chọn, bạn sẽ đảm nhận thêm vai trò là nhà cung cấp dự phòng. Khi khách hàng xác nhận
                bạn là nhà cung cấp dự phòng, thì đơn đặt hàng từ khách hàng này được ưu tiên gửi đến bạn khi có sự biến động về hàng hóa khách hàng cần bổ sung thêm)" />
            </div>
        );
    };

    const storage = () => {
        return (
            <div className="space-y-6">
                <QuestionTypeOption1 title="Hỗ trợ kho bãi" path="storage" callback={updateCategory} root={category}
                    explain="(Bằng việc xác nhận, đối tác của bạn có thể sử dụng kho bãi của bạn để lưu trữ hàng hóa, giảm chi phí vận chuyển và tăng cơ hội bán hàng)">
                    <QuestionTypeOption2 title="Loại kho" path="type" root={category} callback={updateCategory}
                        options={[
                            { cold: "Kho lạnh" },
                            { dry: "Kho khô" },
                            { material: "Kho nguyên liệu" },
                            { product: "Kho thành phẩm" }]} />
                    <QuestionTypeInput title="Diện tích kho bãi" unit="m2" path="area" callback={updateCategory} root={category} />
                    <QuestionTypeInput title="Sức chứa" unit="tấn" path="capacity" callback={updateCategory} root={category} />
                    <QuestionTypeOption1 title="Phí lưu trữ" explain="(Là đối tượng chịu chi phí cho việc bảo quản tại kho bãi)" path="cost" callback={updateCategory} root={category}>
                        <QuestionTypeOption1 title="Bên mua chịu" path="byCustomer" callback={updateCategory} root={category} />
                        <QuestionTypeOption1 title="Bên bán chịu" path="byProvider" callback={updateCategory} root={category} />
                        <QuestionTypeOption1 title="Đàm phán thêm" path="negotiation" callback={updateCategory} root={category} />
                    </QuestionTypeOption1>
                    <QuestionTypeInput title="Thời gian lưu kho tối đa" unit="ngày" path="time" callback={updateCategory} root={category} />
                </QuestionTypeOption1>
            </div>
        );
    };

    const merge = () => {
        return (
            <div>
                <QuestionTypeOption1 title="Ghép hàng" path="merge" callback={updateCategory} root={category}
                    explain="(Ghép hàng là hình thức mới, giúp tiết kiệm chi phí cho khách hàng và nhà sản xuất bằng cách cho phép gộp các đơn hàng
                khác nhau từ nhiều khách hàng nhưng cùng loại, từ đó thay đổi hình thức sản xuất thành số lượng lớn)" />
            </div>
        );
    };

    const promotion = () => {
        return (
            <div>
                <QuestionTypeOption1 title="Khuyến mãi" path="promotion" callback={updateCategory} root={category}
                    explain={
                        <div className="space-y-2">
                            (Các hình thức khuyến mãi cơ bản mà bạn có thể cung cấp cho khách hàng của mình)<br />
                            <strong>Lưu ý:</strong><br/> 🔸 Đây chỉ là những hình thức khuyến mãi cơ bản. khi bạn có những chính sách khuyến mãi, giảm giá cụ thể, vui lòng <mark>thiết lập highlight</mark> ở chiến dịch marketing
                        </div>
                    }>
                    <QuestionTypeOption1 title="Số lượng" path="number" callback={updateCategory} root={category}
                        explain="(Khi tích chọn, đồng nghĩa với việc doanh nghiệp bạn sẽ áp dụng chính sách khuyến mãi cho khách hàng mua đủ một số lượng nhất định)" />
                    <QuestionTypeOption1 title="Khách hàng thân thiết" path="loyal" callback={updateCategory} root={category}
                        explain="(Khi tích chọn, đồng nghĩa với việc doanh nghiệp bạn sẽ áp dụng chính sách khuyến mãi cho khách hàng là khách hàng thân tín)" />
                    <QuestionTypeOption1 title="Thời điểm" path="time" callback={updateCategory} root={category}
                        explain="(Khi tích chọn, đồng nghĩa với việc doanh nghiệp bạn sẽ áp dụng chính sách khuyến mãi theo từng thời điểm nhất định, vd: Lễ, Tết, ...)" />
                    <QuestionTypeOption1 title="Vị trí" path="location" callback={updateCategory} root={category}
                        explain="(Khi tích chọn, đồng nghĩa với việc doanh nghiệp bạn sẽ áp dụng chính sách khuyến mãi theo vị trí nhất định, vd: Miền Bắc, Miền Trung, Miền Nam, ...)">
                        <QuestionTypeOption1 title="Trong nước" path="domestic" callback={updateCategory} root={category} />
                        <QuestionTypeOption1 title="Quốc tế" path="international" callback={updateCategory} root={category} />
                    </QuestionTypeOption1>
                </QuestionTypeOption1>
            </div>
        );
    }

    const checkRequired = () => {
        if (get(category, "kindOfBusiness.production.value")
            || get(category, "kindOfBusiness.outsourcing.value")
            || get(category, "kindOfBusiness.service.value")
            || get(category, "kindOfBusiness.commerce.value")) {
            return false;
        }
        return true;
    }
    return (
        <div className="mb-10">
            <Messages type="CategoryMessage" />
            <QuestionCover title="Loại Hình" template={kindOfBusiness()} note={note} isOpen={true} isRequired={checkRequired()} />
            <QuestionCover title="Giao Vận" template={transportation()} />
            <QuestionCover title="Đối Tác" template={partner()} />
            <QuestionCover title="Kho Bãi" template={storage()} />
            <QuestionCover title="Ghép hàng" template={merge()} />
            <QuestionCover title="Khuyến mãi" template={promotion()} />
        </div>
    );
};

export default CardQuestions;

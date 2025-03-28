import React from 'react';
import InsertNoticeText from '../InsertNoticeText';

/**
 * Get a message to notify the user about the card
 * @param {*} param0 
 */
const Messages = ({ type }) => {
    switch (type) {
        case 'ProductMessage':
            return <ProductMessage />
        case 'CertMessage':
            return <CertMessage />
        case 'CertMessage2':
            return <CertMessage2 />
        case 'CardRemoveProduct':
            return <CardRemoveProduct />
        case "CertInputMessage":
            return <CertInputMessage />
        case "CertRemoveMessage":
            return <CertRemoveMessage />
        case "CategoryMessage":
            return <CategoryMessage />
        default:
            return <></>


    }
};

const CategoryMessage = () => {
    return (
        <InsertNoticeText
            header="Hạng mục mở rộng"
            content={
                <div className="text-[12px] font-sans text-justify leading-5 space-y-2 ml-6 w-[600px]">
                    <p>
                        Hạn mục bao gồm các tiêu chí bên ngoài các dữ liệu đã lấy bên trên, tập trung vào các điều kiện nâng cao mà doanh nghiệp có thể cung cấp cho khách hàng đồng Thời
                        tăng tín trực quang của thẻ đối với đối tác.<br />
                        Điều này không chỉ cần thiết đối với đối tác của bạn mà còn giúp chúng tôi nhận biết mức độ phù hợp của bạn với các đề xuất từ khách hàng.<br />
                        - Vui lòng cung cấp thông tin chi tiết và chính xác nhất bằng cách chọn các hạng mục phù hợp với doanh nghiệp của bạn và điền thông tin cần thiết vào các ô nhập bên dưới.<br />
                        
                    </p>
                </div>
            }
        />
    );
};

const CertRemoveMessage = () => {
    return (
        <InsertNoticeText header={<strong className="text-[12px] ">Xóa chứng chỉ:</strong>}
            content={
                <div className="text-[12px] font-sans text-justify leading-5 space-y-2">
                    <p>Sau khi xác nhận xóa chứng chỉ, các chứng chỉ bị xóa sẽ không thể khôi phục. Thay vào đó nếu muốn bổ sung hay thêm mới chứng chỉ</p>
                </div>
            }
        />
    );
};


const CertInputMessage = () => {
    return (
        <InsertNoticeText header={<strong className="text-[12px] ">Hướng dẫn:</strong>}
            content={
                <div className="text-[12px] font-sans text-justify leading-5 space-y-2">
                    <p>Chọn hoặc tìm kiếm đúng loại chứng chỉ cần thêm.<br />
                        Sau đó điền các thông tin về chứng chỉ cần thiết vào các ô nhập bên dưới.<br />
                        Trong trường hợp không tìm thấy loại chứng chỉ của bạn, hãy chọn chứng chỉ mặc định là chưa xác định, và vẫn điền các thông tin còn lại như thông thường
                    </p>
                </div>
            }
        />
    );
};

const CardRemoveProduct = () => {
    return (
        <InsertNoticeText header={<strong className="text-[14px] text-black ">Việc xóa chi nhánh tác động như thế nào đến quy trình của bạn?</strong>}
            content={
                <div className="text-[13px] text-black font-sans text-justify leading-5 space-y-2">
                    <p>Các chi nhánh được chọn sẽ bị xóa. Điều này sẽ cập nhật đến hồ sơ năng lực của bạn.</p>
                    <p>Hệ thống sẽ bỏ qua gợi ý vị trí địa lý đối với những chi nhánh này.
                        Và những đơn hàng phù hợp trước đây sẽ không hiện thị nếu nằm ngoài phạm vi mới.</p>
                    <p>Việc bạn thêm mới lại chi nhánh sẽ được chúng tôi kiểm duyệt và đánh giá trước khi bắt đầu liên kết đơn hàng.</p>
                </div>
            }
        />
    );
};

const CertMessage2 = () => {
    return (
        <InsertNoticeText
            header="Một số lưu ý mở rộng"
            content={
                <>
                    * Trong trường hợp không tìm thấy được biểu tượng chứng chỉ yêu cầu, bạn có thể:<br />
                    <strong>1. Phản hồi:</strong> Gửi một phản hồi yêu cầu xây dựng hệ thống chứng chỉ đặc thù của sản phẩm của bạn.<br />
                    <strong>2. Thêm ở module sản phẩm:</strong> Không chỉ giới hạn ở hình thức sản phẩm, bạn có thể thêm các giải thưởng, hình ảnh thể hiện độ uy tín của sản phẩm
                    của bạn<br /><br />
                </>
            }
        />
    );
};

const CertMessage = () => {
    return (
        <InsertNoticeText
            header="Chứng chỉ, chứng nhận"
            content={
                <>
                    * Chúng tôi sẽ dựa vào thông tin chứng chỉ bạn cung cấp để xác định rằng doanh nghiệp bạn có đáp ứng được các yêu cầu khách hàng đưa ra trên sản phẩm hay không
                    từ đó xác định đề xuất phù hợp.<br /><br />
                    *<b> Lưu ý:</b> Chứng chỉ được quy định là những chứng chỉ chính thức, có giá trị thể hiện độ tin cậy đáp ứng các yêu cầu đưa ra từ các tổ chức hợp lệ.<br />
                    Điều này không bao gồm các giải thưởng, huy hiệu hoặc
                    danh hiệu khác.<br />
                    - Trong các trường hợp khác, vui lòng phản hồi cho chúng tôi để nhận được sự hỗ trợ hợp lý.<br /><br />

                </>
            }
        />
    );
};

const ProductMessage = () => {
    return (
        <InsertNoticeText
            header="Sản phẩm, dịch vụ"
            content={
                <>
                    * Lựa chọn một số hình ảnh đặc trưng sản phẩm của bạn, để cho tối tác dễ dàng nhận biết sản phẩm và năng lực của bạn,
                    hình ảnh đảm bảo một số yêu cầu sau:<br />
                    <strong>1. Định dạng ảnh:</strong> Hỗ trợ một số định dạng ảnh *.PNG; *.JPG/JPEG; *.WebP .<br />
                    <strong>2. Kích thước ảnh:</strong> Mỗi hình ảnh nên có kích thước dưới 400x400 pixels<br />
                    <strong>3. Dung lượng ảnh:</strong> Mỗi hình ảnh yêu cầu dung lượng dưới 0.3Mb, nếu vượt quá kích thước hệ thống sẽ nén xuống theo kích thước phù hợp,
                    điều này có thể ảnh hưởng đến chất lượng hình ảnh của bạn.<br /><br />

                    {/* * Lưu ý: Nếu bạn không cung cấp thêm, mặc định sẽ lấy thông tin từ hồ sơ của bạn. Vui lòng hoàn tất hồ sơ của bạn. */}
                </>
            }
        />
    );
};



export default Messages;
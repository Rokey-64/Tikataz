import React, { useRef, useEffect } from 'react';
import { use } from 'react';

const Terms = ({ activeTab }) => {
    const aboutUsRef = useRef(null);
    const missionRef = useRef(null);
    const valuesRef = useRef(null);

    // Hàm xử lý scroll
    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (activeTab === 'about_us') {
                scrollToSection(aboutUsRef);
            } else if (activeTab === 'mission') {
                scrollToSection(missionRef);
            } else if (activeTab === 'values') {
                scrollToSection(valuesRef);
            }
        }, 50); // hoặc 100ms nếu cần

        return () => clearTimeout(timeout);
    }, [activeTab]);



    return (
        <div className="space-y-8 text-gray-700">
            {/* Tiêu đề */}
            <div className="text-center mb-10" ref={aboutUsRef}>
                <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                    Quy định & Chính sách Sử dụng Dịch vụ TIKATAZ
                </h1>
                <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
            </div>

            {/* Phần Giới thiệu */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-500">I. Thông tin chung</h2>
                <p>
                    <strong>Hệ thống Atlas Tikataz</strong> là nền tảng hỗ trợ doanh nghiệp tìm kiếm đối tác và khách hàng một cách thông minh,
                    đồng thời tối ưu hóa quy trình lựa chọn nhà cung cấp phù hợp.
                </p>
                <p>Nền tảng cung cấp các công cụ giúp:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Kết nối giữa khách hàng và nhà cung cấp thông qua hồ sơ doanh nghiệp chi tiết.</li>
                    <li>Ứng dụng giải pháp tự động hóa trong quá trình đánh giá, chọn lọc và đề xuất nhà cung cấp tiềm năng.</li>
                    <li>Báo giá nhà cung cấp nhanh chóng, minh bạch.</li>
                </ul>
                <p>
                    Mục tiêu của chúng tôi là xây dựng một hệ sinh thái minh bạch – tiện lợi – hiệu quả để hỗ trợ doanh nghiệp phát triển bền vững.
                </p>
                <p><strong>Thời gian áp dụng:</strong> Chính sách này có hiệu lực từ ngày <em>20/04/2025</em>.</p>
                <p className="font-medium">Một số định nghĩa:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li><strong>“Nền tảng”</strong>: Hệ thống Atlas Tikataz bao gồm website, ứng dụng và dịch vụ trực tuyến.</li>
                    <li><strong>“Người dùng”</strong>: Cá nhân hoặc tổ chức sử dụng dịch vụ, bao gồm cả khách hàng và nhà cung cấp.</li>
                    <li><strong>“Khách hàng”</strong>: Người tìm kiếm nhà cung cấp sản phẩm hoặc dịch vụ.</li>
                    <li><strong>“Nhà cung cấp”</strong>: Người đăng tải hồ sơ doanh nghiệp, cung cấp sản phẩm hoặc dịch vụ trên hệ thống.</li>
                    <li><strong>“Báo giá”</strong>: Thông tin giá cả và điều kiện do nhà cung cấp gửi đến khách hàng.</li>
                    <li><strong>“Dữ liệu người dùng (DLC)”</strong>: Thông tin có thể dùng để xác định danh tính cá nhân hoặc tổ chức.</li>
                </ul>
            </section>

            <section className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold text-blue-500">II. Điều kiện sử dụng</h2>
                <h3 className="text-xl font-medium">1. Quyền và nghĩa vụ</h3>
                <h4 className="text-lg font-medium">a. Đối với khách hàng</h4>
                <p>Khi sử dụng dịch vụ, khách hàng đồng ý:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật.</li>
                    <li>Không sử dụng nền tảng để thực hiện hành vi gian lận, lừa đảo.</li>
                    <li>Tôn trọng quyền lợi và thông tin của các nhà cung cấp khác.</li>
                    <li>Chịu trách nhiệm về việc đánh giá và lựa chọn nhà cung cấp.</li>
                    <li>Không sao chép, phát tán nội dung nền tảng khi chưa được cho phép.</li>
                </ul>

                <h4 className="text-lg font-medium">b. Đối với nhà cung cấp</h4>
                <p>Nhà cung cấp có trách nhiệm:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Cung cấp thông tin doanh nghiệp minh bạch, chính xác.</li>
                    <li>Cam kết gửi báo giá đúng với năng lực thực tế.</li>
                    <li>Không quảng bá nội dung không phù hợp hoặc vi phạm pháp luật.</li>
                    <li>Tôn trọng quy trình xét duyệt và phản hồi từ khách hàng.</li>
                </ul>

                <h3 className="text-xl font-medium">2. Xử lý vi phạm</h3>
                <p>Các hình thức xử lý vi phạm bao gồm:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Cảnh báo qua email hoặc hệ thống.</li>
                    <li>Tạm ngừng quyền truy cập một số tính năng.</li>
                    <li>Tạm khóa hoặc xóa hồ sơ doanh nghiệp.</li>
                    <li>Cấm vĩnh viễn sử dụng dịch vụ.</li>
                    <li>Thông báo cơ quan chức năng nếu vi phạm pháp luật.</li>
                </ul>
                <p>Người dùng có quyền khiếu nại trong vòng 7 ngày làm việc nếu không đồng ý với quyết định xử lý.</p>
            </section>

            <section className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold text-blue-500">III. Chính sách mua hàng</h2>
                <p><strong>Lưu ý quan trọng:</strong> Nền tảng chỉ đóng vai trò hỗ trợ kết nối, không tham gia vào quá trình mua bán, thanh toán hay giao nhận giữa các bên.</p>

                <h3 className="text-xl font-medium">1. Về mua bán, trao đổi</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Cung cấp chức năng gửi/nhận báo giá giữa khách hàng và nhà cung cấp.</li>
                    <li>Quá trình thương lượng, ký kết hợp đồng do hai bên tự thỏa thuận.</li>
                    <li>Không chịu trách nhiệm với rủi ro hay tranh chấp phát sinh từ giao dịch.</li>
                </ul>

                <h3 className="text-xl font-medium">2. Về dịch vụ của chúng tôi</h3>
                <p>Các dịch vụ chính bao gồm:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Công cụ tìm kiếm và gợi ý nhà cung cấp phù hợp.</li>
                    <li>Tính năng gửi/nhận báo giá trực tiếp qua nền tảng.</li>
                    <li>Trang hồ sơ doanh nghiệp chuyên nghiệp.</li>
                    <li>Báo cáo thống kê hiệu quả tương tác.</li>
                    <li>Gói dịch vụ tăng hiển thị cho nhà cung cấp.</li>
                </ul>
                <p>Một số dịch vụ nâng cao có thể yêu cầu đăng ký gói trả phí.</p>
            </section>

            <section className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold text-blue-500">IV. Chính sách thanh toán</h2>
                <h3 className="text-xl font-medium">1. Hình thức thanh toán</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Thanh toán trực tuyến qua cổng điện tử tích hợp.</li>
                    <li>Thanh toán trực tiếp theo thỏa thuận với bộ phận hỗ trợ.</li>
                </ul>
                <p>Hóa đơn sẽ được gửi đến email đăng ký trước ngày 07 hàng tháng.</p>

                <h3 className="text-xl font-medium">2. Kỳ hạn thanh toán</h3>
                <p>Dịch vụ sẽ được kích hoạt sau khi hoàn tất thanh toán và cấu hình thành công.</p>

                <h3 className="text-xl font-medium">3. Xác nhận thanh toán</h3>
                <p>Thông báo xác nhận sẽ được gửi đến email đăng ký sau khi thanh toán hoàn tất.</p>

                <h3 className="text-xl font-medium">4. Chính sách hoàn tiền</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Số dư chưa sử dụng có thể dùng cho dịch vụ tiếp theo.</li>
                    <li>Yêu cầu hoàn tiền vào tài khoản ngân hàng sẽ được xử lý trong 7 ngày làm việc.</li>
                </ul>

                <h3 className="text-xl font-medium">5. Từ chối trách nhiệm</h3>
                <p>Không chịu trách nhiệm với các lỗi thanh toán không xuất phát từ hệ thống:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Thanh toán không đúng thông tin hướng dẫn chính thức.</li>
                    <li>Giao dịch thực hiện qua trung gian không được ủy quyền.</li>
                    <li>Sự cố liên quan đến tài khoản ngân hàng của người dùng.</li>
                </ul>
            </section>

            <section className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold text-blue-500">V. Chính sách bảo mật thông tin</h2>
                <p>Chúng tôi cam kết bảo vệ thông tin cá nhân của người dùng theo nguyên tắc:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Chỉ thu thập thông tin cần thiết phục vụ dịch vụ.</li>
                    <li>Không chia sẻ thông tin cho bên thứ ba khi chưa được đồng ý.</li>
                    <li>Lưu trữ và xử lý trên hệ thống bảo mật cao.</li>
                    <li>Người dùng có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân.</li>
                </ul>

                <h3 className="text-xl font-medium">1. Phạm vi áp dụng</h3>
                <p>Áp dụng với tất cả người dùng truy cập và sử dụng nền tảng.</p>

                <h3 className="text-xl font-medium">2. Mục đích sử dụng thông tin</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Hỗ trợ đăng ký, xác thực tài khoản.</li>
                    <li>Cải thiện trải nghiệm người dùng.</li>
                    <li>Hỗ trợ kỹ thuật và nâng cao chất lượng dịch vụ.</li>
                </ul>

                <h3 className="text-xl font-medium">3. Phương thức thu thập</h3>
                <p>Thông qua:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Đăng ký tài khoản và điền thông tin.</li>
                    <li>Sử dụng các tính năng hệ thống.</li>
                    <li>Tương tác qua email, hỗ trợ khách hàng.</li>
                    <li>Cookie và công cụ phân tích tự động.</li>
                </ul>

                <h3 className="text-xl font-medium">4. Thời gian lưu trữ</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Thông tin tài khoản: lưu trữ trong suốt thời gian hoạt động.</li>
                    <li>Sau khi ngừng sử dụng: tối đa 12 tháng.</li>
                    <li>Thông tin tài chính: theo quy định pháp luật.</li>
                </ul>
            </section>

            <section className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold text-blue-500">VI. Quyền sở hữu trí tuệ</h2>
                <p>Tất cả nội dung trên nền tảng (giao diện, biểu tượng, văn bản, hình ảnh, mã nguồn...) đều thuộc quyền sở hữu của Atlas Tikataz hoặc bên thứ ba được cấp phép.</p>
                <p>Người dùng không được phép sao chép, chỉnh sửa hoặc phân phối nội dung khi chưa có sự cho phép bằng văn bản.</p>
                <p>Vi phạm có thể dẫn đến tạm ngưng tài khoản, bồi thường hoặc xử lý theo pháp luật.</p>
            </section>

            <section className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold text-blue-500">VII. Giới hạn trách nhiệm</h2>
                <p>Chúng tôi không chịu trách nhiệm với:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Sự gián đoạn dịch vụ do sự cố kỹ thuật hoặc nguyên nhân khách quan.</li>
                    <li>Thiệt hại từ việc người dùng hiểu sai, sử dụng sai thông tin.</li>
                    <li>Giao dịch giữa người dùng và bên thứ ba ngoài phạm vi hệ thống.</li>
                </ul>
                <p>Khuyến nghị người dùng đọc kỹ điều khoản trước khi sử dụng dịch vụ.</p>
            </section>

            <section className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold text-blue-500">VIII. Giải quyết tranh chấp</h2>
                <p>Ưu tiên giải quyết tranh chấp thông qua thương lượng thiện chí.</p>
                <p>Nếu không đạt được thỏa thuận, sẽ áp dụng theo quy định pháp luật tại nước sở tại.</p>
                <p>Mọi khiếu nại vui lòng gửi về bộ phận chăm sóc khách hàng qua email chính thức.</p>
                <p>Cam kết phản hồi và xử lý trong vòng 07 ngày làm việc.</p>
            </section>

            <section className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold text-blue-500">IX. Thay đổi điều khoản</h2>
                <p>Chúng tôi có quyền cập nhật, điều chỉnh điều khoản bất kỳ lúc nào để phù hợp với:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Định hướng phát triển nền tảng.</li>
                    <li>Yêu cầu pháp luật hoặc phản hồi người dùng.</li>
                </ul>
                <p>Thay đổi sẽ được công bố công khai trên nền tảng và/hoặc gửi thông báo qua email.</p>
                <p>Việc tiếp tục sử dụng dịch vụ sau khi điều khoản mới có hiệu lực được xem là chấp thuận thay đổi.</p>
                <p>Nếu không đồng ý, người dùng có thể ngừng sử dụng dịch vụ và liên hệ hỗ trợ.</p>
            </section>


        </div>
    );
}

export default Terms;
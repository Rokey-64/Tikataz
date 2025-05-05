import React, { useRef, useEffect } from 'react';

const Policy = ({ activeTab }) => {
    const collectRef = useRef(null);
    const usageRef = useRef(null);
    const cookiesRef = useRef(null);

    // Hàm xử lý scroll
    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
             if (activeTab === 'data_collection') {
                scrollToSection(collectRef);
            } else if (activeTab === 'data_usage') {
                scrollToSection(usageRef);
            }
            else if (activeTab === 'cookies') {
                scrollToSection(cookiesRef);
            }
        }, 50); // hoặc 100ms nếu cần

        return () => clearTimeout(timeout);
    }, [activeTab]);



    return (
        <div className="space-y-8 text-gray-700">
            {/* Tiêu đề */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                    Tikataz – Chính sách bảo mật và quyền riêng tư
                </h1>
                <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
            </div>

            <section className="space-y-4 mt-8" ref={collectRef}>
                <h2 className="text-2xl font-semibold text-blue-500">Thu thập dữ liệu</h2>
                <p>Chúng tôi thu thập thông tin nhằm cung cấp và cải thiện dịch vụ, bao gồm:</p>

                <h3 className="text-xl font-medium">1. Dữ liệu cung cấp trực tiếp</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li><strong>Thông tin đăng ký:</strong> Họ tên, email, số điện thoại, địa chỉ khi tạo tài khoản</li>
                    <li><strong>Thông tin doanh nghiệp:</strong> Tên công ty, mã số thuế, lĩnh vực hoạt động, năng lực sản xuất</li>
                    <li><strong>Nội dung giao dịch:</strong> Yêu cầu báo giá, phản hồi, đánh giá giữa các bên</li>
                </ul>

                <h3 className="text-xl font-medium">2. Dữ liệu tự động thu thập</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li><strong>Thông tin thiết bị:</strong> IP, trình duyệt, hệ điều hành, loại thiết bị</li>
                    <li><strong>Nhật ký truy cập:</strong> Thời gian, tần suất sử dụng, lỗi hệ thống</li>
                    <li><strong>Hành vi sử dụng:</strong> Trang truy cập, tính năng tương tác, thời gian hoạt động</li>
                </ul>

                <h3 className="text-xl font-medium">3. Nguồn thu thập khác</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Dữ liệu từ bên thứ ba khi bạn liên kết tài khoản mạng xã hội</li>
                    <li>Thông tin từ đối tác cung cấp dịch vụ xác thực</li>
                    <li>Dữ liệu công khai từ các nguồn hợp pháp</li>
                </ul>

                <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                    <p className="font-medium">Lưu ý quan trọng:</p>
                    <p>Chúng tôi KHÔNG thu thập thông tin nhạy cảm như: số thẻ tín dụng, dữ liệu sinh trắc học hoặc thông tin sức khỏe mà không có sự đồng ý rõ ràng.</p>
                </div>
            </section>

            <section className="space-y-4 mt-8" ref={usageRef}>
                <h2 className="text-2xl font-semibold text-blue-500">Sử dụng thông tin</h2>
                <p>Dữ liệu thu thập được sử dụng cho các mục đích sau:</p>

                <h3 className="text-xl font-medium">1. Mục đích chính</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Cung cấp và duy trì dịch vụ nền tảng</li>
                    <li>Xác thực tài khoản và bảo mật hệ thống</li>
                    <li>Kết nối hiệu quả giữa khách hàng và nhà cung cấp</li>
                    <li>Cải thiện trải nghiệm người dùng cá nhân hóa</li>
                </ul>

                <h3 className="text-xl font-medium">2. Mục đích phân tích</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Phân tích xu hướng sử dụng để tối ưu hệ thống</li>
                    <li>Đo lường hiệu quả các tính năng mới</li>
                    <li>Phát triển thuật toán đề xuất phù hợp</li>
                </ul>

                <h3 className="text-xl font-medium">3. Mục đích pháp lý</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Tuân thủ yêu cầu pháp luật và quy định</li>
                    <li>Giải quyết tranh chấp hoặc khiếu nại</li>
                    <li>Ngăn chặn hoạt động gian lận, lạm dụng</li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-400">
                    <p className="font-medium">Cam kết minh bạch:</p>
                    <p>Chúng tôi sẽ không sử dụng dữ liệu cá nhân cho mục đích khác ngoài những điều đã công bố mà không thông báo trước và nhận được sự đồng ý của bạn.</p>
                </div>
            </section>

            <section className="space-y-4 mt-8" ref={cookiesRef}>
                <h2 className="text-2xl font-semibold text-blue-500">Chính sách Cookie</h2>
                <p>Cookie giúp nâng cao trải nghiệm người dùng và hiểu cách bạn tương tác với nền tảng.</p>

                <h3 className="text-xl font-medium">1. Loại cookie sử dụng</h3>
                <ul className="list-disc space-y-2 pl-5">
                    <li>
                        <strong>Cookie thiết yếu:</strong>
                        <span className="text-gray-600"> Duy trì phiên đăng nhập, bảo mật hệ thống (không thể tắt)</span>
                    </li>
                    <li>
                        <strong>Cookie chức năng:</strong>
                        <span className="text-gray-600"> Ghi nhớ tùy chọn ngôn ngữ, cài đặt hiển thị</span>
                    </li>
                    <li>
                        <strong>Cookie phân tích:</strong>
                        <span className="text-gray-600"> Theo dõi lượt truy cập, hành vi sử dụng (có thể từ chối)</span>
                    </li>
                    <li>
                        <strong>Cookie quảng cáo:</strong>
                        <span className="text-gray-600"> Hiển thị nội dung phù hợp với sở thích (có thể từ chối)</span>
                    </li>
                </ul>

                <h3 className="text-xl font-medium">2. Quản lý cookie</h3>
                <p>Bạn có thể kiểm soát cookie thông qua:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Cài đặt trình duyệt: Chặn/từ chối cookie cụ thể</li>
                    <li>Bảng thông báo cookie khi truy cập lần đầu</li>
                    <li>Công cụ quản lý quyền riêng tư trong tài khoản</li>
                </ul>

                <h3 className="text-xl font-medium">3. Công nghệ tương tự</h3>
                <p>Ngoài cookie, chúng tôi có thể sử dụng:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Local Storage: Lưu trữ dữ liệu tạm trên thiết bị</li>
                    <li>Web Beacons: Theo dõi tỷ lệ mở email thông báo</li>
                    <li>Pixel Tags: Đo lường hiệu quả chiến dịch</li>
                </ul>

                <div className="bg-green-50 p-4 rounded-md border-l-4 border-green-400">
                    <p className="font-medium">Tác động khi vô hiệu hóa cookie:</p>
                    <p>Một số tính năng có thể không hoạt động tối ưu nếu bạn từ chối cookie thiết yếu. Các dịch vụ cốt lõi vẫn được đảm bảo.</p>
                </div>
            </section>
        </div>
    );
}

export default Policy;
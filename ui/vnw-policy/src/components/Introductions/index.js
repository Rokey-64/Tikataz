import React, { useRef, useEffect } from 'react';
import { use } from 'react';

const Introductions = ({ activeTab }) => {
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
                    Tikataz – Nền tảng kết nối thông minh giữa doanh nghiệp và nhà cung cấp
                </h1>
                <div className="w-24 h-1 bg-blue-400 mx-auto"></div>
            </div>

            {/* Phần Giới thiệu */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-500">Giới thiệu</h2>
                <p>
                    <strong>Tikataz</strong> là nền tảng số tiên phong trong việc tái định hình cách doanh nghiệp kết nối và hợp tác với nhà cung cấp trong thời đại số.
                    Với triết lý hoạt động <em>“tự động hóa – minh bạch – không trung gian”</em>, Tikataz giúp doanh nghiệp tiếp cận nhanh chóng và hiệu quả các nguồn cung ứng nguyên vật liệu
                    và trang thiết bị phục vụ sản xuất, loại bỏ các rào cản không cần thiết trong quy trình truyền thống.
                </p>
                <p>
                    Nền tảng cũng hỗ trợ việc tìm kiếm và kết nối với các nhà gia công uy tín, giúp doanh nghiệp đặt hàng nhanh chóng, đảm bảo chất lượng,
                    đồng thời khảo sát thị trường và theo dõi biến động giá cả một cách dễ dàng – tất cả trong cùng một hệ thống tích hợp.
                </p>
                <p>
                    Khi trở thành đối tác của Tikataz, bạn không chỉ có cơ hội đưa sản phẩm và dịch vụ tiếp cận hàng triệu doanh nghiệp trong và ngoài nước,
                    mà còn sở hữu một kênh marketing hiệu quả giúp mở rộng thị trường và thúc đẩy tăng trưởng doanh thu một cách bền vững.
                </p>
                <p className="font-medium">
                    Tóm lại, tham gia Tikataz, bạn sẽ nhận được nhiều lợi ích vượt trội:
                </p>
                <ul className="space-y-2 pl-5 list-disc">
                    <li>Không cần am hiểu kỹ thuật mua sắm hay tìm kiếm nhà cung cấp – nền tảng đã tối ưu hóa toàn bộ quy trình.</li>
                    <li>Không lo lắng về chất lượng – mọi nhà cung cấp đều được đánh giá minh bạch qua hệ thống tín nhiệm.</li>
                    <li>Không thông qua trung gian – bạn làm chủ toàn bộ giao dịch từ kết nối đến thương lượng.</li>
                    <li>Không phí hoa hồng, không chiết khấu – cam kết minh bạch, không phát sinh chi phí ẩn.</li>
                    <li>Tối ưu chi phí, tiết kiệm thời gian và quy chế cân bằng chất lượng trong khâu tìm kiếm nguồn cung.</li>
                </ul>
            </section>


            {/* Nguyên lý hoạt động */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-500">Nguyên lý hoạt động</h2>
                <p>Tikataz vận hành dựa trên 2 đối tượng với 3 tiền đề chính:</p>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                        <h3 className="font-bold text-lg mb-2">🔍 Phân tích yêu cầu thông minh</h3>
                        <p>
                            Hệ thống dựa trên nền tảng trí tuệ nhân tạo (AI) để phân tích và hiểu rõ yêu cầu của doanh nghiệp, từ đó đưa ra các phân tích và gọi ý chính xác nhất về nhà cung cấp phù hợp.
                        </p>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                        <h3 className="font-bold text-lg mb-2">🤝 Kết nối trực tiếp</h3>
                        <p>Hệ thống tự động so khớp với các nhà cung cấp phù hợp nhất dựa trên năng lực, độ tin cậy và khả năng đáp ứng - hoàn toàn không có chi phí môi giới hoặc hoa hồng ẩn.</p>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                        <h3 className="font-bold text-lg mb-2">📊 Minh bạch & kiểm soát</h3>
                        <p>Mọi giai đoạn từ báo giá, theo dõi tiến độ đến nghiệm thu đều được số hóa và lưu vết rõ ràng, giúp doanh nghiệp kiểm soát chất lượng và tiến độ dễ dàng.</p>
                    </div>
                </div>
            </section>

            {/* Tầm nhìn */}
            <section className="space-y-4" ref={missionRef}>
                <h2 className="text-2xl font-semibold text-blue-500">Tầm nhìn</h2>
                <p>
                    Tikataz hướng đến việc trở thành một trong những nền tảng đi đầu kết nối sản xuất và thương mại thông minh - không chỉ trong phạm vi quốc gia mà còn vươn tầm khu vực và quốc tế.
                    Là cầu nối giúp mang nhu cầu của doanh nghiệp đến với các nhà cung cấp và mang sản phẩm của đối tác là nhà cung cấp đến với doanh nghiệp, trong mọi lĩnh vực và ngành nghề, từ nông
                    sản đến công nghiệp, từ dịch vụ đến sản xuất.
                </p>
                <p>
                    Chúng tôi mong muốn tạo ra một hệ sinh thái nơi mà:
                </p>
                <ul className="space-y-2 pl-5 list-disc">
                    <li>Người Việt hỗ trợ người Việt cùng phát triển.</li>
                    <li>Doanh nghiệp Việt có thể vươn ra thế giới bằng năng lực thật sự.</li>
                    <li>Việc sản xuất, gia công, hợp tác trở nên dễ tiếp cận, rõ ràng và công bằng hơn.</li>
                </ul>
            </section>

            {/* Sứ mệnh */}
            <section className="space-y-4" ref={valuesRef}>
                <h2 className="text-2xl font-semibold text-blue-500">Sứ mệnh</h2>
                <ul className="space-y-3 pl-5 list-disc">
                    <li>Đơn giản hóa quá trình hợp tác giữa doanh nghiệp và nhà cung cấp.</li>
                    <li>Giảm thiểu lãng phí về thời gian, nguồn lực và rủi ro trong quá trình lựa chọn đối tác.</li>
                    <li>Tạo ra nền tảng vận hành minh bạch, công bằng và hiệu quả – không phụ thuộc vào mối quan hệ hay trung gian.</li>
                </ul>
                <p className="italic mt-4">
                    Tikataz không đơn thuần là một công cụ, mà là một bước chuyển mình – từ truyền thống sang hiện đại, từ cảm tính sang dữ liệu, từ manh mún sang hệ thống.
                </p>
                <p className="text-center text-xl font-medium mt-8 text-blue-600">
                    Tikataz – Viết yêu cầu theo cách bạn hiểu. Phần còn lại để hệ thống lo.
                </p>
            </section>
        </div>
    );
}

export default Introductions;
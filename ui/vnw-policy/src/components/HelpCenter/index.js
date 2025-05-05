import { useState } from 'react';
import { FiSearch, FiMessageSquare, FiPhone, FiMail, FiChevronDown, FiChevronLeft } from 'react-icons/fi';

const HelpCenter = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTopic, setActiveTopic] = useState(null);

    // Danh mục trợ giúp
    const helpCategories = [
        {
            id: 'getting-started',
            title: 'Bắt đầu sử dụng',
            topics: [
                { id: 'register-account', title: 'Đăng ký tài khoản' },
                { id: 'verify-account', title: 'Xác minh tài khoản' },
                { id: 'first-steps', title: 'Những bước đầu tiên' }
            ]
        },
        {
            id: 'account-management',
            title: 'Quản lý tài khoản',
            topics: [
                { id: 'profile-settings', title: 'Cài đặt hồ sơ' },
                { id: 'security', title: 'Bảo mật tài khoản' },
                { id: 'payment-methods', title: 'Phương thức thanh toán' }
            ]
        },
        {
            id: 'troubleshooting',
            title: 'Khắc phục sự cố',
            topics: [
                { id: 'login-issues', title: 'Sự cố đăng nhập' },
                { id: 'payment-issues', title: 'Sự cố thanh toán' },
                { id: 'technical-issues', title: 'Sự cố kỹ thuật' }
            ]
        }
    ];

    // Câu hỏi thường gặp
    const faqs = [
        {
            id: 'reset-password',
            question: 'Làm cách nào để đặt lại mật khẩu?',
            answer: 'Đầu tiên hãy logout tài khoản hiện tại, sau đó truy cập trang login và nhấn vào nút "Quên mật khẩu", nhập email đăng ký và làm theo hướng dẫn trong email bạn nhận được.'
        },
        {
            id: 'change-email',
            question: 'Tôi có thể thay đổi email đăng nhập không?',
            answer: 'Bạn không thể tự thay đổi email đăng nhập sau khi đã đăng ký tài khoản một cách tự động. Vui lòng liên hệ bộ phận hỗ trợ để được giúp đỡ.'
        },
        {
            id: 'two-factor-auth',
            question: 'Xác thực hai yếu tố là gì?',
            answer: 'Xác thực hai yếu tố (Two-Factor Authentication - 2FA) là một lớp bảo mật bổ sung yêu cầu người dùng cung cấp hai loại thông tin khác nhau để xác minh danh tính của họ khi đăng nhập vào hệ thống.'
        },
        {
            id: 'hacker-auth',
            question: 'Tài khoản của bạn mất quyền truy cập?',
            answer: 'Bạn có thể khôi phục quyền truy cập tài khoản của mình bằng cách sử dụng tính năng "Quên mật khẩu" trên trang đăng nhập. Nếu bạn không thể khôi phục tài khoản, vui lòng liên hệ với bộ phận hỗ trợ để được giúp đỡ.'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-blue-600 mb-2">Trung Tâm Trợ Giúp</h1>
                <p className="text-gray-600">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
            </div>

            {/* Thanh tìm kiếm */}
            <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Tìm kiếm câu trả lời..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Danh mục trợ giúp */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                {helpCategories.map((category) => (
                    <div key={category.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold mb-3">{category.title}</h3>
                        <ul className="space-y-2">
                            {category.topics.map((topic) => (
                                <li key={topic.id}>
                                    <a href="#" className="text-blue-600 hover:underline flex items-center">
                                        {topic.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Câu hỏi thường gặp */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
                <h2 className="text-xl font-bold mb-4">Câu hỏi thường gặp</h2>
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="border-b border-gray-100 pb-4">
                            <button
                                className="w-full flex justify-between items-center text-left"
                                onClick={() => setActiveCategory(activeCategory === faq.id ? null : faq.id)}
                            >
                                <span className="font-medium">{faq.question}</span>
                                <FiChevronDown
                                    className={`transition-transform ${activeCategory === faq.id ? 'transform rotate-180' : ''}`}
                                />
                            </button>
                            {activeCategory === faq.id && (
                                <div className="mt-2 text-gray-600">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Liên hệ hỗ trợ */}
            <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Bạn cần thêm trợ giúp?</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <FiMessageSquare className="text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-medium">Chat trực tuyến</h4>
                            <p className="text-sm text-gray-500">Hỗ trợ 24/7</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <FiPhone className="text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-medium">Gọi điện thoại</h4>
                            <p className="text-sm text-gray-500">0333462905 (kỹ thuật viên)</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <FiMail className="text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-medium">Email hỗ trợ</h4>
                            <p className="text-sm text-gray-500">support@tikataz.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <HelpContentSections selectedTopic={activeTopic} onBack={() => setActiveTopic(null)} />
        </div>
    );
};

export default HelpCenter;


const HelpContentSections = () => {
    // Các nội dung chi tiết tương ứng với từng chủ đề
    const contentData = {
        // Bắt đầu sử dụng
        'register-account': {
            title: 'Hướng dẫn đăng ký tài khoản',
            content: (
                <div className="space-y-4">
                    <p>Để đăng ký tài khoản Tikataz, vui lòng thực hiện theo các bước sau:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Truy cập trang đăng ký tại www.tikataz.com/register</li>
                        <li>Nhập đầy đủ thông tin bao gồm: Họ tên, Email, Số điện thoại</li>
                        <li>Tạo mật khẩu có độ bảo mật cao (ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số)</li>
                        <li>Xác nhận email bằng cách nhấp vào đường link trong thư xác minh</li>
                        <li>Hoàn tất hồ sơ doanh nghiệp/nhà cung cấp</li>
                    </ol>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="font-medium">Lưu ý quan trọng:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Email đăng ký phải là email doanh nghiệp hoặc email chính chủ</li>
                            <li>Vui lòng kiểm tra thư mục spam nếu không nhận được email xác minh</li>
                        </ul>
                    </div>
                </div>
            )
        },
        'verify-account': {
            title: 'Xác minh tài khoản',
            content: (
                <div className="space-y-4">
                    <p>Quy trình xác minh tài khoản Tikataz bao gồm:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-bold mb-2">Đối với doanh nghiệp</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Giấy phép kinh doanh/ĐKKD</li>
                                <li>Giấy tờ chứng thực người đại diện</li>
                                <li>Xác minh số điện thoại doanh nghiệp</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-bold mb-2">Đối với nhà cung cấp</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>CMND/CCCD/Hộ chiếu</li>
                                <li>Giấy tờ chứng minh năng lực sản xuất</li>
                                <li>Xác minh địa chỉ cơ sở vật chất</li>
                            </ul>
                        </div>
                    </div>
                    <p>Thời gian xử lý: 1-3 ngày làm việc sau khi nộp đủ hồ sơ.</p>
                </div>
            )
        },
        // Quản lý tài khoản
        'profile-settings': {
            title: 'Cài đặt hồ sơ',
            content: (
                <div className="space-y-4">
                    <p>Các thiết lập hồ sơ quan trọng bạn nên cập nhật:</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left">Mục</th>
                                    <th className="px-4 py-2 text-left">Mô tả</th>
                                    <th className="px-4 py-2 text-left">Ảnh hưởng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-gray-200">
                                    <td className="px-4 py-2 font-medium">Thông tin liên hệ</td>
                                    <td className="px-4 py-2">Email, số điện thoại, địa chỉ</td>
                                    <td className="px-4 py-2">Nhận thông báo, liên hệ khẩn cấp</td>
                                </tr>
                                <tr className="border-t border-gray-200">
                                    <td className="px-4 py-2 font-medium">Thông tin doanh nghiệp</td>
                                    <td className="px-4 py-2">Lĩnh vực hoạt động, quy mô</td>
                                    <td className="px-4 py-2">Được đề xuất phù hợp với nhu cầu</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        },
        // Thêm các nội dung khác tương tự...
    };

    // State để theo dõi chủ đề đang được chọn
    const [selectedTopic, setSelectedTopic] = useState('register-account');

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Hiển thị nội dung chi tiết khi có chủ đề được chọn */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">{contentData['register-account']?.title}</h2>
                <div className="prose max-w-none">
                    {contentData['register-account']?.content || 'Nội dung đang được cập nhật...'}
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">{contentData['verify-account']?.title}</h2>
                <div className="prose max-w-none">
                    {contentData['verify-account']?.content || 'Nội dung đang được cập nhật...'}
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">{contentData['profile-settings']?.title}</h2>
                <div className="prose max-w-none">
                    {contentData['profile-settings']?.content || 'Nội dung đang được cập nhật...'}
                </div>
            </div>
        </div>
    );
};
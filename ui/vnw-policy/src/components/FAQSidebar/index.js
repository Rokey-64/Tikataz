import { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const FAQContent = () => {
    const [expandedCategory, setExpandedCategory] = useState('general');
    const [activeQuestion, setActiveQuestion] = useState(null);

    const faqData = [
        {
            id: 'general',
            title: 'Câu hỏi chung',
            questions: [
                {
                    id: 'what-is-tikataz',
                    question: 'Tikataz là gì?',
                    answer: 'Tikataz là nền tảng kết nối thông minh giữa doanh nghiệp và nhà cung cấp, ứng dụng công nghệ để tối ưu hóa quy trình tìm kiếm và hợp tác.'
                },
                {
                    id: 'how-to-join',
                    question: 'Làm thế nào để tham gia Tikataz?',
                    answer: 'Bạn có thể đăng ký tài khoản miễn phí trên website hoặc ứng dụng Tikataz, sau đó xác minh thông tin doanh nghiệp/nhà cung cấp.'
                },
                {
                    id: 'service-fee',
                    question: 'Tikataz có thu phí không?',
                    answer: 'Hiện tại Tikataz miễn phí đăng ký và sử dụng các tính năng cơ bản. Một số dịch vụ cao cấp có thể áp dụng phí theo thông báo.'
                }
            ]
        },
        {
            id: 'for-business',
            title: 'Dành cho doanh nghiệp',
            questions: [
                {
                    id: 'find-supplier',
                    question: 'Cách tìm nhà cung cấp trên Tikataz?',
                    answer: 'Bạn chỉ cần nhập yêu cầu bằng ngôn ngữ tự nhiên, hệ thống sẽ tự động phân tích và đề xuất các nhà cung cấp phù hợp nhất.'
                },
                {
                    id: 'quality-control',
                    question: 'Tikataz kiểm soát chất lượng thế nào?',
                    answer: 'Chúng tôi áp dụng hệ thống đánh giá đa chiều, xác minh thông tin nhà cung cấp và lưu trữ lịch sử giao dịch để đảm bảo minh bạch.'
                },
                {
                    id: 'payment-methods',
                    question: 'Các phương thức thanh toán được hỗ trợ?',
                    answer: 'Tikataz hỗ trợ đa dạng phương thức: chuyển khoản ngân hàng, ví điện tử, thanh toán online và các hình thức khác theo thỏa thuận.'
                }
            ]
        },
        {
            id: 'for-supplier',
            title: 'Dành cho nhà cung cấp',
            questions: [
                {
                    id: 'register-as-supplier',
                    question: 'Đăng ký làm nhà cung cấp thế nào?',
                    answer: 'Truy cập mục Đăng ký nhà cung cấp, điền đầy đủ thông tin và tải lên các giấy tờ liên quan để được xác minh.'
                },
                {
                    id: 'increase-visibility',
                    question: 'Làm sao để tăng độ hiển thị?',
                    answer: 'Cập nhật đầy đủ thông tin, tham gia các chương trình ưu đãi, nhận đánh giá tích cực từ khách hàng sẽ giúp hồ sơ của bạn được đề xuất nhiều hơn.'
                },
                {
                    id: 'rating-system',
                    question: 'Hệ thống đánh giá hoạt động thế nào?',
                    answer: 'Hệ thống dựa trên 5 tiêu chí: chất lượng sản phẩm, giao hàng đúng hạn, thái độ phục vụ, giá cả và sự hài lòng chung.'
                }
            ]
        }
    ];

    return (
        <div className="flex h-[calc(100vh-150px)]"> {/* Trừ chiều cao header */}
            {/* Sidebar FAQ - Cố định chiều cao */}
            <div className="w-72 bg-gray-50 p-4 border-r overflow-y-auto sticky top-16 h-[calc(100vh-100px)]">
                <h2 className="text-xl font-bold text-blue-600 mb-4">Câu hỏi thường gặp</h2>
                <div className="space-y-2">
                    {faqData.map((category) => (
                        <div key={category.id}>
                            <button
                                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                                className="w-full flex justify-between items-center p-2 hover:bg-blue-50 rounded-lg"
                            >
                                <span className="font-medium">{category.title}</span>
                                {expandedCategory === category.id ? <FiChevronDown /> : <FiChevronRight />}
                            </button>

                            {expandedCategory === category.id && (
                                <div className="mt-1 ml-2 space-y-1">
                                    {category.questions.map((q) => (
                                        <button
                                            key={q.id}
                                            onClick={() => setActiveQuestion(q)}
                                            className={`w-full text-left p-2 text-sm rounded-md ${activeQuestion?.id === q.id
                                                    ? 'bg-blue-100 text-blue-600 font-medium'
                                                    : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            {q.question}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Nội dung chi tiết - Scroll độc lập */}
            <div className="flex-1 overflow-y-auto h-[calc(100vh-200px)] p-6">
                {activeQuestion ? (
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            {activeQuestion.question}
                        </h1>
                        <div className="prose max-w-none">
                            <p>{activeQuestion.answer}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-500">
                            <p className="text-lg">Vui lòng chọn một câu hỏi từ danh sách bên trái</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default FAQContent;
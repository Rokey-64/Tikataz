import React, { useContext, lazy, Suspense } from 'react'
import SideBar from './Sidebar.js';
import { ContentContext } from './Context.js';
import parse from 'html-react-parser';


const BodyLayout = (props) => {
    const { content } = useContext(ContentContext);
    return (

        <div className='flex my-4'>
            <div className='flex-none w-72 max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10'>
                <SideBar idcatlg={props.idCatlg} />
            </div>
            <div className='w-[50rem] bg'>
                <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
                    {
                        Array.isArray(content.body) && content.body.length ?
                        <>
                            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{content?.title}</h1>
                            {parse(content.body[0].content)}
                        </>
                        :
                        <>
                            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Giới thiệu Tikataz</h1>
                            <p className="text-gray-700 text-lg mb-4">
                                Tikataz là một sàn thương mại điện tử tiên phong trong việc cung cấp các dịch vụ nhận đơn đặt hàng và gia công một cách tự động hóa và tiện lợi. Với sự phát triển không ngừng của công nghệ, Tikataz mang đến cho người dùng một giải pháp tối ưu để quản lý và vận hành kinh doanh trực tuyến hiệu quả hơn.
                            </p>
                            <p className="text-gray-700 text-lg mb-4">
                                Điểm nổi bật của Tikataz nằm ở khả năng tự động hóa toàn bộ quy trình từ khâu nhận đơn hàng, xử lý thanh toán, đến việc gia công sản phẩm và giao hàng. Điều này giúp giảm thiểu sai sót, tiết kiệm thời gian và chi phí, đồng thời tăng cường sự hài lòng của khách hàng. Người bán chỉ cần đăng ký và thiết lập cửa hàng của mình trên Tikataz, sau đó hệ thống sẽ tự động thực hiện các công việc còn lại.
                            </p>
                            <p className="text-gray-700 text-lg mb-4">
                                Ngoài ra, Tikataz còn cung cấp một loạt các công cụ phân tích và báo cáo chi tiết, giúp người bán theo dõi hiệu quả kinh doanh, từ đó đưa ra những chiến lược kinh doanh phù hợp. Giao diện thân thiện và dễ sử dụng của Tikataz cũng là một điểm cộng lớn, giúp người dùng dễ dàng quản lý và điều hành cửa hàng trực tuyến mà không cần phải có kiến thức sâu về công nghệ.
                            </p>
                            <p className="text-gray-700 text-lg">
                                Với những ưu điểm nổi bật, Tikataz đang ngày càng khẳng định vị thế của mình trên thị trường thương mại điện tử, trở thành lựa chọn hàng đầu cho các doanh nghiệp muốn nâng cao hiệu quả kinh doanh và mở rộng quy mô hoạt động.
                            </p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default BodyLayout;


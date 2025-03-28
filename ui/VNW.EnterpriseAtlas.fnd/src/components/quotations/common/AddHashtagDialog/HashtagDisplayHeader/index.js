import React from "react";

const HashtagDisplayHeader = () => {
    return (
        <div className="mb-2">
            <h2 className="text-base font-semibold text-gray-900">Thêm Hashtag</h2>
            <div>
                <p className="text-[12px] text-gray-500 italic">
                    Giúp nhà cung cấp tìm thấy bạn dễ dàng hơn bằng cách thêm Hashtag.
                </p>
                <p className="text-[12px] text-gray-500 italic pl-4">
                    ✒ Hastag bắt đầu bằng dấu #, viết liền, không dấu<br/>
                    ✒ Số lượng hashtag tối đa không quá 5 hashtag, và số lượng ký tự tối đa là 200 ký tự.
                    <br/>
                    <span>
                        Ví dụ: <b className="text-blue-500 hover:text-blue-700 hover:underline mr-2">#hashtag1</b>
                         <b className="text-blue-500 hover:text-blue-700 hover:underline mr-2">#hashtag2</b>
                    </span>
                </p>

            </div>
        </div>
    );
};

export default HashtagDisplayHeader;


const CustomerIntro = ({quoteData}) => {
    return (
        <div className="mb-8 border-b pb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{quoteData.quoteTitle}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-600"><span className="font-semibold">Khách hàng:</span> {quoteData.customerName}</p>
                    <p className="text-gray-600"><span className="font-semibold">Mã số thuế:</span> {quoteData.taxCode}</p>
                </div>
                <div>
                    <p className="text-gray-600"><span className="font-semibold">Ngày tạo:</span> {quoteData.createdAt}</p>
                    <p className="text-gray-600"><span className="font-semibold">Hạn báo giá:</span> {quoteData.expiryDate}</p>
                </div>
            </div>

            {quoteData.notes && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <h3 className="font-semibold text-yellow-800 mb-1">Ghi chú từ khách hàng:</h3>
                    <p className="text-yellow-700">{quoteData.notes}</p>
                </div>
            )}
        </div>
    );
}

export default CustomerIntro;
import Link from 'next/link';

/**
 * Create a compact shortcut to display customer information
 */
const CustomerShortcut = ({ img, name }) => {
    return (
        <div className="w-36 h-44 p-3 bg-white shadow-md rounded-xl border border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between items-center">
            {/* Ảnh đại diện khách hàng (cố định kích thước nhỏ hơn) */}
            <img 
                src={img} 
                alt={name} 
                className="w-20 h-20 rounded-full border-2 border-blue-300 shadow-sm object-cover" 
                onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }} 
            />

            {/* Tên khách hàng (giữ kích thước nhỏ gọn) */}
            <Link 
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm text-center h-8 flex items-center justify-center" 
                href=""
            >
                {name}
            </Link>
        </div>
    );
};

export default CustomerShortcut;

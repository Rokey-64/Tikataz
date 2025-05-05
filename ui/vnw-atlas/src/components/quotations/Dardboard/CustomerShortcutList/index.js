import CustomerShortcut from "../../common/CustomerShortcut";
import HeaderDisplay from "../../common/HeaderDisplay";
import Link from 'next/link';
/**
 * Create a list of shortcuts to display customer information
 * @returns 
 */
const CustomerShortcutList = () => {
    const temporaryCustomerList = [
        { name: "Chuyên bảng hiệu An phát, Minh Thành", img: "/placeholder.png" },
        { name: "Customer 2", img: "/placeholder.png" },
        { name: "Customer 3", img: "/placeholder.png" },
        { name: "Customer 4", img: "/placeholder.png" },
    ];

    return (
        <div>
            <HeaderDisplay title="Customers" />
            <div className="flex flex-wra gap-3">
                {
                    temporaryCustomerList.map((customer, index) => {
                        return (
                            <CustomerShortcut key={index} name={customer.name} img={customer.img} />
                        );
                    })
                }
                <div className="mt-32">
                    <Link href="/quotations" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">(View all ...)</Link>
                </div>
            </div>

        </div>
    );
}

export default CustomerShortcutList;
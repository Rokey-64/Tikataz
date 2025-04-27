import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaHome } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const routeNameMap = {
    edit: "Edit",
    card: "Card",
    rfq: "RFQ",
    me: "Me",
    dashboard: "Dashboard",
    pricing: "Pricing",
    history: "History",
    views: "Quotations",
  };

  const notIncludes = ["RFQ", "Me"];

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 px-2 font-sans text-[12px]">
        <li>
          <div>
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 transition-colors"
              aria-label="Home"
            >
              <FaHome className="h-5 w-5 flex-shrink-0" />
            </Link>
          </div>
        </li>

        {paths.map((path, index) => {
          const to = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;
          const name = routeNameMap[path] || path;

          if (notIncludes.includes(name)) return null; // Skip RFQ in breadcrumb

          return (
            <li key={to}>
              <div className="flex items-center">
                <FaChevronRight
                  className="h-4 w-4 flex-shrink-0 text-gray-400 mx-1"
                  aria-hidden="true"
                />
                {isLast ? (
                  <span
                    className="text-sm font-medium text-gray-700"
                    aria-current="page"
                  >
                    {name}
                  </span>
                ) : (
                  <Link
                    href={to}
                    className="text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    {name}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
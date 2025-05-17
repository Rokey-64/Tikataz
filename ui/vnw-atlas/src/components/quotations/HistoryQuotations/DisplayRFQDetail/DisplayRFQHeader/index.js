import { useTranslations } from "next-intl";

/**
 * * Display the RFQ header information
 * @param {*} param0 
 * @returns 
 */
const DisplayRFQHeader = ({ data }) => {
  console.log("DisplayRFQHeader", data);
  const t = useTranslations('trans');

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm border border-blue-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1 - Main Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{data.orderName || 'Unnamed RFQ'}</h2>
              <p className="text-sm text-blue-600 font-medium">RFQ #{data.id}</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-blue-200">
            <p className="text-xs font-semibold text-blue-500 mb-1 uppercase">{t("remark")}</p>
            <p className="text-sm text-gray-700 italic">{data.remark || 'No remarks provided'}</p>
          </div>
        </div>

        {/* Section 2 - Dates */}
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-md border border-blue-200">
            <p className="text-xs font-semibold text-blue-500 mb-2 uppercase">{t("timeframe")}</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                <div>
                  <p className="text-xs text-gray-500">{t("start_date")}</p>
                  <p className="text-sm font-medium text-gray-700">{`${data.startDate.slice(6, 8)}/${data.startDate.slice(4, 6)}/${data.startDate.slice(0, 4)}` || 'Not specified'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                <div>
                  <p className="text-xs text-gray-500">{t("end_date")}</p>
                  <p className="text-sm font-medium text-gray-700">{`${data.endDate.slice(6, 8)}/${data.endDate.slice(4, 6)}/${data.endDate.slice(0, 4)}` || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 - Address & Created */}
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-md border border-blue-200">
            <p className="text-xs font-semibold text-blue-500 mb-2 uppercase">{t("delivery_info")}</p>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm text-gray-700">{data.address || 'Address not provided'}</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-blue-200">
            <p className="text-xs font-semibold text-blue-500 mb-1 uppercase">{t("created_date")}</p>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-700">{new Date(data.createDate).toLocaleString() || 'Date not available'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayRFQHeader;
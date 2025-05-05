

const RecruitmentViewport = ({ card, visible }) => {

    return (
        <div className={`${visible ? "block" : "hidden"}`}>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                        className="w-6 h-6 text-blue-500 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        >
                        </path>
                    </svg>
                </div>

                <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Module đang được hoàn thiện
                </h3>
                <p className="text-gray-600 text-sm">
                    Tính năng này sẽ sớm có mặt trong phiên bản tiếp theo
                </p>
            </div>
        </div>
    );
}

export default RecruitmentViewport;
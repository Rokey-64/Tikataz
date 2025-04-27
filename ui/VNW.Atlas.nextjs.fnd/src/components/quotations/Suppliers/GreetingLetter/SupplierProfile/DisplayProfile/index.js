

const DisplayProfile = ({ profile, isEditing }) => {
    if (isEditing) {
        return null;
    }

    return (
        <>
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">{profile.avatarInitials}</span>
                </div>
                <div>
                    <p className="font-medium">{profile.companyName}</p>
                    <p className="text-sm text-gray-500">MST: {profile.taxCode}</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>{profile.email}</span>
                </div>

                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{profile.address}</span>
                </div>

                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span>{profile.phone}</span>
                </div>
            </div>
        </>
    );
}

export default DisplayProfile;
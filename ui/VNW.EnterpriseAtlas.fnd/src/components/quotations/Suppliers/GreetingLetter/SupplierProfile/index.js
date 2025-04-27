

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DisplayProfile from './DisplayProfile';
import EditProfile from './EditProfile';

const SupplierProfile = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        companyName: 'Công ty TNHH Đối Tác Ví Dụ',
        taxCode: '0123456789',
        email: 'partner@example.com',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        phone: '0912 345 678',
        avatarInitials: 'NV'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const EditButtonComponent = () => {
        return (
            <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {t("edit")}
            </button>
        );
    }

    const SaveButtonComponent = () => {
        return (
            <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
            >
                {t("save")}
            </button>
        );
    }

    const CancelButtonComponent = () => {
        return (
            <button
                onClick={handleCancel}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300 transition"
            >
                {t("cancel")}
            </button>
        );
    }

    return (
        <div className="md:w-2/5">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg text-gray-800">{t("your_info")}</h3>
                    {!isEditing ? (
                        <EditButtonComponent />
                    ) : (
                        <div className="flex space-x-2">
                            <SaveButtonComponent />
                            <CancelButtonComponent />
                        </div>
                    )}
                </div>
                <DisplayProfile profile={profile} isEditing={isEditing} />
                <EditProfile profile={profile} isEditing={isEditing} handleInputChange={handleInputChange} />
            </div>
        </div>
    );
}

export default SupplierProfile;
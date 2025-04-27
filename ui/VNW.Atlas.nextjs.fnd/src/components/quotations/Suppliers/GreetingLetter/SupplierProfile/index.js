

import { useState, useEffect, use } from 'react';
import { useTranslation } from 'react-i18next';
import DisplayProfile from './DisplayProfile';
import EditProfile from './EditProfile';
import updateSupplierProfileAPI from '@/api/updateSupplierProfile';
import getRFQSupplierProfileAPI from '@/api/getRFQSupplierProfile';
import { useSearchParams, useRouter } from 'next/navigation';

const SupplierProfile = () => {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        companyName: '',
        taxCode: '',
        email: '',
        address: '',
        phone: '',
        avatarInitials: ''
    });

    const [prevProfile, setPrevProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            const token = searchParams.get("token");
            if (!token) {
                return;
            }


            const res = await getRFQSupplierProfileAPI(token);
            if (res) {
                const supplierProfile = {
                    companyName: res.supplierName,
                    taxCode: res.supplierTaxcode,
                    email: res.supplierEmail,
                    address: res.supplierAddress,
                    phone: res.supplierPhone,
                    avatarInitials: 'NV'
                }
                setProfile(supplierProfile);
                setPrevProfile({ ...supplierProfile });
                return;
            }

            // redirect to 404 page if no data found
            // router.push("/404");
        };
        fetchProfile();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        // Check data validity
        if (!profile.companyName || !profile.taxCode || !profile.email || !profile.address || !profile.phone) {
            alert(t("node_save_nothing"));
            return;
        }


        if (!profile.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            alert(t("email_not_Valid"));
            return;
        }

        if (!profile.phone.match(/^\d+$/)) {
            alert(t("phone_not_Valid"));
            return;
        }

        if (profile.companyName === prevProfile.companyName
            && profile.taxCode === prevProfile.taxCode
            && profile.email === prevProfile.email
            && profile.address === prevProfile.address
            && profile.phone === prevProfile.phone) {
            alert(t("node_save_nothing"));
            return;
        }

        const res = await updateSupplierProfileAPI(searchParams.get("token"),
            {
                companyName: profile.companyName,
                taxCode: profile.taxCode,
                email: profile.email,
                address: profile.address,
                phone: profile.phone
            }
        );
        if (res) {
            // alert(t("note_save_success"));
            setIsEditing(false);
            return;
        }
        alert(t("note_save_failed"));
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
import ProviderDisplayHeader from './ProviderDisplayHeader';
import ProviderInput from './ProviderInput';
import ProviderSubmitButton from '../SubmitButton';
import ProviderCloseButton from '../CloseButton';
import { useState } from 'react';

/**
 * Add a provider dialog
 * @param {*} param0 
 * @returns 
 */
const AddProviderDialog = ({ open, onClose, onAdd }) => {
    const [provider, setProvider] = useState('');

    if (!open) return null;

    const submitOnclick = () => {
        onAdd(provider);
        setProvider('');
        onClose();
    }

    return (
        <div className="fixed inset-1 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-5 w-96 shadow-lg">
                <ProviderDisplayHeader />
                <ProviderInput provider={provider} event={(e) => setProvider(e.target.value)} />
                <div className="flex justify-end">
                    <ProviderCloseButton event={onClose} />
                    <ProviderSubmitButton event={submitOnclick} />
                </div>
            </div>
        </div>
    );
};

export default AddProviderDialog;
import { useState, useEffect, useCallback, useContext} from 'react';
import ItemDialogHeader from './ItemDialogHeader';
import ItemDialogInput from './ItemDialogInput';
import ProviderSubmitButton from '../SubmitButton';
import ProviderCloseButton from '../CloseButton';
import { createPortal } from 'react-dom';
import { debounce } from 'lodash';
import getItemHistoryListAPI from '../../../../api/getItemHistoryList';
import DisplayItemList from './DisplayItemList';

/**
 * Add a provider dialog
 * @param {*} param0 
 * @returns 
 */
const ItemHistoryDialog = ({ open, onClose, onAdd }) => {
    const [provider, setProvider] = useState('');
    const [items, setItems] = useState([]);

    // Call API to get item history list
    const loadItemCallback = useCallback(debounce(async (search) => {
        const response = await getItemHistoryListAPI(search);
        if (response) {
            const list = response.map((item) => {
                return {
                    check: false,
                    item_name: item.item_name,
                    spec: item.spec,
                    unit: item.unit,
                }
            })
            setItems(list);
        }
    }
        , 500), []);

    // Load item history for the first time
    useEffect(() => {
        if (open) {
            loadItemCallback(provider);
        }
    }, [open, provider]);

    if (!open) return null;


    // item input change
    const handleInputChange = (e) => {
        setProvider(e.target.value);
        // loadItemCallback(e.target.value);
    };

    // Item select
    const submitOnclick = () => {
        const filterItems = items.filter((item) => item.check === true);
        onAdd(filterItems);
        setProvider('');
        onClose();
    }

    /**
     * Raise when item is selected
     * @param {*} index 
     */
    const onItemSelect = (index) => {
        const updatedItems = [...items];
        updatedItems[index].check = !updatedItems[index].check;
        setItems(updatedItems);
    }

    return createPortal(
        (
            <div className="fixed inset-1 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-5 w-96 shadow-lg">
                    <ItemDialogHeader />
                    <ItemDialogInput provider={provider} event={handleInputChange} />
                    <DisplayItemList items={items} onSelect={onItemSelect}/>
                    <div className="flex justify-end">
                        <ProviderCloseButton event={onClose} />
                        <ProviderSubmitButton event={submitOnclick} />
                    </div>
                </div>
            </div>
        ),
        document.body
    )
};

export default ItemHistoryDialog;
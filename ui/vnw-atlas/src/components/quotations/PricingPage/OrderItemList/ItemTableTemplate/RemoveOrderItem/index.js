import React, { useState, useEffect} from 'react';
import CloseButton from '../../../../common/CloseButton';
import SubmitButton from '../../../../common/SubmitButton';
import DisplayItemHeader from './DisplayItemHeader';
import { useAppContext } from "../../../../../../contexts/RFQItemOrder";
import _ from 'lodash';
import { nanoid } from 'nanoid';

/**
 * Displays a dialog for adding a hashtag.
 * @param {*} param0 
 * @returns 
 */
const RemoveOrderItem = ({openId, onClose}) => {
    const { state, dispatch, orderItem} = useAppContext();
    const [itemName, setItemName] = useState('');

    useEffect(() => {
        if(!openId) return;
        const item = state.pricing.find((item) => item.id === openId);
        if(item) {
            setItemName(item.itemName);
        }
    }, [openId]);

    if(!openId) return null;

    const onConfirm = () => {
        const clonePricing = state.pricing.filter((item) => item.id !== openId);
        dispatch({ type: 'SET_ORDER_ITEM', payload: _.cloneDeep(clonePricing) });

        //if only one item left, add a new item
        if(clonePricing.length === 0) {
            dispatch({ type: 'SET_ORDER_ITEM', payload: [{ ...orderItem, id: nanoid() }] });
        }

        onClose();
    };


    return (
        <div className="fixed inset-1 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-5 w-96 shadow-lg">
                <DisplayItemHeader itemName={itemName}/>
                <div className="flex justify-end">
                    <CloseButton event={onClose} />
                    <SubmitButton event={onConfirm} />
                </div>
            </div>
        </div>
    );
};

export default RemoveOrderItem;

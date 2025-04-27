import { BsPersonFillAdd } from "react-icons/bs";

/**
 * A component that represents the AddProvider component.
 * @returns 
 */
const AddProviderButton = ({ description, event }) => {
    return (
        <div className="flex flex-col items-start gap-y-2">
            <div className="flex items-center gap-x-2">

                <button className="text-blue-500 hover:text-blue-700 text-xs underline flex gap-2" onClick={event}>
                    <BsPersonFillAdd size={14} />
                    <span className="text-xs text-gray-500">{description}</span>
                </button>
            </div>
        </div>
    )
};

export default AddProviderButton;


/**
 * A button component that represents the state of a quotation.
 * @returns 
 */
const QuotationStateButton = ({ state, onClick, isClicked }) => {
    return (
        <div className="flex flex-col items-end justify-start w-fit h-12 px-1 font-sans text-sm text-gray-500">
            <button
                onClick={onClick}
                className={` px-2 pb-2
                    ${isClicked ? 'font-bold border-b-4 border-blue-500 text-blue-600' : ''}
                    hover:text-blue-500 transition duration-200 ease-in-out
                `}
            >
                {state}
            </button>
        </div>
    );
}

export default QuotationStateButton;

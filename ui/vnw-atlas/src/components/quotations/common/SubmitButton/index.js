/**
 * Displays a dialog for adding a hashtag.
 * @param {*} param0 
 * @returns 
 */
const SubmitButton = ({ event, title}) => {
    return (
        <button onClick={event} className="bg-blue-500 text-white rounded px-4 py-1 hover:bg-blue-600 text-[13px] font-sans">
            {title || 'Submit'}
        </button>
    );
};

export default SubmitButton;

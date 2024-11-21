
/**
 * Component for reaction button that is used in rating customer reviews. 👍👎💕 100k.
 * @param {*} icon - react icon to be displayed in the button 
 * @param {string} background - background color of the button
 * @returns 
 */
const Reaction = ({icon, background}) => {
    return (
        <div>
            <button className={`w-4 sm:w-7 h-4 sm:h-7 shadow-md text-white rounded-full flex items-center justify-center ${background || 'bg-white'} transform transition-transform duration-300 ease-in-out hover:scale-110`}>
                {icon}
            </button>
        </div>
    );
}

export default Reaction;
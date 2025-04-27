
/**
 * This component is used to display a few of items
 * @returns 
 */
const Item = ({ item }) => {

    return (
        <div className="flex items-center justify-center w-20 sm:w-32 h-16 sm:h-28 bg-white mt-2 sm:mt-5 mr-2 sm:mr-5 rounded-2xl sm:rounded-3xl shadow-[0px_1px_2px_rgba(0,0,0,0.3)]
        transition-transform duration-500 ease-in-out hover:scale-[2]
        ">
            {item.link && (
                 <img src={item.link} alt="Avatar" className="w-full h-full p-2  object-contain" loading="lazy"
                 onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.jpg' }}
             />
            )}
           
        </div>
    );
};

export default Item;
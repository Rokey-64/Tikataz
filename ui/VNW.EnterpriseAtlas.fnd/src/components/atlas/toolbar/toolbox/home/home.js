import react from 'react';
import { IoHome } from "react-icons/io5";

/**
 * A component that displays a tool item in the toolbar
 * @returns 
 */
const Home = () => {

    const handleMouseHover = () => {
        console.log('Home')
    }

    return (
        <div >
            <button className='hover:bg-[#e1e1e2] py-2 px-2 rounded-xl'>
                <IoHome className='size-8' />
            </button>
        </div>
    );
};

export default Home;
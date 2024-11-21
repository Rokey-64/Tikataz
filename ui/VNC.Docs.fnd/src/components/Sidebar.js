import MenuList from './Datatest.js'
import { fetchContentAPI, fetchTitlesAPI } from './Api.js'
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ContentContext } from './Context.js';
/**
|--------------------------------------------------
| Menulist
|--------------------------------------------------
*/
const SideBar = (props) => {
    const [isTitles, setIsTitles] = useState([])
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    searchParams.set("idcatlg", props.idcatlg)
    const currPath = location.pathname + '?' + searchParams.toString();
    useEffect(() => {
        const fetchAPI = async () => {
            if (props.idcatlg) {
                const data = await fetchTitlesAPI(currPath)
                setIsTitles(data)
            }
        }

        fetchAPI()
    }, [currPath])

    return (
        <aside>
            <header className="py-4">
                <h2 className="text-orange-500 font-bold text-xl">Phụ lục</h2>
            </header>
            <ul>
                {
                    isTitles.length > 0 ?
                        isTitles.map((item, id) => {
                            return <MenuItem key={id} content={item.title} href={item.id} />
                        })
                        :
                        MenuList.map((item, id) => {
                            return <MenuItem key={id} content={item.content} href={item.id} />
                        })
                }
            </ul>
        </aside>
    );
}

export default SideBar;

/**
|--------------------------------------------------
| items
|--------------------------------------------------
*/
function MenuItem(props) {
    const { setContent } = useContext(ContentContext);
    const handleLinkClicked = async (event)=>{
        let resf 
        
        if(!resf){
            resf = await fetchContentAPI(`/?id=${props.href}`)

            setContent({"body":resf,"title":props.content})
        }
        
    }
    return (
        <li className="py-1">
            <Link to={props.href} className="side-bar" onClick={handleLinkClicked}>{props.content}</Link>
        </li>
    );
}
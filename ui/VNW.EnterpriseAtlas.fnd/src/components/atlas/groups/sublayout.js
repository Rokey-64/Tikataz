import CustomCard from "../items/cards/customeCard";
import { useSelector} from "react-redux"


const SubLayout = () => {
    const tags = useSelector((state) => state.tags);

    return (
        <div className="">
            {tags && tags.map((tag, index) => (
               <CustomCard tag={tag} index={tag._id} key={index} />
            ))} 
        </div>
    );
}

export default SubLayout
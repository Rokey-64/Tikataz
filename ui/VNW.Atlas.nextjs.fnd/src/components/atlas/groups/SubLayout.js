import CustomCard from "../items/cards/customeCard";
import { mockupAtlas } from "@/redux/atlasSlice";
import { useSelector, useDispatch } from "react-redux"
import _ from "lodash";
import { nanoid } from "nanoid";



const SubLayout = () => {
    // const tags = useSelector((state) => state.tags);

    const atlas = useSelector((state) => state.atlas);
    
    // const atlas = Array.from({ length: 10 }).map((item, index) => {
    //     return {
    //         ..._.cloneDeep(mockupAtlas),
    //         cid: nanoid(24),
    //     };
    // });

    return (
        <div>
            {atlas && atlas.map((card, index) => {
                if (card.atlasKind === "card") {
                    return (
                        <CustomCard card={card} index={card.cid} key={index} />
                    )
                }
                return null
            })}
        </div>
    );
}

export default SubLayout
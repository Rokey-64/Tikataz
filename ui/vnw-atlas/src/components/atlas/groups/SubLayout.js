import CustomCard from "../items/cards/customeCard";
import { mockupAtlas } from "@/redux/atlasSlice";
import { useSelector, useDispatch } from "react-redux"
import _ from "lodash";
import { nanoid } from "nanoid";
import BasicCard from "../items/BasicCard";



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
        <div className="space-y-4">
            {atlas && atlas.map((card, index) => {
                if (card.atlasKind === "card") {
                    return (
                        // <CustomCard card={card} index={card.cid} key={index} />
                        <BasicCard key={card.cid} card={card}/>
                    )
                }
                return null
            })}
        </div>
    );
}

export default SubLayout
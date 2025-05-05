import BasicCardBadges from "./BasicCardBadges";
import BasicCardCerts from "./BasicCardCerts";
import BasicCardProducts from "./BasicCardProducts";

const GeneralViewport = ({ card, visible}) => {

    return (
        <div className={`md:col-span-4 space-y-4 sm:space-y-5 ${visible ? 'block' : 'hidden'}`}>
            <BasicCardBadges card={card} />
            <BasicCardCerts card={card} />
            <BasicCardProducts card={card} />
        </div>
    );
}

export default GeneralViewport;
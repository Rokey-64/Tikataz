import CustomerHeader from "./customerHeader/customerHeader";
import CustomerLogo from "./customerLogo/customerLogo";
import CustomerTag from "./customerTag/customerTag";

/**
 * This component is used to display the customer body that contains the customer logo,  header and tag.
 * @returns 
 */
const CustomerBody = ({card}) => {
    const { data } = card;
    return (
        <div className="h-[38px] sm:h-[25.5rem]">
            <div className="flex">
                <div>
                    <CustomerLogo value={data.general.logo}/>
                </div>
                <div>
                    <CustomerHeader data={data}/>
                </div>
            </div>
            <CustomerTag card={card}/>
        </div>
    );
}

export default CustomerBody;
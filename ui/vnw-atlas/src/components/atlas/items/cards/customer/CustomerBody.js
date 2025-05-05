import CustomerHeader from "./customerHeader/customerHeader";
import CustomerLogo from "./customerLogo/customerLogo";
import CustomerTag from "./customerTag/customerTag";

/**
 * This component is used to display the customer body that contains the customer logo,  header and tag.
 * @returns 
 */
const CustomerBody = ({ card}) => {
    const { data } = card;
    
    return (
        <div className={`flex flex-col   rounded-xl w-fit`}>
            <div className="flex items-start bg-r">
                <CustomerLogo 
                    value={data.general.logo} 
                    className="flex-shrink-0"
                />
                
                <CustomerHeader 
                    data={data} 
                    className="flex-grow"
                />
            </div>

            {/* Tags section */}
            <div className="mt-2">
                <CustomerTag card={card} />
            </div>
        </div>
    );
}

export default CustomerBody;
import CustomerHeader from "./customerHeader/customerHeader";
import CustomerLogo from "./customerLogo/customerLogo";
import CustomerTag from "./customerTag/customerTag";

/**
 * This component is used to display the customer body that contains the customer logo,  header and tag.
 * @returns 
 */
const CustomerBody = ({tag}) => {
    return (
        <div className="w-[60px] sm:w-[35rem] h-[38px] sm:h-[25.5rem] ">
            <div className="flex">
                <div>
                    <CustomerLogo value={tag.header.logo}/>
                </div>
                <div>
                    <CustomerHeader tag={tag}/>
                </div>
            </div>
            <CustomerTag />
        </div>
    );
}

export default CustomerBody;
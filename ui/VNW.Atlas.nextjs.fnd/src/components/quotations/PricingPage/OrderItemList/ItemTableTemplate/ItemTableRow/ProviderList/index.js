import AddProviderDisplay from "../../../../../common/AddProviderDisplay";

/**
 * Displays a list of providers
 * @param {*} param0 
 * @returns 
 */
const ProviderList = ({ providers, removeEvent}) => {
    return (
        <div className="flex flex-wrap gap-x-2 mb-2">
            {
                providers.map((provider, index) => {
                    return <AddProviderDisplay key={index} provider={provider} event={() => { removeEvent(index) }} />
                })
            }
        </div>
    );
};

export default ProviderList;
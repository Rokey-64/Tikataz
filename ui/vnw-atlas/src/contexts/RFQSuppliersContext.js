import { createContext, useContext } from "react";

const RFQSupliersContext = createContext();
export const RFQSupliersProvider = ({ children, state, dispatch}) => {
    return (
       <RFQSupliersContext.Provider value={{state, dispatch}}>
            {children}
        </RFQSupliersContext.Provider>
    )
}

export const useRFQSupliersContext = () => useContext(RFQSupliersContext);
export default RFQSupliersProvider;
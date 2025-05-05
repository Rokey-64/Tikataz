import { createContext, useContext } from "react";

const RFQItemOrderContext = createContext();

export const RFQItemOrderProvider = ({ children, state, dispatch, orderItem}) => {
    return (
        <RFQItemOrderContext.Provider value={{state, dispatch, orderItem}}>
            {children}
        </RFQItemOrderContext.Provider>
    )
}

export const useAppContext = () => useContext(RFQItemOrderContext);
export default RFQItemOrderProvider;
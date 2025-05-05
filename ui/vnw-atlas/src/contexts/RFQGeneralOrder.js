import { createContext, useContext } from "react";

const RFQGenlOrderContext = createContext();

export const RFQGenlOrderProvider = ({ children, ...props }) => {
    return (
        <RFQGenlOrderContext.Provider value={props}>
            {children}
        </RFQGenlOrderContext.Provider>
    )
}

export const useAppContext = () => useContext(RFQGenlOrderContext);
export default RFQGenlOrderProvider;
import React, {createContext, useContext, useState} from "react";

export const ContentContext = createContext()

export const ContentProvider = ({children}) =>{
    const[content, setContent] = useState([])
    return(
        <ContentContext.Provider value={{content, setContent}}>
            {children}
        </ContentContext.Provider>
    )
}
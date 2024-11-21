import React, {useContext,createContext, useState} from "react";

const ContentContext = createContext()

const ProviderContext = ({compt})=>{
    const [content, setContent] = useState()
    return(
        <ContentContext.Provider value={{content, setContent}}>
            {compt}
        </ContentContext.Provider>
    )
}
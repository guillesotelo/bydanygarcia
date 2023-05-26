import React, { createContext } from 'react'

type AppContextType = {
    lang: string
    isMobile: boolean
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<AppContextType> = ({ lang, isMobile, children }) => (
    <AppContext.Provider value={{ lang, isMobile }}>{children}</AppContext.Provider>
);

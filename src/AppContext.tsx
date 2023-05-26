import React, { createContext } from 'react'

type AppContextType = {
    lang: string
    isMobile: boolean
    setLang: (lang: string) => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<AppContextType> = ({ lang, setLang, isMobile, children }) => (
    <AppContext.Provider value={{ lang, setLang, isMobile }}>{children}</AppContext.Provider>
);

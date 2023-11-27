import React, { createContext } from 'react'
import { dataObj } from './types'

type AppContextType = {
    lang: string
    isMobile: boolean
    setLang: (lang: string) => void
    search: string[]
    setSearch: (search: string[]) => void
    isLoggedIn: boolean
    setIsLoggedIn: (value: boolean) => void
    post: dataObj
    setPost: (value: dataObj) => void
    children: React.ReactNode
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<AppContextType> = ({
    lang,
    setLang,
    isMobile,
    setIsLoggedIn,
    isLoggedIn,
    search,
    setSearch,
    post, 
    setPost,
    children
}) => (
    <AppContext.Provider value={{
        lang,
        setLang,
        search,
        setSearch,
        isMobile,
        setIsLoggedIn,
        isLoggedIn,
        post,
        setPost,
        children
    }}>{children}</AppContext.Provider>
);

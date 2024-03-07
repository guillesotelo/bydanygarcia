import React, { createContext } from 'react'
import { postType } from './types'

type AppContextType = {
    lang: string
    isMobile: boolean
    setLang: (lang: string) => void
    search: string[]
    setSearch: (search: string[]) => void
    isLoggedIn: boolean | null
    setIsLoggedIn: (value: boolean | null) => void
    post: postType
    setPost: (value: postType) => void
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

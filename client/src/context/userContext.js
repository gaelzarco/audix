import { createContext, useState } from "react";

const UserProvider = ({ children }) => {
    const [tokens, setTokens] = useState({
        accessToken: null,
        refreshToken: null
    })

    return (
        <UserContext.Provider value={[ tokens, setTokens ]}>
            {children}
        </UserContext.Provider>
    )
}

const UserContext = createContext([{}, () => {}])

export { UserProvider, UserContext }
import { createContext, useState } from "react";

const LoginContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <LoginContext.Provider value={{ auth, setAuth }}>
            {children}
        </LoginContext.Provider>
    )
}

export default AuthProvider;
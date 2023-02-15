import { createContext } from "react";

const LoginContext = createContext({
    login:{
    username:"abc@gmail.com",
    isLoggedIn: false,
}})


export default LoginContext;
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {adminUrl, userUrl} from "../server";
export const UserContext = createContext({});


export const CreatedContext = ({ children }) => {
    /**GETTING CREDENTIALS */
    axios.defaults.withCredentials = true
    const [admin, setAdmin] = useState("");
    const [showHeader, setShowHeader] = useState(false);
    const [reguser, setReguser] = useState(null)


    const getAdmin = async () => {
        try {
            const { data } = await axios.get(`${adminUrl}/persistlogin`);
            console.log(data)
            setAdmin(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAdmin();
    }, []);

    /**USER */
    async function userStayLoggedIn() {
        try {
            const { data } = await axios.get(`${userUrl}/stay_logged`);
            setReguser(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        userStayLoggedIn()
    }, [])

    return (
        <UserContext.Provider value={{
            admin,
            setAdmin,
            showHeader, 
            setShowHeader,
            reguser,
            setReguser        
        }}>
            {children}
        </UserContext.Provider>
    )
}
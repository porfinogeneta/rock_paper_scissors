import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        console.log('Error, no context founded')
    }
    return context
}

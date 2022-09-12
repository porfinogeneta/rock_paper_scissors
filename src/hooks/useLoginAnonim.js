import {useEffect, useState} from "react";
import { useAuthContext } from "./useAuthContext";
// firebase
import { auth } from "../firebase/config";
import { signInAnonymously } from "firebase/auth";
import {database} from "../firebase/config";
import { ref, set} from "firebase/database";

export const useLoginAnonim = ( uid = null, gameId = null ) => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    // context
    const { dispatch } = useAuthContext()

    const connectPlayer = async () => {
        try {
            // connect user
            await set(ref(database, 'players/' + uid), {
                id: uid,
                participant: gameId
            });
            // connect to game with user uid
            await set(ref(database, 'games/' + gameId + '/participants/' + uid), {
                id: uid
            })
        }
        catch (err) {
            console.log(err.message)
        }

    }

    const login = async () => {
        try {
            // sign in
            const res = await signInAnonymously(auth)

            dispatch({ type: 'LOGIN', payload: res.user})
            if (!isCancelled) {
                setResponse(res)
                setError(null)
            }

        }
        catch (err) {
            console.log(err.message)
            if (!isCancelled) {
                setError(err.message)
                setResponse(null)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { login, connectPlayer, response, error}
}

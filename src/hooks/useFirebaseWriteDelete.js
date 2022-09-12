// firebase
import {ref, push, set, update} from "firebase/database";
import { database } from "../firebase/config";
// React
import { useState} from "react";


export const useFirebaseWriteDelete = ({uid}) => {
    const [ isPending, setIsPending ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ response, setResponse ] = useState(null)
    const [gameKey, setGameKey] = useState(null)


    // create game
    const writeData = async () => {
        try {
            setIsPending(true)
            const gamesListRef = ref(database, 'games/');
            const newGameRef = await push(gamesListRef);
            const addedGame = await set(newGameRef, {
                id: newGameRef.key, // key to the object in firebase
                tours: 1,
                founder: uid
            });
            setResponse(addedGame)
            setGameKey(newGameRef.key)
            setError(null)
        }
        catch (err) {
            setError(err.message)
        }
        finally {
            setIsPending(false)
        }
    }

    const writeWinner = async (gameId, winner) => {
        try {
            const gamesListRef = ref(database, 'games/' + gameId);
            await update(gamesListRef, winner)
        }catch (err) {
            console.log(err.message)
        }
    }


    return { writeData, writeWinner, response, error, isPending, gameKey}

}

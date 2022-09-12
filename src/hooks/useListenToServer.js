import {database} from "../firebase/config";
import { ref, onValue } from "firebase/database";
import {useEffect, useState} from "react";


export const useListenToServer = (gameId) => {
    const [results, setResults] = useState(null)
    const [heardWinner, setHeardWinner] = useState(null)

    useEffect(() => {
        // get choices and ids of users logged in the game
        const gameRef = ref(database, 'games/' + gameId)
        const unsubscribe = onValue(gameRef, (snapshot) => {
            // access children under participans - node
            const participantsSnapshot = snapshot.child('participants')
            // set up a winner listener
            const winnerSnapshot = snapshot.child('winner')
            // check if someone won
            if (winnerSnapshot.val()){
                setHeardWinner(winnerSnapshot.val)
            }
            // add participants
            let results = []
            participantsSnapshot.forEach((child) => {
                results.push({id: child.val().id, choice: child.val().choice});
              })

            console.log(results, 'from the hook')
            setResults(results)
        }, (err) => {
            console.log(err.message)
        })

        return () => unsubscribe()

    }, [gameId])

    // get users results

    return { results, heardWinner }

}

import {database} from "../firebase/config";
import { ref, onValue } from "firebase/database";
import {useEffect, useState} from "react";


export const useListenToServer = (gameId) => {
    const [results, setResults] = useState()
    const [heardWinner, setHeardWinner] = useState()

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

            // data.forEach((elem) => results.push(elem.val()))
            setResults(results)
        }, (err) => {
            console.log(err.message)
        })

        return () => unsubscribe()

    }, [gameId])

    return { results, heardWinner }

}

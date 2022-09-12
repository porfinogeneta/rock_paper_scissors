import {database} from "../firebase/config";
import { ref, set, update } from "firebase/database";

export const useHandleUserChoice = (uid, gameId) => {
    const saveChoice = async (choice) => {
        try {
            // set user choice in the user node
            const userChoiceRef = ref(database, 'players/' + uid + '/choice')
            const userGameRef = ref(database, 'games/' + gameId + '/participants/' + uid)
            // set a new propety in the user
            await set(userChoiceRef, {
                choice
            })
            // set a new property/update one in the game
            await update(userGameRef, {choice})
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const restartGame = async (player_1, player_2) => {

        const updates = {}

        updates['games/' + gameId + '/participants/' + player_1 + '/choice'] = null
        updates['games/' + gameId + '/participants/' + player_2 + '/choice'] = null

        await update(ref(database), updates)
    }

    return { saveChoice, restartGame }
}

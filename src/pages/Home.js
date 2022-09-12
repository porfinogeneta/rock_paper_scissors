import {useEffect} from "react";
import {useAuthContext} from "../hooks/useAuthContext";
import {useFirebaseWriteDelete} from "../hooks/useFirebaseWriteDelete";
// css
import styles from './Home.module.css'
import {useNavigate} from "react-router-dom";

export default function Home() {
    // hooks
    const { user } = useAuthContext()
    const { writeData, gameKey } = useFirebaseWriteDelete({uid: user.uid})
    // router
    const navigate = useNavigate()



    const handleClick = () => {
        writeData()
    }

    // connect created key to the route
    useEffect(() => {
        if (gameKey) {
            navigate(`/game/${gameKey}`)
        }
    }, [gameKey, navigate])

    return (
        <div>
            <div className={styles['text-welcome']}>
                <h1>Rock Paper Scissors</h1>
            </div>
            <button onClick={handleClick}>New Game</button>
        </div>
    )
}

import {useEffect, useRef, useState} from "react";
import {useFirebaseWriteDelete} from "../hooks/useFirebaseWriteDelete";
import {useParams} from "react-router-dom";
import {useAuthContext} from "../hooks/useAuthContext";
import {useLoginAnonim} from "../hooks/useLoginAnonim";
import {useListenToServer} from "../hooks/useListenToServer";
import styles from "./Game.module.css";
import ChooseFigure from "../components/ChooseFigure";
import {useHandleUserChoice} from "../hooks/useHandleUserChoice";
import ChosenFigure from "../components/ChosenFigure";
import CopyingButton from "../components/CopyingButton";



export default function Game() {
    const [you, setYou] = useState(null)
    const [enemy, setEnemy] = useState(null)
    const [winner, setWinner] = useState(null)
    // invitation operations
    const [isShowingInvite, setIsShowingInvite] = useState(false)


    // get auth user from context
    const { user } = useAuthContext()
    // get :id from link
    const params = useParams()
    // hooks
    const { connectPlayer } = useLoginAnonim(user.uid, params.id)
    // save user choice
    const { saveChoice, restartGame } = useHandleUserChoice(user.uid, params.id)
    // get winner
    const { writeWinner } = useFirebaseWriteDelete({uid: user.uid})
    // listen to the server changes
    const { results, heardWinner } = useListenToServer(params.id)

    // handle user choice
    const handleFigur = (value) => {
        saveChoice(value)
    }

    // handle new game creation
    const handleNewGame = () => {
        writeWinner(params.id, '')
        restartGame(you.id, enemy.id)
        setWinner('')
    }


    // calculate winner
    const calculateWinner = (results) => {
        // get both choices
        const choice_1 = results[0]['choice']
        const choice_2 = results[1]['choice']


        if (choice_1 === choice_2) {
            return 'DRAW'
        }else if (choice_1 === 'rock' && choice_2 === 'scissors') {
            return choice_1
        }else if (choice_1 === 'scissors' && choice_2 === 'paper') {
            return choice_1
        }else if (choice_1 === 'paper' && choice_2 === 'rock') {
            return choice_1
        }else if (choice_2 === 'scissors' && choice_1 === 'paper') {
            return choice_2
        }
        else if (choice_2 === 'paper' && choice_1 === 'rock') {
            return choice_2
        }else {
            return choice_2
        }
    }


    const saveWinner = useRef(() => {
        console.log('saving')
        writeWinner(params.id, winner)
    })

    useEffect(() => {
        // toggle off the invite button
        setIsShowingInvite(false)
        // listen to winner changes
        setWinner(heardWinner)
        // if both users exists
        if (results) {
            // if second user doesn't exist return a function, show invite button to allow to add players
            if (!results[1]) {
                setIsShowingInvite(true)
                return
            }
            // set both players on the board if there are two players
            if (results[0].id === user.uid) {
                setYou(results[0])
                setEnemy(results[1])
            } else {
                setYou(results[1])
                setEnemy(results[0])
            }

            if (results[0]['choice'] && results[1]['choice']) {
                // calculate which choice won
                const choiceWinner = calculateWinner(results)
                // set winner
                if (choiceWinner === results[0]['choice']) {
                    setWinner(results[0])
                } else if (choiceWinner === results[1]['choice']) {
                    setWinner(results[1])
                }else {
                    setWinner('DRAW')
                }
                saveWinner.current()
            }
        }
    }, [results, heardWinner, winner, user.uid])



    // listener on the server
    const { error } = useListenToServer()
    /* eslint-disable */
    // on mounted connect player to the current game
    useEffect(() => {
        setWinner('')
        connectPlayer()
    }, [])
    /* eslint-enable */

    return (
        <div>
            { error }
            <h1 className={styles.title}>Rock Paper Scissors</h1>
            {results && !isShowingInvite && (
                <>  { !winner && (
                    <ChooseFigure handleFigur={handleFigur}/>
                )}
                    { winner && (
                        <>

                           { winner === 'DRAW' && (<h1>DRAW</h1>) }
                            { winner.id === user.uid &&
                                (<p>
                                    <span style={{color: 'green'}}>You Won, </span>
                                    <span className={'winner'}>{(winner.choice).toUpperCase()}</span>
                                </p>)}
                            { winner.choice && winner.id !== user.uid &&
                                (<p>
                                    <span style={{color: 'red'}}>You Lost, </span>
                                    <span className={'winner'}>{(winner.choice).toUpperCase()}</span> is a winning choice
                                </p>)}
                            <button className={styles['btn-new']} onClick={handleNewGame}>New Game</button>
                        </>

                    )}

                    <div className={styles.game}>
                        <div className={styles.choice}>
                            <h3 className={styles.subtitle}>You</h3>
                            {you && (
                                <>
                                    <ChosenFigure choice={you.choice}/>
                                </>
                            )}
                        </div>
                        <div className={styles.border}></div>
                        <div className={styles.choice}>
                            <h3 className={styles.subtitle}>Enemy</h3>
                            {enemy && you.choice  && (
                                    <>
                                        <ChosenFigure choice={enemy.choice}/>
                                    </>
                                )}
                        </div>
                    </div>
                </>
            )}
            { isShowingInvite && (
                <CopyingButton/>
            )}
        </div>
    )
}

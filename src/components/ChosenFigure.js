import styles from './ChosenFigur.module.css'

export default function ChosenFigure({ choice }) {

    return (
        <div>
            {choice === 'paper' &&
                <>
                    <img className={styles.img} src={require('../assets/paper.svg').default} alt={'paper'}/>
                    <p>{choice}</p>
                </>
            }
            {choice === 'rock' &&
                <>
                    <img className={styles.img} src={require('../assets/rock.svg').default} alt={'rock'}/>
                    <p>{choice}</p>
                </>
            }
            {choice === 'scissors' &&
                <>
                    <img className={styles.img} src={require('../assets/scissors.svg').default} alt={'scissors'}/>
                    <p>{choice}</p>
                </>
            }
        </div>
    )
}

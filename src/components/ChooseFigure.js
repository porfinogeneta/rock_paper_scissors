
export default function ChooseFigure({handleFigur}) {

    return (
        <div className={"choose-container"}>
            <button onClick={() => handleFigur('rock')}>Rock</button>
            <button onClick={() => handleFigur('paper')}>Paper</button>
            <button onClick={() => handleFigur('scissors')}>Scissors</button>
        </div>
    )
}

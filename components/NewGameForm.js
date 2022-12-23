//For pages/new-game.js


import { useRef } from 'react';
import Card from './UI/Card';
import classes from './NewGameForm.module.css';

function NewGameForm(props) {
    const winnerInputRef = useRef();
    const playerOneInputRef = useRef();
    const playerTwoInputRef = useRef();
    const playerOneScoreInputRef = useRef();
    const playerTwoScoreInputRef = useRef();
    const dateInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredWinner = winnerInputRef.current.value;
        const enteredPlayerOne = playerOneInputRef.current.value;
        const enteredPlayerTwo = playerTwoInputRef.current.value;
        const enteredPlayerOneScore = playerOneScoreInputRef.current.value;
        const enteredPlayerTwoScore = playerTwoScoreInputRef.current.value;
        const enteredDate = dateInputRef.current.value;

        const gameData = {
            playerOne: enteredPlayerOne,
            playerTwo: enteredPlayerTwo,
            winner: enteredWinner,
            date: enteredDate,
            playerOneScore: enteredPlayerOneScore,
            playerTwoScore: enteredPlayerTwoScore
        };

        props.onAddGame(gameData);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='winner'>Winner Name</label>
                    <input type='text' required id='winner' ref={winnerInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='playerOne'>Player One Name</label>
                    <input type='text' required id='playerOne' ref={playerOneInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='playerTwo'>Player Two Name</label>
                    <input type='text' required id='playerTwo' ref={playerTwoInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='playerOneScore'>Player One Score</label>
                    <input type='number' required id='playerOneScore' ref={playerOneScoreInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='playerTwoScore'>Player Two Score</label>
                    <input type='number' required id='playerTwoScore' ref={playerTwoScoreInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='date'>Date of Game</label>
                    <input type='date' required id='date' ref={dateInputRef} />
                </div>
                <div className={classes.actions}>
                    <button>Add New Game Data</button>
                </div>
            </form>
        </Card>
    );
}

export default NewGameForm
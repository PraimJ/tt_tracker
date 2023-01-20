//For pages/new-game.js

import { useRef } from 'react';
import NewGame from './NewGameForm.module.css';
import PlayersList from '../Players/PlayersList';


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
            playerOne: JSON.parse(enteredPlayerOne),
            playerTwo: JSON.parse(enteredPlayerTwo),
            winner: JSON.parse(enteredWinner),
            date: enteredDate,
            playerOneScore: enteredPlayerOneScore,
            playerTwoScore: enteredPlayerTwoScore
        };

        props.onAddGame(gameData);
    }

    return (
        <div >
            <form className={NewGame.form} onSubmit={submitHandler}>

                <div className={NewGame.control}>
                    <PlayersList passedPlayers={props.players} selectId='winner' labelText="Winner's name" refToPass={winnerInputRef}></PlayersList>
                </div>

                <div className={NewGame.control}>
                    <PlayersList passedPlayers={props.players} selectId='playerOne' labelText="Player One" refToPass={playerOneInputRef}></PlayersList>
                </div>

                <div className={NewGame.control}>
                    <PlayersList passedPlayers={props.players} selectId='playeTwo' labelText="Player Two" refToPass={playerTwoInputRef}></PlayersList>
                </div>

                <div className={NewGame.control}>
                    <label htmlFor='playerOneScore'>Player One Score</label>
                    <input type='number' required id='playerOneScore' ref={playerOneScoreInputRef} />
                </div>

                <div className={NewGame.control}>
                    <label htmlFor='playerTwoScore'>Player Two Score</label>
                    <input type='number' required id='playerTwoScore' ref={playerTwoScoreInputRef} />
                </div>

                <div className={NewGame.control}>
                    <label htmlFor='date'>Date of Game</label>
                    <input type='date' required id='date' ref={dateInputRef} />
                </div>

                <div className={NewGame.actions}>
                    <button>Add New Game Data</button>
                </div>

            </form>
        </div>
    );
}

export default NewGameForm

//NOTES ARE MADE FOR THE FLOW OF THE CODE//

//The useRef Hook allows you to persist values between renders.
//It can be used to store a mutable value that does not cause a re-render when updated. It can be used to access a DOM element directly.

//import PlayersList Component to get the props.players

//useref takes all the current value of the element
// on sumbit of the form call sumbithandler function, which takes all the 
//Current values of each element and sends it to new-game.js page through
//Through props onAddgame

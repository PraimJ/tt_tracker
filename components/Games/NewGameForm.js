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


                {/* <div className={NewGame.control}>
                    <label htmlFor='winner'>Winner's Name</label>
                    <select id="winner" ref={winnerInputRef}>
                        {props.players.map((player) => (
                            <option>
                                {player.fullName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={NewGame.control}>
                    <label htmlFor='playerOne'>Player One</label>
                    <select id="playerOne" ref={playerOneInputRef}>
                        {props.players.map((player) => (
                            <option>
                                {player.fullName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={NewGame.control}>
                    <label htmlFor='playerTwo'>Player Two</label>
                    <select id="playerTwo" ref={playerTwoInputRef}>
                        {props.players.map((player) => (
                            <option>
                                {player.fullName}
                            </option>
                        ))}
                    </select>
                </div> */}

                <div className={NewGame.control}>
                    {/* <div className={NewGame.control}>
                    <label htmlFor='winner'>Winner's Name</label>
                    <select id="winner" ref={winnerInputRef}>
                        {props.players.map((player) => (
                            <option>
                                {player.fullName}
                            </option>
                        ))}
                    </select>
                </div> */}
                    <PlayersList players={props.players} selectId='winner' labelText="Winner's name" refToPass={winnerInputRef}></PlayersList>
                </div>

                <div className={NewGame.control}>
                    {/* <label htmlFor='playerOne'>Player One</label>
                    <select id="playerOne" ref={playerOneInputRef}>
                        {props.players.map((player) => (
                            <option>
                                {player.fullName}
                            </option>
                        ))}
                    </select> */}
                    <PlayersList players={props.players} selectId='playerOne' labelText="Player One" refToPass={playerOneInputRef}></PlayersList>
                </div>

                <div className={NewGame.control}>
                    {/* <label htmlFor='playerTwo'>Player Two</label>
                    <select id="playerTwo" ref={playerTwoInputRef}>
                        {props.players.map((player) => (
                            <option>
                                {player.fullName}
                            </option>
                        ))}
                    </select> */}
                    <PlayersList players={props.players} selectId='playeTwo' labelText="Player Two" refToPass={playerTwoInputRef}></PlayersList>
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
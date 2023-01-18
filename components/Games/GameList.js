import GameItem from './GameItem';
import { useState } from 'react';
// import classes from './MeetupList.module.css';

function GameList(props) {
    // console.log('game list players', props.players);
    // console.log('game list games', props.games);

    // const formattedGames = [];


    // const getFullNameFromId = (passedId) => {
    //     const playerToDisplay = props.players.filter((player) => {
    //         return player.id === passedId;
    //     });
    //     console.log('playerrr', playerToDisplay);
    //     return playerToDisplay.fullName;
    // };

    // props.games.forEach((game) => {
    //     console.log(game);
    //     const winnerFullName = getFullNameFromId(game.winner);
    //     const playerOneFullName = getFullNameFromId(game.playerOne);
    //     const playerTwoFullName = getFullNameFromId(game.playerTwo);
    //     console.log('winnerFullName', winnerFullName);
    //     game.winner = winnerFullName;
    //     game.playerOne = playerOneFullName;
    //     game.playerTwo = playerTwoFullName;
    //     formattedGames.push(game);
    // });

    // console.log('FORMATTED GAMES', formattedGames);

    return (
        <ul>
            {props.games.map((gamelist) => (
                <GameItem
                    key={gamelist.id}
                    id={gamelist.id}
                    playerOne={gamelist.playerOne.fullName}
                    playerTwo={gamelist.playerTwo.fullName}
                    winner={gamelist.winner.fullName}
                    date={gamelist.date}
                    playerOneScore={gamelist.playerOneScore}
                    playerTwoScore={gamelist.playerTwoScore}
                />
            ))}
        </ul>
    );
}


export default GameList;

//props are coming from pages/index.js
//props.games is mapped to become gamelist.
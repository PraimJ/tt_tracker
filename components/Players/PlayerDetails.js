import { useState } from 'react';
import { useRouter } from 'next/router';
import Classes from './PlayerDetails.module.css';
import PlayersList from "./PlayersList";



function PlayerDetails(props) {

    const router = useRouter();

    function updatePlayerHandler() {
        console.log(currentPlayer);
        router.push('/players/' + currentPlayer.id)
    };


    const formatCurrentPlayerWithGameData = (passedCurrentPlayer) => {
        const allGamesPlayerIsIn = props.games.filter((game) => {
            return game.playerOne.id === passedCurrentPlayer.id || game.playerTwo.id === passedCurrentPlayer.id;
        });
        let wins = 0;
        let losses = 0;
        let totalPoints = 0;

        allGamesPlayerIsIn.map((game) => {
            if (game.winner.id === passedCurrentPlayer.id) {
                wins = wins + 1;
            } else {
                losses = losses + 1;
            }

            if (game.playerOne.id === passedCurrentPlayer.id) {
                totalPoints = totalPoints + parseInt(game.playerOneScore, 10);
            } else {
                totalPoints = totalPoints + parseInt(game.playerTwoScore, 10);
            }
        });
        return {
            image: passedCurrentPlayer.image,
            id: passedCurrentPlayer.id,
            fullName: passedCurrentPlayer.fullName,
            dateOfBirth: passedCurrentPlayer.dateOfBirth,
            description: passedCurrentPlayer.description,
            wins: wins,
            losses: losses,
            totalPoints: totalPoints
        };
    };

    const [currentPlayer, setCurrentPlayer] = useState(props.players && props.players.length > 0 ? formatCurrentPlayerWithGameData(props.players[0]) : null);


    const setCurrentPlayerHandler = (passedCurrentPlayer) => {
        const formattedPlayer = formatCurrentPlayerWithGameData(passedCurrentPlayer);
        setCurrentPlayer(formattedPlayer);
    };



    if (props.players && props.players.length > 0)
    //or  if (props?.players.length > 0) 
    {
        return (
            <div className={Classes.leftcard}>
                <h1 >Player Details</h1>
                <PlayersList
                    passedPlayers={props.players}
                    labelText='Select a Player in Order To See Their Details and Statictics'
                    passCurrentPlayerValueToParent={setCurrentPlayerHandler}>
                </PlayersList>
                <div>
                    {/* <img src={currentPlayer?.image} alt={currentPlayer?.fullName} /> */}
                    <div>Player Name: {currentPlayer?.fullName}</div>
                    <div>Player DOB: {currentPlayer?.dateOfBirth}</div>
                    <div>Player Description: {currentPlayer?.description}</div>
                    <div>Total Points Scored: {currentPlayer?.totalPoints}</div>
                    <div>Wins: {currentPlayer?.wins}</div>
                    <div>Losses: {currentPlayer?.losses}</div>
                    <div>
                        <button onClick={updatePlayerHandler}>Update Player / Delete Player</button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div>
                Sorry, there are no players on this organization, click here to add a player.
            </div>
        </>
    );



};

export default PlayerDetails;


//NOTES ARE MADE FOR THE FLOW OF THE CODE

//props. Are coming from index.js games and players


// for useState is saying if there is a prop called players, and it has a length, so at least 1 player, we are setting currentPlayer to the first player in the array, else , null

//setCurrentPlayerHandler is called when onChange event happens on PlayerList component, it passes passCurrentPlayerValueToParent this gets transformed into an argument called passedCurrentPlayer. 
//const formattedPlayer calls a functions called (formatCurrentPlayerWithGameData) and passed (passedCurrentPlayer) as an argument
//for useState the setCurrentPlayer takes an argument that sets currentPlayer’s value, for this example currentPlayer is now formattedPlayer. 

// const formatCurrentPlayerWithGameData = (passedCurrentPlayer)
//this function returns an object back to formattedPlayer.
//const allGamesPlayerIsIn filters through all the games that a single player was in.
// wins, losses, totalPoints are variables
//then we map through allGamesPlayerIsIn to see if the game.winner.Id = passedCurrentPlayer.Id, this will give us a value of each occurrence +1 because of index of array rule. It this is not the case (else) then calculate the losses.
// if (game.playerOne.id === passedCurrentPlayer.id), then totalPoints is what in games where the player was classified as playerOne it takes there score and parses it because it was a string. Same thing for when the passedCurrentPlayer was classified as playerTwo. 
//then we return an array back to formattedPlayer
//Which then becomes currentPlayer

//now on the JSX side //we see if the props.player is greater then 0, if so we continue if not we get an error message.
//we put PlayersList in, we pass props.players to playlist as passedPlayers //labelText is to player list as a prop
//passCurrentPlayerValueToParent is coming from PlayersLIst component and giving us the value that we need to pass which is passedPlayer.
//in the div is eterating through the currentPlayer’s object

//The optional chaining (?.) operator accesses an object's property or calls a function. If the object accessed or function called is undefined or null, it returns undefined instead of throwing an error.//
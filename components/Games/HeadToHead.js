import { Fragment } from "react";
import GameItem from "./GameItem";


function HeadToHead(props) {

    if (!props.headToHeadArr || !props.headToHeadArr.length) {
        return (
            <Fragment>
                <div>Player 1:</div>
                <div>Full Name: {props.headToheadPlayerOne.fullName}</div>
                <div>DOB: {props.headToheadPlayerOne.dateOfBirth}</div>
                <div>Description: {props.headToheadPlayerOne.description}</div>
                <br />
                <div>Player 2:</div>
                <div>Full Name: {props.headToheadPlayerTwo.fullName}</div>
                <div>DOB: {props.headToheadPlayerTwo.dateOfBirth}</div>
                <div>Description: {props.headToheadPlayerTwo.description}</div>
                <br />
                <div>Games:</div>
                <div>
                    There are no games between {props.headToheadPlayerOne.fullName} and {props.headToheadPlayerTwo.fullName}.
                    Have a game with eachother, let's compare.
                </div>
            </Fragment>
        );
    }

    const headToHeadPlayerOneWins = props.headToHeadArr.filter((game) => {
        return game.winner.id === props.headToheadPlayerOne.id;
    });

    const headToHeadPlayerTwoWins = props.headToHeadArr.filter((game) => {
        return game.winner.id === props.headToheadPlayerTwo.id;
    });

    let leaderString = '';
    if (headToHeadPlayerOneWins.length !== headToHeadPlayerTwoWins.length) {
        leaderString = headToHeadPlayerOneWins > headToHeadPlayerTwoWins ? `${props.headToheadPlayerOne.fullName} leads head to head by ${headToHeadPlayerOneWins.length} - ${headToHeadPlayerTwoWins.length}`
            : `${props.headToheadPlayerTwo.fullName} leads head to head by ${headToHeadPlayerTwoWins.length} - ${headToHeadPlayerOneWins.length}`;
    } else {
        leaderString = `${props.headToheadPlayerOne.fullName} and ${props.headToheadPlayerTwo.fullName} are currently tied at ${headToHeadPlayerOneWins.length} games each`;
    }


    return (

        <div>
            <div>Player 1:</div>
            <div>Full Name: {props.headToheadPlayerOne.fullName}</div>
            <div>DOB: {props.headToheadPlayerOne.dateOfBirth}</div>
            <div>Description: {props.headToheadPlayerOne.description}</div>
            <div>Wins: {headToHeadPlayerOneWins.length}</div>
            <div>Losses: {props.headToHeadArr.length - headToHeadPlayerOneWins.length}</div>
            <div>Win Percentage: </div>
            <br />
            <div>Player 2:</div>
            <div>Full Name: {props.headToheadPlayerTwo.fullName}</div>
            <div>DOB: {props.headToheadPlayerTwo.dateOfBirth}</div>
            <div>Description: {props.headToheadPlayerTwo.description}</div>
            <div>Wins: {headToHeadPlayerTwoWins.length}</div>
            <div>Losses: {props.headToHeadArr.length - headToHeadPlayerTwoWins.length}</div>
            <div>Win Percentage: </div>
            <br />
            <div>{leaderString}</div>
            <br />
            <div>Games:</div>
            <br />
            <ul>
                {props.headToHeadArr.map((arr) => (
                    <GameItem
                        key={arr.id}
                        id={arr.id}
                        playerOne={arr.playerOne.fullName}
                        playerTwo={arr.playerTwo.fullName}
                        winner={arr.winner.fullName}
                        date={arr.date}
                        playerOneScore={arr.playerOneScore}
                        playerTwoScore={arr.playerTwoScore}
                    />
                ))}
            </ul>

        </div>

    );
}


export default HeadToHead;
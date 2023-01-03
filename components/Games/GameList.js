import GameItem from './GameItem';
// import classes from './MeetupList.module.css';

function GameList(props) {
    return (
        <ul>
            {props.games.map((gamelist) => (
                <GameItem
                    key={gamelist.id}
                    id={gamelist.id}
                    playerOne={gamelist.playerOne}
                    playerTwo={gamelist.playerTwo}
                    winner={gamelist.winner}
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
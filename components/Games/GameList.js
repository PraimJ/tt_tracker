import GameItem from './GameItem';



function GameList(props) {
    return (
        <>
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
        </>
    );
}


export default GameList;

//props are coming from pages/index.js
//props.games is mapped to become gamelist.
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
                        playerOneImage={gamelist.playerOne.image}
                        playerTwo={gamelist.playerTwo.fullName}
                        playerTwoImage={gamelist.playerTwo.image}
                        winner={gamelist.winner.fullName}
                        winnerImage={gamelist.winner.image}
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
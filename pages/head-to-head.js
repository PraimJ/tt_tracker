//Head to Head page = our-domian.com/head-to-head

import { Fragment, useState } from 'react';
import { MongoClient } from 'mongodb';
import PlayersList from '../components/Players/PlayersList';
import HeadToHead from '../components/Games/HeadToHead';


// HOOKS NOTES:
// - useMemo - stops whole page from re-rendering
// - useEffect - whole page gets re-rendered


function HeadToHeadPage(props) {

    const [headToheadPlayerOne, setHeadToHeadPlayerOne] = useState(props.players[0]);
    const [headToheadPlayerTwo, setHeadToHeadPlayerTwo] = useState(props.players[0]);
    const [headToHeadArr, setHeadToHeadArr] = useState([]);
    const [showHeadToHeadSubcomponent, setShowHeadToHeadSubcomponent] = useState(false);

    const setHeadToHeadPlayerOneHandler = (passedCurrentPlayer) => {
        setHeadToHeadPlayerOne(passedCurrentPlayer);
        setShowHeadToHeadSubcomponent(false);
    };

    const setHeadToHeadPlayerTwoHandler = (passedCurrentPlayer) => {
        setHeadToHeadPlayerTwo(passedCurrentPlayer);
        setShowHeadToHeadSubcomponent(false);

    };

    const headtoHeadArrHandler = () => {
        let finalFilteredH2HArr = [];
        const playerOneGames = props.games.filter((game) => {
            return game.playerOne.id === headToheadPlayerOne.id || game.playerTwo.id === headToheadPlayerOne.id;
        });
        if (playerOneGames.length) {
            finalFilteredH2HArr = playerOneGames.filter((game) => {
                return game.playerOne.id === headToheadPlayerTwo.id || game.playerTwo.id === headToheadPlayerTwo.id;
            });
        };
        console.log(finalFilteredH2HArr);
        setHeadToHeadArr(finalFilteredH2HArr);
        setShowHeadToHeadSubcomponent(true);
    };

    if (!props.games || !props.players || !props.games.length || props.players.length < 2) {
        return (
            <Fragment>
                <div>
                    There are either no games, or not enough players to do a head to head.
                    Please try adding players or games.
                </div>
            </Fragment>
        );
    }

    return (
        <>
            <PlayersList passedPlayers={props.players} passCurrentPlayerValueToParent={setHeadToHeadPlayerOneHandler} />
            <PlayersList passedPlayers={props.players} passCurrentPlayerValueToParent={setHeadToHeadPlayerTwoHandler} />
            <button
                disabled={!headToheadPlayerOne || !headToheadPlayerTwo || headToheadPlayerOne.id === headToheadPlayerTwo.id}
                onClick={headtoHeadArrHandler}
            >Compare Head to Head
            </button>
            {showHeadToHeadSubcomponent ?
                <HeadToHead
                    headToheadPlayerOne={headToheadPlayerOne}
                    headToheadPlayerTwo={headToheadPlayerTwo}
                    headToHeadArr={headToHeadArr}
                /> : <div></div>
            }
        </>
    );
};

export async function getStaticProps() {

    const client = await MongoClient.connect(
        'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
    );
    const db = client.db();

    // NTS - change these to use await Promise.all
    const gamesCollection = db.collection('Games');
    const games = await gamesCollection.find().toArray();
    // console.log('games in the actual static props', games);

    const playersCollection = db.collection('players');
    const players = await playersCollection.find().toArray();

    client.close();

    return {

        props: {
            games: games.map((game) => ({
                id: game._id.toString(),
                playerOne: game.playerOne,
                playerTwo: game.playerTwo,
                winner: game.winner,
                date: game.date,
                playerOneScore: game.playerOneScore,
                playerTwoScore: game.playerTwoScore
            })),

            players: players.map((player) => ({
                id: player._id.toString(),
                fullName: player.fullName,
                dateOfBirth: player.dateOfBirth,
                description: player.description
            })),

        },

        // revalidate: 1,

    };
}





export default HeadToHeadPage;

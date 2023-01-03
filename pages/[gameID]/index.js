//SHOW DETAILS PAGE = our-domian.com/(gameID)


import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import GameDetail from '../../components/Games/GameDetail';

function GameDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>Game Details</title>
                <meta name='description' content='Game Details' />
            </Head>
            <GameDetail
                playerOne={props.gameData.playerOne}
                playerTwo={props.gameData.playerTwo}
                playerOneScore={props.gameData.playerOneScore}
                playerTwoScore={props.gameData.playerTwoScore}
                winner={props.gameData.winner}
                date={props.gameData.date} />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
    );
    const db = client.db();

    const gamesCollection = db.collection('Games');

    const games = await gamesCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: games.map((game) => ({
            params: { gameID: game._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    // fetch data for a single game

    const gameID = context.params.gameID;

    const client = await MongoClient.connect(
        'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
    );
    const db = client.db();

    const gamesCollection = db.collection('Games');

    const selectedGame = await gamesCollection.findOne({
        _id: ObjectId(gameID),
    });

    client.close();

    return {
        props: {
            gameData: {
                id: selectedGame._id.toString(),
                playerOne: selectedGame.playerOne,
                playerTwo: selectedGame.playerTwo,
                winner: selectedGame.winner,
                date: selectedGame.date,
                playerOneScore: selectedGame.playerOneScore,
                playerTwoScore: selectedGame.playerTwoScore

            },
        },
    };
}

export default GameDetails;
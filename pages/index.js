//HOME PAGE = our-domian.com/

import { Fragment } from 'react';
import GameList from '../components/GameList';
import { MongoClient } from 'mongodb';


//props are passed from index to gamelist
//When you get out of the terminal, to get back into terminal do this (npm run start)
//NOTE 

function HomePage(props) {
  console.log(props.games);

  return (
    <Fragment>
      <div>
        <GameList games={props.games} />
      </div>
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
  );
  const db = client.db();

  const gamesCollection = db.collection('Games');

  const games = await gamesCollection.find().toArray();

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

    },

    revalidate: 1,

  };
}


export default HomePage;



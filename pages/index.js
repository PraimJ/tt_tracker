//HOME PAGE = our-domian.com/

import { Fragment } from 'react';
import GameList from '../components/Games/GameList';
import { MongoClient } from 'mongodb';


//props are passed from index to gamelist, as games
//When you get out of the terminal, to get back into terminal do this (npm run start)
//NOTE 

function HomePage(props) {
  console.log(props.games);
  //now props.games are the info from the staticprops
  return (
    <Fragment>
      <div className="w40">
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

//getStaticProps is accessing the Database when we load the page.
//its fetching the data from the database
//props.games(is maping through all the datasets to access all the data use the game.(the name in the database))

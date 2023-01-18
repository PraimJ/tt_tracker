//HOME PAGE = our-domian.com/

import { Fragment } from 'react';
import GameList from '../components/Games/GameList';
import PlayersList from '../components/Players/PlayersList';
import { MongoClient } from 'mongodb';
import Navbar from '../components/UI/Navbar';
import { APP_CLIENT_INTERNALS } from 'next/dist/shared/lib/constants';


//props are passed from index to gamelist, as games
//When you get out of the terminal, to get back into terminal do this (npm run start) or npm run dev
//NOTE 

function HomePage(props) {

  console.log('games in parent', props.games);


  // console.log('games', props.games);
  // console.log('players', props.players);
  //now props.games are the info from the staticprops

  if (props.games && props.games.length > 0) {
    return (
      <>
        <Navbar></Navbar>
        <GameList games={props.games} players={props.players} />
        <PlayersList players={props.players}></PlayersList>
      </>
    );
  }
  return (
    <>
      <Navbar></Navbar>
      <div>No Games - add one by clicking here</div>
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
  console.log('games in the actual static props', games);

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





export default HomePage;

//getStaticProps is accessing the Database when we load the page.
//its fetching the data from the database
//props.games(is maping through all the datasets to access all the data use the game.(the name in the database))


// {"_id":{"$oid":"63b49e597cf21081243fd8eb"}, "firstName": "Praim", "lastName": "Jutla", "dateOfBirth": "1990-01-24", "description": "Great player"
// }


// DATA ON MONGO

// GAME
// playerOne
// "Homer Simpson"
// playerTwo
// "Ned Flanders"
// winner
// "Homer Simpson"
// date
// "2022-12-23"
// playerOneScore
// "21"
// playerTwoScore
// "5"

// PLYER

// dateOfBirth
// "1990-01-24"
// description
// "Great player"
// fullName
// "Praim Jutla"
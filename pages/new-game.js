// our-domain.com/new-game

import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MongoClient } from 'mongodb';

import NewGameForm from '../components/Games/NewGameForm';

function NewGamePage(props) {

  // console.log('players', props.players);
  const router = useRouter();

  async function addGameHandler(enteredGameData) {
    // console.log("hey", enteredGameData)
    // add try catch logic here
    const response = await fetch('api/new-game', {
      method: 'POST',
      body: JSON.stringify(enteredGameData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // console.log(data);

    router.push('/');
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Game Log </title>
        <meta
          name='description'
          content='Log your head to head ping-pong game scores here !!!'
        />
      </Head>
      <NewGameForm onAddGame={addGameHandler} players={props.players} />
    </Fragment>
  );
}

export async function getStaticProps() {

  const client = await MongoClient.connect(
    'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
  );
  const db = client.db();

  const playersCollection = db.collection('players');
  const players = await playersCollection.find().toArray();

  client.close();

  return {

    props: {
      players: players.map((player) => ({
        id: player._id.toString(),
        fullName: player.fullName,
        dateOfBirth: player.dateOfBirth,
        description: player.description,
        image: player.image
      })),

    },

    revalidate: 1,

  };
}


export default NewGamePage;

//NOTES ARE MADE FOR THE FLOW OF THE CODE//

//imported Head, We expose a built-in component for appending elements to the head of the page:
//useRouter = If you want to access the router object inside any function component in your app, you can use the useRouter hook, take a look at the following example:
//MongoClient is used to fetch the data from database
//we are giving props from NewGamePage Component (onAddGame, players)

// the static props is getting all player object in the collection
//if you have to use router, make it a const in the start of the function
//when onAddGame function is active on the NewGameForm component, it calls the addGameHandler function.
//addGameHandler take an argument called enteredGameData which is the data sent from newGameForm component. 
//response fetches the api of api/new-game, it calls a method of post, the body is enteredGameData
//data = is the response that is posted
//router.push(‘/‘), after the game is posted than it send back to the indexes page


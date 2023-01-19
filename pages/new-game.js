// our-domain.com/new-game

import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MongoClient } from 'mongodb';

import NewGameForm from '../components/Games/NewGameForm';

function NewGamePage(props) {

  console.log('players', props.players);
  const router = useRouter();

  async function addGameHandler(enteredGameData) {
    console.log("hey", enteredGameData)
    // add try catch logic here
    const response = await fetch('api/new-game', {
      method: 'POST',
      body: JSON.stringify(enteredGameData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);

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
        description: player.description
      })),

    },

    revalidate: 1,

  };
}


export default NewGamePage;

// getStatisProps


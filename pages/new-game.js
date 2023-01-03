// our-domain.com/new-game

import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import NewGameForm from '../components/Games/NewGameForm';

function NewGamePage() {
  const router = useRouter();

  async function addGameHandler(enteredGameData) {
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
      <NewGameForm onAddGame={addGameHandler} />
    </Fragment>
  );
}

export default NewGamePage;
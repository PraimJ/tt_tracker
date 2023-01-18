// our-domain.com/new-player

import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import NewPlayerForm from '../components/Players/NewPlayerForm';

function NewPlayerPage() {
  const router = useRouter();

  async function addPlayerHandler(enteredPlayerData) {
    const response = await fetch('api/new-player', {
      method: 'POST',
      body: JSON.stringify(enteredPlayerData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/');
  }

  return (
    <>
      <Head>
        <title>ADD A NEW PLAYER </title>
        <meta
          name='description'
          content='Add yourself as a player'
        />
      </Head>
      <NewPlayerForm onAddPlayer={addPlayerHandler} />
    </>
  );
}

export default NewPlayerPage;
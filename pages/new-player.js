// our-domain.com/new-player

import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import NewPlayerForm from '../components/Players/NewPlayerForm';
// import PlayerForm from '../components/Players/PlayerForm';

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

    // console.log(data);

    router.push('/');
  }

  return (
    <Fragment>
      <Head>
        <title>ADD A NEW PLAYER </title>
        <meta
          name='description'
          content='Add yourself as a player'
        />
      </Head>
      <NewPlayerForm onAddPlayer={addPlayerHandler} />
      {/* <PlayerForm onPlayerFormComplete={addPlayerHandler} /> */}
    </Fragment>
  );
}

export default NewPlayerPage;

//NOTES ARE MADE FOR THE FLOW OF THE CODE//

//imported Head, We expose a built-in component for appending elements to the head of the page:
//useRouter = If you want to access the router object inside any function component in your app, you can use the useRouter hook, take a look at the following example:
//MongoClient is used to fetch the data from database
//we are giving props from NewPlayerForm Component (onAddPlayer)

//if you have to use router, make it a const in the start of the function
//when onAddPlayer function is active on the NewPlayerForm component, it calls the addPlayerHandler function.
//addPlayerHandler take an argument called enteredPlayerData which is the data sent from newplayerForm component. 
//response fetches the api of api/new-player, it calls a method of post, the body is enteredPlayerData
//data = is the response that is posted
//router.push(‘/‘), after the game is posted than it send back to the indexes page


//SHOW UPDATE PLAYER PAGE = our-domian.com/(playerID)

import { MongoClient, ObjectId } from 'mongodb';
import { Fragment, useState } from 'react';
import Head from 'next/head';
// import PlayerForm from '../../../components/Players/PlayerForm';
import { Router } from 'next/router';

// import NewPlayerForm from '../../components/Players/NewPlayerForm';

function PlayerUpdatePage(props) {

    // const onUpdatePlayerHandler = async (playerID) => {
    //     const response = await fetch(`api/${playerID}`, {
    //         method: 'PUT',
    //     });

    //     const data = await response.json();

    //     console.log(data);
    // };



    const [playerName, setPlayerName] = useState(props.playerData.fullName);
    const [playerDOB, setPlayerDOB] = useState(props.playerData.dateOfBirth);
    const [playerDescription, setPlayerDescription] = useState(props.playerData.description);
    const [playerImage, setPlayerImage] = useState(props.playerData.image);

    const onSetPlayerDescriptionHandler = (event) => {
        setPlayerDescription(event.target.value);
    }

    const onSetPlayerNameHandler = (event) => {
        setPlayerName(event.target.value);
    }

    const onSetPlayerDOBHandler = (event) => {
        setPlayerDOB(event.target.value);
    }

    const onSetPlayerImageHandler = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPlayerImage(reader.result.toString());
        };
        reader.readAsDataURL(file)
    };

    const updatedPlayerName = playerName;
    const updatedPlayerDOB = playerDOB;
    const updatedPlayerDescription = playerDescription;
    const updatedPlayerImage = playerImage;


    const updatedPlayerData = {
        fullName: updatedPlayerName,
        dateOfBirth: updatedPlayerDescription,
        description: updatedPlayerDOB,
        image: updatedPlayerImage
    };



    const onUpdatePlayerHandler = async (playerID) => {
        console.log(updatedPlayerData);
        try {
            const response = await fetch(`/api/update-player/${playerID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: updatedPlayerData.fullName,
                    dateOfBirth: updatedPlayerData.dateOfBirth,
                    description: updatedPlayerData.description,
                    image: updatedPlayerData.image
                }),
            });

            const data = await response.json();
            Router.push(`players/${playerID}`)
        } catch (error) {
            "Something went wrong!";
        }
    };



    return (
        <>
            <Head>
                <title>Player</title>
                <meta name='description' content='Update Player Info' />
            </Head>
            <div>{props.playerData.fullName}</div>
            <div>
                <form onSubmit={onUpdatePlayerHandler}>
                    <div>
                        <label htmlFor='playerName'>New Player's Name</label>
                        <input type='text' required id='playerName' value={playerName} onChange={onSetPlayerNameHandler}
                        />
                    </div>
                    <div >
                        <label htmlFor='DOB'>Date of Birth</label>
                        <input type='date' required id='DOB' value={playerDOB} onChange={onSetPlayerDOBHandler} />
                    </div>
                    <div>
                        <label htmlFor='description'>Player's Description</label>
                        <input type='text' required id='description' value={playerDescription} onChange={onSetPlayerDescriptionHandler} />
                    </div>
                    <div >
                        {props.playerData.image ? (
                            <img src={props.playerData.image} />
                        ) : (
                            <div>
                                <label htmlFor='image'>Upload Player's Image</label>
                                <input id='image' type='file' required value={image} onChange={onSetPlayerImageHandler} />
                            </div>
                        )}
                    </div>
                    <div>

                        <button> Update {props.playerData.fullName} </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
    );
    const db = client.db();

    const playersCollection = db.collection('players');

    const players = await playersCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: players.map((player) => ({
            params: { playerID: player._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    // fetch data for a single player

    const playerID = context.params.playerID;

    const client = await MongoClient.connect(
        'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
    );
    const db = client.db();

    const playersCollection = db.collection('players');

    const selectedPlayer = await playersCollection.findOne({
        _id: ObjectId(playerID),
    });

    client.close();

    return {
        props: {
            playerData: {
                id: selectedPlayer._id.toString(),
                fullName: selectedPlayer.fullName,
                dateOfBirth: selectedPlayer.dateOfBirth,
                description: selectedPlayer.description,
                image: selectedPlayer.image,
            },
        },
    };
}

export default PlayerUpdatePage;
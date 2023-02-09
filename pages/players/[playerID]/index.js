//SHOW UPDATE PLAYER PAGE = our-domian.com/(playerID)

import { MongoClient, ObjectId } from 'mongodb';
import { Fragment, useState, useEffect } from 'react';
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


    const onUpdatePlayerHandler = async (playerID) => {
        console.log(up);
        try {
            const response = await fetch(`/api/update-player/${playerID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: up.fullName,
                    dateOfBirth: up.dateOfBirth,
                    description: up.description,
                    image: up.image
                }),
            });

            const data = await response.json();
            Router.push(`players/${playerID}`)
        } catch (error) {
            "Something went wrong!";
        }
    };


    const [playerName, setPlayerName] = useState(props.playerData.fullName);
    const [playerDOB, setPlayerDOB] = useState(props.playerData.dateOfBirth);
    const [playerDescription, setPlayerDescription] = useState(props.playerData.description);
    const [image, setImageOne] = useState(props.playerData.image);

    useEffect(() => {
        setPlayerName(playerName);
        setPlayerDOB(playerDOB);
        setPlayerDescription(playerDescription);
        setImageOne(image);

    }, [props.playerData]);



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
                        <input type='text' required id='playerName' value={props.playerData.fullName} onChange={(e) => onSetPlayerNameHandler(e.target.value)} />
                    </div>
                    <div >
                        <label htmlFor='DOB'>Date of Birth</label>
                        <input type='date' required id='DOB' value={props.playerData.dateOfBirth} onChange={(e) => onSetPlayerDOBHandler(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='description'>Player's Description</label>
                        <input type='text' required id='description' value={props.playerData.description} onChange={(e) => onSetPlayerDescriptionHandler(e.target.value)} />
                    </div>
                    <div >
                        {image ? (
                            <img src={image} />
                        ) : (
                            <div>
                                <label htmlFor='image'>Upload Player's Image</label>
                                <input id='image' type='file' required value={props.playerData.image} onChange={e => convert2base64(e)} />
                            </div>
                        )}
                    </div>
                    <div>

                        <button>`Update ${props.playerData.fullName}`</button>
                    </div>
                </form>
            </div>
        </>
    );
}

//     const [playerName, setPlayerName] = useState(props?.playerToUpdate ? props.playerToUpdate.fullName : '');
//     const [playerDOB, setPlayerDOB] = useState(props?.playerToUpdate ? props.playerToUpdate.dateOfBirth : '');
//     const [playerDescription, setPlayerDescription] = useState(props?.playerToUpdate ? props.playerToUpdate.description : '');
//     const [image, setImageOne] = useState(props?.playerToUpdate ? props.playerToUpdate.image : '');

//     const onSetPlayerNameHandler = (event) => {
//         setPlayerName(event.target.value);
//     }
//     const onSetPlayerDOBHandler = (event) => {
//         setPlayerDOB(event.target.value);
//     }
//     const onSetPlayerDescriptionHandler = (event) => {
//         setPlayerDescription(event.target.value);
//     }

//     const convert2base64 = e => {
//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.onloadend = () => {
//             setImageOne(reader.result.toString());
//         };
//         reader.readAsDataURL(file)
//     };

//     function submitHandler(event) {
//         event.preventDefault();

//         const enteredPlayerName = playerName;
//         const enteredDOB = playerDOB;
//         const enteredDescription = playerDescription;


//         const playerData = {
//             fullName: enteredPlayerName,
//             dateOfBirth: enteredDOB,
//             description: enteredDescription,
//             image: image
//         };

//         props.onPlayerFormComplete(playerData);
//     }

//     return (
//        
//     );
// }

// export default PlayerForm;














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
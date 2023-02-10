//SHOW DETAILS PAGE = our-domian.com/(gameID)

import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import GameDetail from '../../components/Games/GameDetail';

function GameDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>Game Details</title>
                <meta name='description' content='Game Details' />
            </Head>
            <GameDetail
                playerOne={props.gameData.playerOne}
                playerOneImage={props.gameData.playerOneImage}
                playerTwo={props.gameData.playerTwo}
                playerTwoImage={props.gameData.playerTwoImage}
                playerOneScore={props.gameData.playerOneScore}
                playerTwoScore={props.gameData.playerTwoScore}
                winner={props.gameData.winner}
                winnerImage={props.gameData.winnerImage}
                date={props.gameData.date} />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
    );
    const db = client.db();

    const gamesCollection = db.collection('Games');

    const games = await gamesCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: games.map((game) => ({
            params: { gameID: game._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    // fetch data for a single game

    const gameID = context.params.gameID;

    const client = await MongoClient.connect(
        'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
    );
    const db = client.db();

    const gamesCollection = db.collection('Games');

    const selectedGame = await gamesCollection.findOne({
        _id: ObjectId(gameID),
    });

    client.close();

    return {
        props: {
            gameData: {
                id: selectedGame._id.toString(),
                playerOne: selectedGame.playerOne.fullName,
                playerOneImage: selectedGame.playerOne.image,
                playerTwo: selectedGame.playerTwo.fullName,
                playerTwoImage: selectedGame.playerTwo.image,
                winner: selectedGame.winner.fullName,
                winnerImage: selectedGame.winner.image,
                date: selectedGame.date,
                playerOneScore: selectedGame.playerOneScore,
                playerTwoScore: selectedGame.playerTwoScore

            },
        },
    };
}

export default GameDetails;



// NOTES ARE MADE FOR THE FLOW OF THE CODE

// imported MongoClient from mongodb library to access my database on MONGO ATLAS. //
// I also imported ObjectId in mongoldb libarary , A class representation of the BSON ObjectId type.//
// head = This component injects elements to <head> of your page. To avoid duplicated tags in <head> you can use the key property, which will make sure every tag is only rendered once.//

// getStaticPaths , If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated. // We get our database info using mongo client and connecting to our token, tell which collection you want. //

//Description for:  const games = await gamesCollection.find({}, { _id: 1 }).toArray();//
//Find gives me access to all the games. Now, actually here I'm only interested in the IDs and therefore we can tweak find and pass an empty object as a first argument.
//Here we could define our filter criteria if we wanna not find all documents but filter for certain field values. But I do wanna find all here. Hence we use a empty object,
//which means give me all the objects. I have no filter criteria but then we can pass a second argument where we can define which fields should be extracted for every document. And by default, all the fields will be returned. So all the field values, title, image and so on but if we're only interested in the ID, we can also add _id here and set this to one, which means only include the ID but no other field values. And with that, we're only fetching the IDs. So we fetch the document objects but they each will only contain the ID, nothing else. Now again, we should call toArray here to convert this to a JavaScript array of objects.//
//
//  Description for:   return { fallback: 'blocking',
    // paths: games.map((game) => ({
 //params: { gameID: game._id.toString() }, })),},} 
//
//And now we got our games here and now we can generate the paths dynamically.
//Instead of hard coding this array, we can use games here and then map every game item, which is a document with an id into an object, because paths should be an array of objects, where every object has this params key just as we have it down there. And then we have a nested object in there where we define our gameId values. And the values for gameId should now be our IDs here. So here we can then access game, so this parameter, which map gives us automatically,
//._id.toString, like that. With that, we're generating our array of paths dynamically.//
//
// this is for : getStaticProps
//I'll again connect and get access to the collection. I want to get access to a single game. So I want to get access to my selectedGame here and we do this by using the gamesCollection and then using the the findOne method. findOne finds one single document. And to findOne, we need to pass an object where we define how to filter,
//how to search for that document. On this object, you can pass your field names,
//like title, image, address or description as keys and then the values for which you wanna search as values. So we could pass title: A First Game as a key-value pair
//into this object here to find this first game where the title is A First Game.
//Now, here we don't wanna search by title but instead by ID. So I wanna make sure that _id, the automatically added and generated ID field, has a value of gameId, so this gameId, which we extract from the params up there. This then finds us this single game. This returns a promise because it's an asynchronous task
//and hence we should await this and make sure that we added async in front of the function. With that we got the selectedGame eventually. And now it's the selectedGame, which I return here as game Data, like this. And then if we do that and save everything, if I reload this game here, it should load successfully
//and it should display all the data. Now, at the moment, the data I'm showing here, however, is still hard coded in the JSX code and now it's finally time to use our props data here. So the actual fetch data in the JSX code as well. For this, we're exposing the gameData prop to the component and hence, here we should accept props
//and use that data here.
//Here for findOne, I'm looking for an id, which is equal to the id I'm getting out
//of my URL but that, of course, will be a string. Keep in mind that in MongoDB actually, our IDs are these strange object ID things. To ensure that we can correctly look for a specific ID, we need to convert it from string to such a object ID thing
//and for this, from MongoDB, you should import ObjectId like this with a lowercase D at the end. And wrap your string with that. So down here, wrap ObjectId around gameId and this will convert this string into such a ObjectId object.
//And once that is done, we also wanna go to selectedGame and make sure that there we convert this id, this _id field back to a string because otherwise, we'll get that serialization error we saw before. So for this, I'll set gameData actually to an object
//where I do add an id field, which is equal to selectedgame._id.toString and where I then add all the other data, ike selectedgame.title, then the address, which is  if you reload a single game page, you see the data for that single game. And that works for all the games now. And now these meetup detail pages are pre-rendered on the server dynamically with our code being active and with our code establishing that database connection and fetching the data from there.//
//

//The context parameter is an object containing the following keys:
//params contains the route parameters for pages using dynamic routes. For example, if the page name is [id].js , then params will look like { id: ... }. You should use this together with getStaticPaths, which we’ll explain later.
//

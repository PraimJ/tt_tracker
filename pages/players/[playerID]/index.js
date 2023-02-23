
import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { Fragment } from "react";


function PlayerDetailPage(props) {
    const router = useRouter();

    const goBack = () => router.push("/");

    // // update invoice status in database
    // const updatePlayerDetails = async (playerID) => {
    //     const res = await fetch(`/api/invoices/${playerID}`, {
    //         method: "PUT",
    //     });
    //     const data = await res.json();
    // };

    // delete invoice from the database
    const deletePlayer = async (playerID) => {
        try {
            const res = await fetch(`/api/invoices/${playerID}`, {
                method: "DELETE",
            });

            const data = await res.json();
            success(data.message);
            router.push("/");
        } catch (error) {
            error("Something went wrong!");
        }
    };



    return (
        <Fragment>
            <div>
                <h1>PLAYER DETAILS</h1>
            </div>
            <div>
                <h2>PLAYER NAME :{props.playerData.fullName}</h2>
            </div>
            <div>
                <h2>PLAYER DESCRIPTION :{props.playerData.description}</h2>
            </div>
            <div>
                <h2>PLAYER DATE OF BIRTH :{props.playerData.dateOfBirth}</h2>
            </div>
            <div>
                <h2>PLAYER IMAGE :{props.playerData.image}</h2>
            </div>
            <button onClick={() => deletePlayer(props.playerData.id)}>DELETE PLAYER</button>
            <button onClick={() => updatePlayer(props.playerData.id)}>UPDATE PLAYER</button>

        </Fragment>



    );



}

export default PlayerDetailPage;





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

    const { playerID } = context.params;

    const client = await MongoClient.connect(
        'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
    );
    const db = client.db();

    const playersCollection = db.collection('players');

    const selectedPlayer = await playersCollection.findOne({
        _id: ObjectId(playerID),
    });

    // client.close();

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
        revalidate: 1,
    };
}


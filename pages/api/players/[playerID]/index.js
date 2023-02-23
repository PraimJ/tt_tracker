import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
    const { playerID } = req.query;

    const client = await MongoClient.connect(
        'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority',
        { useNewUrlParser: true }
    );

    const db = client.db();
    const playersCollection = db.collection('players');


    //   delete request
    if (req.method === "DELETE") {
        await playersCollection.deleteOne({ _id: ObjectId(playerID) });

        res.status(200).json({ message: "Player deleted successfully" });
        client.close();
    }
}

export default handler;
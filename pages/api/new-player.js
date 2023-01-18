import { MongoClient } from 'mongodb';

// /api/new-player
// POST /api/new-player

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(
            'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
        );
        const db = client.db();

        const gamesCollection = db.collection('players');

        const result = await gamesCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'A new player inserted!' });
    }
}

export default handler;
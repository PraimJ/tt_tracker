// /api/new-game
// POST /api/new-game

import { MongoClient } from 'mongodb';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(
            'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
        );
        const db = client.db();

        const gamesCollection = db.collection('Games');

        const result = await gamesCollection.insertOne(data);

        // console.log(result);

        client.close();

        res.status(201).json({ message: 'Game inserted!' });
    }
}

export default handler;

//This insertsOne game into the gamesCollections, its called from pages/new-game.js
// this is api is used to communicate to the database
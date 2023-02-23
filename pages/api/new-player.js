// /api/new-player
// POST /api/new-player

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

        const gamesCollection = db.collection('players');

        const result = await gamesCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'A new player inserted!' });
    }

    // if (req.method === 'PUT') {
    //     const data = req.body;

    //     const client = await MongoClient.connect(
    //         'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
    //     );
    //     const db = client.db();

    //     const gamesCollection = db.collection('players');

    //     const result = await gamesCollection.updateOne({ _id: data.id }, data);

    //     console.log(result);

    //     client.close();

    //     res.status(201).json({ message: 'A new player inserted!' });
    // }
}

export default handler;

//This insertsOne player into the playersCollections, its called from pages/new-player.js
// this is api is used to communicate to the database
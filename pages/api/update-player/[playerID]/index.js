// /api/new-player
// POST /api/new-player

import { MongoClient, ObjectId } from 'mongodb';

async function handler(req, res) {
    const client = await MongoClient.connect(
        'mongodb+srv://PraimJutla:808808808@cluster0.iueoo0d.mongodb.net/PingPongTrackerDb?retryWrites=true&w=majority'
    );
    const db = client.db();
    const playersCollection = db.collection('players');

    const { playerId } = req.query;
    if (req.method === 'PUT') {
        await playersCollection.updateOne(
            {
                _id: ObjectId(playerId),
            },
            {
                $set: {
                    fullName: req.body.fullName,
                    description: req.body.description,
                    dateOfBirth: req.body.dateOfBirth,
                    image: req.body.image
                }
            }
        );

        res.status(201).json({ message: 'You have updated your player!' });
    }


    client.close();
}


export default handler;


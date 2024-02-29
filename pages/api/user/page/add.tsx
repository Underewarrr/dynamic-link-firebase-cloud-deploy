import clientPromise from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { name } = req.body; 
            const client = await clientPromise;
            const db = client.db("db");
            const collection = db.collection("users");
            const result = await collection.insertOne({ name });
            res.status(201).json({ message: "User page registred", insertedId: result.insertedId });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Somethign when wrong in user page" });
        }
    } else {
        res.status(405).json({ message: "Method not avaliable" });
    }
}

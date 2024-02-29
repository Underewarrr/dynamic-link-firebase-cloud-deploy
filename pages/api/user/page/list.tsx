import clientPromise from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const client = await clientPromise;
            const db = client.db("db");
            const collection = db.collection("users");
            const users = await collection.find({}).toArray(); 
            res.status(200).json(users); 
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Something went wrong while fetching users" });
        }
    } else {
        res.status(405).json({ message: "Method not available" }); 
    }
}

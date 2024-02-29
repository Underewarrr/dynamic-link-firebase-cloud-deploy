import { useState } from 'react';
import clientPromise from "../../../lib/mongodb";
import { GetServerSideProps } from 'next';

interface User {
    _id: string;
    name: string;
}

interface UsersProps {
    users: User[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user/page/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: userName }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            setMessage('Erro ao criar usuário');
        }
    };

    return (
        <div>
            <h1>Add User page</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <h2><a href={`/${user.name}`}>{user.name}</a></h2>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="userName">Nome do usuário:</label>
                <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button type="submit">Criar Usuário</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Users;

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const client = await clientPromise;
        const db = client.db("db");
        const users = await db
            .collection("users")
            .find({})
            .toArray();
        return {
            props: { users: JSON.parse(JSON.stringify(users)) },
        };
    } catch (e) {
        console.error(e);
        return { props: { users: [] } };
    }
};

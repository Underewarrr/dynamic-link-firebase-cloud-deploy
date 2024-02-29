import { useState, useEffect } from 'react';
import clientPromise from "../../../../lib/mongodb";
import { GetServerSideProps } from 'next';

interface User {
    _id: string;
    name: string;
}

interface RecentUsersProps {
    recentUsers: User[];
}

const RecentUsers: React.FC<RecentUsersProps> = ({ recentUsers }) => {
    return (
        <div>
            <h1>Últimos 5 Usuários Registrados</h1>
            <ul>
                {recentUsers.map((user) => (
                    <li key={user._id}>
                        <h2>{user.name}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentUsers;

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await fetch('/api/users/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const recentUsers = await response.json();
        console.log('recent users', recentUsers)
        return {
            props: { recentUsers },
        };
    } catch (e) {
        console.error(e);
        return { props: { recentUsers: [] } };
    }
};

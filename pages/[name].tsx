import { GetServerSideProps } from 'next';
import UserPage from './layout/UserPageLayout';
import clientPromise from "../lib/mongodb";

interface UserNameProps {
  userName: string;
}

const UserName: React.FC<UserNameProps> = ({ userName }) => {
  if (!userName) {
    return <h1>User not found</h1>;
  }

  return <UserPage userName={userName} />;
};

export default UserName;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { name } = params || {};

  if (!name || typeof name !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const client = await clientPromise;
    const db = client.db("db");
    const user = await db.collection("users").findOne({ name });

    if (!user) {
      return {
        notFound: true,
      };
    }

    return {
      props: { userName: name },
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      notFound: true,
    };
  }
};

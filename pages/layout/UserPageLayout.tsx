import { GetServerSideProps } from 'next';
import { useState } from 'react';
import dotenv from 'dotenv'
dotenv.config()

interface UserPageProps {
  userName: string;
}

const UserPage: React.FC<UserPageProps> = ({ userName }) => {
  const [shareLink, setShareLink] = useState('');

  const generateShareLink = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_FIRE_BASE_API_KEY;
      const dynamicLinkDomain = process.env.NEXT_PUBLIC_FIRE_BASE_DYNAMIC_LINK;
      const link = `http://localhost:3000/${userName}`; // Should be genereted with next/link

      
      const response = await fetch(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "dynamicLinkInfo": {
            "domainUriPrefix": `https://${dynamicLinkDomain}`,
            "link": link,
            "androidInfo": {
              "androidPackageName": "com.example.android" 
            },
            "iosInfo": {
              "iosBundleId": "com.example.ios" 
            }
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Short link:', data.shortLink); 
        setShareLink(data.shortLink);
      } else {
        console.error('Failed to generate share link');
      }
    } catch (error) {
      console.error('Error generating share link:', error);
    }
  };

  const shareLinkHandler = () => {
    navigator.clipboard.writeText(shareLink); 
    alert('Link copied to clipboard!'); 
  };

  return (
    <div>
      <h1>This page is for {userName}</h1>
      {shareLink && (
        <div>
          <p>Shareable Link: {shareLink}</p>
          <button onClick={shareLinkHandler}>Share Link</button> 
        </div>
      )}
      <button onClick={generateShareLink}>Generate Shareable Link</button>
    </div>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params || typeof params.name !== 'string') {
    return {
      notFound: true,
    };
  }

  const userName = params.name;

  return {
    props: { userName },
  };
};

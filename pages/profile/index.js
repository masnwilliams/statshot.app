import MatchFeed from "@components/MatchFeed";
import PublicUserProfile from "@components/PublicUserProfile"
import Metatags from "@components/Metatags";
import { getUserWithUsername } from "@lib/firebase";
import { getUserCSRS, getUserMatchList, getUserMultiplayerServiceRecord } from '@lib/helper';
  
export async function getServerSideProps() {

  const username = 'liquidforce134';
  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;

  if (userDoc) {
    user = userDoc.data();
  }

  const matchData = {
    gamertag: username,
    match_count: 25,
    match_offset: 0,
    mode: "matchmade"
  };

  const userSRData = {
    gamertag: username,
    filter: "matchmade:ranked"
  };

  const userCsrData = {
    gamertag: username,
    filter: "matchmade:ranked"
  };

  const matches = await getUserMatchList(matchData);
  const playerSR = await getUserMultiplayerServiceRecord(userSRData);
  const playerCSR = await getUserCSRS(userCsrData);

  return {
    props: { 
      user, 
      matches, 
      playerSR, 
      playerCSR 
    }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ 
  user, 
  matches, 
  playerSR, 
  playerCSR 
}) {

  return (
    <main>
      <Metatags title={user.username} description={`${user.username}'s profile`} />
      Hello {user.displayName}
      <PublicUserProfile playerSR={playerSR} playerCSR={playerCSR} />

      <h2>Recent Matches</h2>

      <MatchFeed matches={matches} />
    </main>
  );
}
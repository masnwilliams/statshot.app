import PublicUserProfile from '@components/PublicUserProfile';
import MatchFeed from '@components/MatchFeed';
import { getUserCSRS, getUserMatchList, getUserMultiplayerServiceRecord } from '@lib/helper';

export async function getServerSideProps({ query }) {
  
  const { username } = query;

  const matchData = {
    gamertag: username,
    match_count: 5,
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
      matches, 
      playerSR, 
      playerCSR 
    }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ 
  matches, 
  playerSR, 
  playerCSR 
}) {
  return (
    <main>
      <PublicUserProfile playerSR={playerSR} playerCSR={playerCSR} />

      <h2>Recent Matches</h2>

      <MatchFeed matches={matches} />
    </main>
  );
}

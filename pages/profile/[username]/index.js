import PublicUserProfile from '@components/PublicUserProfile';
import Metatags from '@components/Metatags';
import MatchFeed from '@components/MatchFeed';
import { getUserCSRS, getUserMatchList, getUserMultiplayerServiceRecord } from '@lib/helper';
import { getAllUsernames } from '@lib/firebase';
import { useContext } from 'react';
import { UserContext } from '@lib/context';

export default function UserProfilePage({ 
  matches, 
  playerSR, 
  playerCSR 
}) {

  const { username } = useContext(UserContext);

  return (
    <main>
      <Metatags title={`${username}'s Profile | StatShot`} description={`${username}'s profile page`} />
      <PublicUserProfile playerSR={playerSR} playerCSR={playerCSR} />
      <h2>Recent Matches</h2>
      <MatchFeed matches={matches} />
    </main>
  );
}

export async function getStaticPaths() {

  const usernames = await getAllUsernames();

  const paths = usernames.map((username) => ({
    params: { username: username.toString() },
  }))

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  
  const { username } = params;

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
      matches, 
      playerSR, 
      playerCSR 
    }, // will be passed to the page component as props
  };
}
import { getUserWithUsername, matchToJSON } from '@lib/firebase';
import UserProfile from '@components/PublicUserProfile';
import Metatags from '@components/Metatags';
import MatchContent from '@components/MatchContent';
import { getMatchDetails } from '@lib/helper';

export async function getServerSideProps({ query }) {
  
  const { id } = query;

  const reqData = {
    match_id: id,
  };

  const preMatch = await getMatchDetails(reqData);
  
  const match = JSON.parse(JSON.stringify(preMatch.data));

  return {
    props: { match }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ match }) {
  return (
    <main>
      <MatchContent match={match} />
    </main>
  );
}

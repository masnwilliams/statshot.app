import MatchContent from '@components/MatchContent';
import { getAllUsernames } from '@lib/firebase';
import { getMatchDataArr, getMatchDetails, getMatchesToBuild, getMatchesToBuild2, getUserMatchList } from '@lib/helper';

export default function MatchPage({ match }) {
  return (
    <main>
      <MatchContent match={match} />
    </main>
  );
}

export async function getStaticPaths() {

  const usernames = await getAllUsernames();

  const matches = await getMatchesToBuild(usernames);

  // console.log(matches);

  const paths = matches.map((match) => ({
    params: { id: match.id },
  }))

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  
  const reqData = {
    match_id: params.id,
  };

  const preMatch = await getMatchDetails(reqData);
  
  const match = JSON.parse(JSON.stringify(preMatch.data));

  return {
    props: { match }, // will be passed to the page component as props
    revalidate: 60,
  };
}
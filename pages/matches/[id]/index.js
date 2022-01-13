import MatchContent from '@components/MatchContent';
import Metatags from '@components/Metatags';
import { getAllUsernames } from '@lib/firebase';
import { getMatchDetails, getMatchesToBuild } from '@lib/helper';
import date from 'date-and-time'

export default function MatchPage({ match }) {

  return (
    <main>
      <Metatags title={`
        [${date.format(new Date(match?.played_at), 'MM/DD/YYYY, h:mm:ss A')}]
        ${match?.details.playlist.properties.ranked ?
       'Ranked' : match?.details.playlist.name}:${match?.details.category.name}
        Match on ${match?.details.map.name}
      `}
       />

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
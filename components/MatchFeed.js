import Link from 'next/link';

export default function MatchFeed({ matches }) {
  return matches.data ? matches.data.map((match) => <MatchItem match={match} key={match.id} />) : null;
}

function MatchItem({ match }) {

  return (
    <div className="card">
      <Link href={`/matches/${match?.id}`}>
        <a>
          <strong>{match?.details.map.name}</strong>
          <h4>
            {
            match?.details.playlist.properties.ranked ? 'Ranked' : 
            match?.details.playlist.name}:{match?.details.category.name
            }
          </h4>
        </a>
      </Link>
    </div>
  );
}

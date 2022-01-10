import Link from 'next/link';
import Image from 'next/image';

// UI component for main match content
export default function MatchContent({ match }) {

  return (
    <div>
      <div className="card">

        <Image 
          src={match?.details.map.asset.thumbnail_url} 
          width={560} 
          height={316} 
          layout='responsive'
          priority />
        <div className="flex">
          <div>
            <h1>{match?.details.map.name}</h1>
            <h3>
              {
              match?.details.playlist.properties.ranked ? 'Ranked' : 
              match?.details.playlist.name}:{match?.details.category.name
              }
            </h3>
          </div>
          <div className="flex">
            <div>
              <h1>{match?.teams.details[0].team.name}</h1>
              <h3>{
                    // Slayer
                    match?.teams.details[0].stats.mode == null ?
                    match?.teams.details[0].stats.core.summary.kills :

                    // Oddball
                    match?.teams.details[0].stats.mode.oddballs ?  
                    match?.teams.details[0].stats.mode.oddballs.possession.ticks :

                    // Stronghold
                    match?.teams.details[0].stats.mode.zones ?  
                    match?.teams.details[0].stats.mode.zones.occupation.ticks :

                    // CTF
                    match?.teams.details[0].stats.mode.flags ?  
                    match?.teams.details[0].stats.mode.flags.captures.total : null
                  }
              </h3>
            </div>
            <div>
              <h1>{match?.teams.details[1].team.name}</h1>
              <h3>{
                    // Slayer
                    match?.teams.details[1].stats.mode == null ?
                    match?.teams.details[1].stats.core.summary.kills :

                    // Oddball
                    match?.teams.details[1].stats.mode.oddballs ?
                    match?.teams.details[1].stats.mode.oddballs.possession.ticks :

                    // Stronghold
                    match?.teams.details[1].stats.mode.zones ?
                    match?.teams.details[1].stats.mode.zones.occupation.ticks :

                    // CTF
                    match?.teams.details[1].stats.mode.flags ?
                    match?.teams.details[1].stats.mode.flags.captures.total : null
                  }
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className='card'>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Team</th>
              <th>Player</th>
              <th>Rating</th>
              <th>Dealt</th>
              <th>Taken</th>
              <th>KDA</th>
              <th>Kills</th>
              <th>Deaths</th>
            </tr>
          </thead>
          <tbody>
            {match.players.map((player) => (
              <tr key={player.gamertag}>
                <td>{player.team.name}</td>
                <td>
                  <Link href={`/profile/${player.gamertag}`}>{player.gamertag}</Link>
                </td>
                <td>
                  {player.progression &&
                    <div>
                      <Image src={player.progression.csr.pre_match.tier_image_url} width={40} height={40} priority={true} /> 
                      <span>{player.progression.csr.pre_match.tier} {player.progression.csr.pre_match.value}</span>
                    </div>
                  }
                  
                </td>
                <td>{player.stats.core.damage.dealt}</td>
                <td>{player.stats.core.damage.taken}</td>
                <td>{Math.round(player.stats.core.kda)}</td>
                <td>{player.stats.core.summary.kills}</td>
                <td>{player.stats.core.summary.deaths}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Initialize lib
const API_VERSION = '@0.3.4';
export const lib = require('lib')({token: process.env.NEXT_PRIVATE_API_KEY});

/**
 * Get Player Match List
 */
export async function getPlayerMatchList(body) {

  const preResult = await 
  lib.halo.infinite[API_VERSION].stats.matches.list({
    gamertag: body.gamertag, // required
    limit: {
      count: body.match_count, // 1-25
      offset: body.match_offset
    },
    mode: body.match_mode // matchmade, custom
  });

  const result = JSON.parse(JSON.stringify(preResult));

  return result;
}

/**
 * Get Match Details
 */
export async function getMatchDetails(body) {

  const result = await 
    lib.halo.infinite[API_VERSION].stats.matches.retrieve({
      id: body.match_id // required
  });

  return result;
}

/**
 * Get Player Multiplayer Service Record
 */
 export async function getPlayerMultiplayerServiceRecord(body) {
  const result = await 
    lib.halo.infinite[API_VERSION].stats['service-record'].multiplayer({
      gamertag: body.gamertag,
      filter: body.filter // matchmade:pvp, matchmade:social, matchmade:ranked, matchmade:bots, custom
  });

  return result;
}

/**
 * Get Player Campaign Service Record
 */
export async function getPlayerCampaignServiceRecord(body) {
  const result = await 
    lib.halo.infinite[API_VERSION].stats['service-record'].campaign({
      gamertag: body.gamertag,
  });

  return result;
}

/**
 * Get Player Appearance
 */
export async function getPlayerAppearance(body) {
  const result = await 
    lib.halo.infinite[API_VERSION].appearance({
      gamertag: body.gamertag
  });

  return result;
}

/**
 * Get Available Medals
 */
export async function getMedals() {
  const result = await 
    lib.halo.infinite[API_VERSION].metadata.medals.list();

  return result;
}

/**
 * Get Player CSRs
 */
export async function getPlayerCSRS(body) {
  const result = await 
    lib.halo.infinite[API_VERSION].stats.csrs({
      gamertag: body.gamertag,
      season: body.season // 1
  });

  return result;
}


//// Match Data Help ////

export async function getMatchesToBuild(usernames) {

  // const usernames = ['liquidforce134', 'gnatsterr', 'lambdapanda13'];

  const matchDataArr = usernames.map((username) => (
    {
      gamertag: username,
      match_count: 25,
      match_offset: 0,
      mode: "matchmade"
    }
  ))

  const Parallelism = 100;
  const asyncBatch = require('async-batch').default;
  const asyncMethod = async (matchData) => { 
    return (await getPlayerMatchList(matchData)).data;
  };

  const matches = await asyncBatch(matchDataArr, asyncMethod, Parallelism);

  return matches.flat();
}
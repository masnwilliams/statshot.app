// Initialize lib
const API_KEY = 'tok_dev_XbjfHFjS26gMwXg2oXbXFsuDdmVGZrcuFsdpV434v77UDMMcaLZoFzAYAVju4ZLy';
const API_VERSION = '@0.3.4';
export const lib = require('lib')({token: API_KEY});

/**
 * Get User Match List
 */
export async function getUserMatchList(body) {
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
 export async function getUserMultiplayerServiceRecord(body) {
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
export async function getUserCampaignServiceRecord(body) {
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
export async function getMedals(body) {
  const result = await 
    lib.halo.infinite[API_VERSION].metadata.medals.list();

  return result;
}

/**
 * Get Player CSRs
 */
export async function getUserCSRS(body) {
  const result = await 
    lib.halo.infinite[API_VERSION].stats.csrs({
      gamertag: body.gamertag,
      season: body.season // 1
  });

  return result;
}


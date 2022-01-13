import useSWR, { SWRConfig, unstable_serialize  } from 'swr'
import { getMatchDetails } from '@lib/helper';

async function fetcher(...args) {
  const [ id ] = args;

  const res = await getMatchDetails(id);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }
f
  return res.json();
}

function Match({ id }) {
  const { data, error } = useSWR(id, fetcher)
  return <h1>{data}</h1>
}

export default function MatchPage({ id }, { fallback }) {
  // SWR hooks inside the `SWRConfig` boundary will use those values.

  return (
    <SWRConfig value={{ fallback }}>
      <Match id={id}/>
    </SWRConfig>
  )
}

export async function getStaticProps({ params }) {

  const preMatch = await getMatchDetails(params.id);
  
  const match = JSON.parse(JSON.stringify(preMatch.data));

  const id = params.id;

  return {
    props: {
      id,
      fallback: {
        [unstable_serialize(['api', 'stats', 'matches', 'retrieve', id])]: id
      }
    }
  };
}

export async function getStaticPaths() {

  const paths = [];

  return { paths, fallback: 'blocking' };
}
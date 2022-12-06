import { GetStaticPaths, GetStaticProps } from 'next'
import {
  ModernWarfare,
  platforms,
  Warzone,
  Vanguard,
  ColdWar,
} from 'call-of-duty-api'
import { Game, Platform } from '../../../../types/general'

const UserProfilePage = ({ gameData }: any) => {
  const { data } = gameData
  return (
    <>
      <div>
        <h1>{data.username}</h1>
        <h1>
          Lifetime Shot Accuracy:
          {data.lifetime.all.properties.accuracy.toFixed(4) * 100}%
        </h1>
        <h1>Lifetime K/D: {data.lifetime.all.properties.kdRatio.toFixed(2)}</h1>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const game = String(params?.game) as Game
  const gamertag = String(params?.gamertag)
  const platform = String(params?.platform) as Platform as platforms

  const codGameDictionary = new Map<Game, any>()
  codGameDictionary.set('wz', Warzone)
  codGameDictionary.set('mw', ModernWarfare)
  // codGameDictionary.set('mw2', ModernWarfare2)
  codGameDictionary.set('cw', ColdWar)
  codGameDictionary.set('vg', Vanguard)

  try {
    let gameData = await codGameDictionary
      .get(game)
      .fullData(gamertag, platform)

    return {
      props: {
        gameData,
        revalidate: 60 * 5, // revalidate every 5 minutes
      },
    }
  } catch (error) {
    //Handle Exception
    console.error(error)
  }

  return {
    notFound: true,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    // Overwrite to prebuild 0 paths
    paths: [],
    fallback: 'blocking',
  }
}

export default UserProfilePage

import { useRouter } from 'next/router'
import { useState } from 'react'
import { Game, Platform } from '../types/general'
import { gameList, platformList } from '@lib/const'
import LoadingDots from '@components/LoadingDots'

const Navbar = () => {
  const router = useRouter()
  const [game, setGame] = useState<Game>((router.query.game as Game) || 'wz')
  const [gamertag, setGamertag] = useState(router.query.gamertag || '')
  const [platform, setPlatform] = useState<Platform>(
    (router.query.platform as Platform) || 'xbl'
  )

  return (
    <div className="flex items-center justify-center">
      <select
        name="game"
        id="game"
        onChange={(e) => setGame(e.target.value as unknown as Game)}
        value={game}
      >
        {gameList.map((game) => (
          <option key={game.slug} value={game.slug}>
            {game.name}
          </option>
        ))}
      </select>
      <input
        id="gamertag"
        className="bg-gray-200 px-5 py-2"
        type="text"
        placeholder="Search gamertag..."
        onChange={(e) => setGamertag(e.target.value)}
        value={gamertag}
      />
      <select
        name="platform"
        id="platform"
        onChange={(e) => setPlatform(e.target.value as unknown as Platform)}
        value={platform}
      >
        {platformList.map((platform) => (
          <option key={platform.slug} value={platform.slug}>
            {platform.name}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-900"
        type="button"
        onClick={async () =>
          await router.push(`/cod/${game}/${gamertag}/${platform}`)
        }
      >
        Search
      </button>
    </div>
  )
}

export default Navbar

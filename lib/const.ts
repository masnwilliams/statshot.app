import { Game, Platform } from '../types/general'

export const gameList: { name: string; slug: Game }[] = [
  {
    name: 'Warzone',
    slug: 'wz',
  },
  {
    name: 'Modern Warfare',
    slug: 'mw',
  },
  // {
  //   name: 'Modern Warfare 2',
  //   slug: 'mw2',
  // },
  {
    name: 'Cold War',
    slug: 'cw',
  },
  {
    name: 'Vanguard',
    slug: 'vg',
  },
]

export const platformList: { name: string; slug: Platform }[] = [
  {
    name: 'Xbox',
    slug: 'xbl',
  },
  {
    name: 'Playstation',
    slug: 'psn',
  },
  {
    name: 'Activision',
    slug: 'acti',
  },
  {
    name: 'Battle.net',
    slug: 'battle',
  },
  // {
  //   name: 'Steam',
  //   slug: 'steam',
  // },
  {
    name: 'Battle.net #',
    slug: 'uno',
  },
]

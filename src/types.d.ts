declare module 'gatsby-plugin-transition-link/AniLink' // at this time this library completely lacks types

export interface Creature {
  name: string
  town: string
  level: number
  upgrade: 'Base' | 'Upgraded'
  cost: number
  population: number
  health: number
  attack: number
  defense: number
  minDamage: number
  maxDamage: number
  speed: number
  movement: 'Ground' | 'Flying' | 'Teleporting'
  size: number
  shots: number
  specials: string[]
  description?: string
}

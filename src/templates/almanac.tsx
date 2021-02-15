import './almanac.scss'

import { FC, ReactNode, useState } from 'react'
import { Helmet } from 'react-helmet'

import Search from '../components/filters/Search'
import Layout from '../components/layout'
import creatures from '../data/creatures.json'
import portraitLocations from '../data/portraitlocations.json'
import gold from '../images/gold.png'
import { Creature } from '../types.d'

type AlmanacItem = Creature

const getItemRenderMethod = (item: AlmanacItem): ReactNode => {
  switch (true) {
    case !!item.attack && !!item.defense:
      return renderCreature(item)

    default:
      return renderCreature
  }
}

const renderCreature = (creature: Creature) => {
  const portraitLocation = portraitLocations.find(
    (item) => item.name === creature.name
  )

  const {
    name,
    level,
    upgrade,
    cost,
    speed,
    attack,
    defense,
    population,
    health,
    minDamage,
    maxDamage,
    town,
    movement,
    shots,
  } = creature

  return (
    <div className="almanac-item creature">
      <div className="card">
        <div
          className="portrait"
          style={{
            backgroundPosition: portraitLocation.position,
          }}
        />
        <i className="game-icon game-icon-evil-minion"></i>

        <div>
          Level {level}
          {upgrade !== 'Base' && '+'}
        </div>

        <div>Creature</div>
      </div>
      <div>
        <h4>{name}</h4>

        <i className="stats">
          <div>Town: {town}</div>
          <div>
            Cost: {cost}{' '}
            <img src={gold} className="resource" alt="stack of coins" />
          </div>
          <div>Weekly Population: {population}</div>
          <div>Hit Points: {health}</div>
          <div>Attack: {attack}</div>
          <div>Defense: {defense}</div>
          <div>
            Damage: {minDamage} - {maxDamage}
          </div>
          <div>Speed: {speed}</div>
        </i>

        <div>
          The {name} is a level {level} {upgrade !== 'Base' && 'upgraded'}{' '}
          {town} {movement !== 'Ground' && movement.toLocaleLowerCase()}{' '}
          creature{!!shots ? ' with a ranged attack' : ''}.
        </div>
      </div>
    </div>
  )
}

const Almanac: FC = () => {
  const items = [...creatures].sort((a, b) => (a.name > b.name ? 1 : -1))

  const [filteredItems, setFilteredItems] = useState(items)

  const onSearch = (value: string) => {
    const searchValue = value.toLocaleLowerCase()

    setFilteredItems(
      items.filter((item) => {
        switch (true) {
          case item.name.toLocaleLowerCase().includes(searchValue):
            return true

          case item.town && item.town.toLocaleLowerCase().includes(searchValue):
            return true

          case item.specials &&
            !!item.specials.filter((special) => special.includes(searchValue))
              .length:
            return true

          case searchValue.includes('level') &&
            item.level === parseInt(searchValue.replace('level', '')):
            return true

          default:
            return false
        }
      })
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>The Dragon Utopia | Almanac</title>
      </Helmet>
      <div className="dummy-header">
        <article>
          {/* Filters */}
          <Search
            onSearch={onSearch}
            description="Type in any search criteria for example 'fortress' or 'elemental' or 'fireball'"
          />
        </article>
      </div>
      <article>
        {filteredItems.map((item) => getItemRenderMethod(item))}
      </article>
    </Layout>
  )
}

export default Almanac

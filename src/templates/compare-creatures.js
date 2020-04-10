import { AnimatePresence, motion } from 'framer-motion'
import { graphql } from 'gatsby'
import React, { useEffect, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table'

import CheckboxFilter from '../components/filters/CheckboxFilter'
import Layout from '../components/layout'
import spriteLocations from '../data/spritelocations.json'
import creatures from '../data/units.json'
import crystal from '../images/crystal.png'
import flying from '../images/flying.png'
import gem from '../images/gem.png'
import gold from '../images/gold.png'
import mercury from '../images/mercury.png'
import shooter from '../images/shooter.png'
import sulfur from '../images/sulfur.png'

const resourceImgs = {
  gem,
  mercury,
  crystal,
  sulfur
}

const checkboxFilter = (rows, id, filterValue) => {
  return rows.filter(row => {
    const rowValue = row.values[id]

    return filterValue.includes(rowValue)
  })
}

const CompareCreaturesTemplate = ({ data }) => {
  const { title, description } = data.strapiCompareCreatures

  const spring = useMemo(
    () => ({
      type: 'spring',
      damping: 50,
      stiffness: 100
    }),
    []
  )

  const creaturesData = useMemo(() => creatures, [])

  const defaultColumns = useMemo(
    () => [
      {
        Header: 'Creature',
        accessor: 'name',
        Footer: info => {
          return <>Average:</>
        }
      },
      { Header: 'Town', accessor: 'town', filter: checkboxFilter },
      {
        Header: 'Level',
        accessor: 'level',
        filter: checkboxFilter
      },
      {
        Header: 'Upgrade',
        accessor: 'upgrade',
        filter: checkboxFilter
      },
      {
        Header: 'Cost',
        accessor: 'cost',
        Footer: info => {
          const average = React.useMemo(
            () =>
              Math.round(
                info.rows.reduce((sum, row) => row.values.cost + sum, 0) /
                  info.rows.length
              ),
            [info.rows]
          )

          return (
            <>
              <img src={gold} className="resource" alt="stack of coins" />{' '}
              {average}
            </>
          )
        }
      },
      {
        Header: 'P/Week',
        accessor: 'population',
        Footer: info => {
          const average = React.useMemo(
            () =>
              Math.round(
                info.rows.reduce((sum, row) => row.values.population + sum, 0) /
                  info.rows.length
              ),
            [info.rows]
          )

          return <>{average}</>
        }
      },
      {
        Header: 'HP',
        accessor: 'health',
        Footer: info => {
          const average = React.useMemo(
            () =>
              Math.round(
                info.rows.reduce((sum, row) => row.values.health + sum, 0) /
                  info.rows.length
              ),
            [info.rows]
          )

          return <>{average}</>
        }
      },
      {
        Header: 'Att',
        accessor: 'attack',
        Footer: info => {
          const average = React.useMemo(
            () =>
              Math.round(
                info.rows.reduce((sum, row) => row.values.attack + sum, 0) /
                  info.rows.length
              ),
            [info.rows]
          )

          return <>{average}</>
        }
      },
      {
        Header: 'Def',
        accessor: 'defense',
        Footer: info => {
          const average = React.useMemo(
            () =>
              Math.round(
                info.rows.reduce((sum, row) => row.values.defense + sum, 0) /
                  info.rows.length
              ),
            [info.rows]
          )

          return <>{average}</>
        }
      },
      {
        Header: 'Dmg',
        accessor: 'maxDamage'
      },
      {
        Header: 'Spd',
        accessor: 'speed',
        Footer: info => {
          const average = React.useMemo(
            () =>
              Math.round(
                info.rows.reduce((sum, row) => row.values.speed + sum, 0) /
                  info.rows.length
              ),
            [info.rows]
          )

          return <>{average}</>
        }
      },
      { Header: 'Specials', accessor: 'specials' }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    columns,
    rows,
    prepareRow,
    footerGroups,
    setGlobalFilter
  } = useTable(
    {
      columns: defaultColumns,
      data: creaturesData
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  )

  useEffect(() => {
    columns.find(column => column.id === 'upgrade').toggleHidden()
    columns.find(column => column.id === 'town').toggleHidden()
  }, [])

  return (
    <Layout>
      <h1>{title}</h1>
      <ReactMarkdown source={description} />

      {/* Filters */}
      <div className="filters">
        <label htmlFor="global-search">
          <div>
            <strong>Search</strong>
          </div>
          <input
            id="global-search"
            value={state.globalFilter || ''}
            onChange={e => {
              setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder="Type anything..."
          />
        </label>
      </div>
      <div className="filters">
        <CheckboxFilter
          column={columns.find(column => column.id === 'level')}
        />
        <CheckboxFilter column={columns.find(column => column.id === 'town')} />
        <CheckboxFilter
          column={columns.find(column => column.id === 'upgrade')}
        />
      </div>

      {/* Table */}

      <div className="tableWrap">
        <table {...getTableProps()} className="compare-table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            <AnimatePresence>
              {rows.map(row => {
                prepareRow(row)

                return (
                  <motion.tr
                    {...row.getRowProps({
                      layoutTransition: spring,
                      exit: { opacity: 0, maxHeight: 0 }
                    })}
                    className={`${row.original.town}${
                      row.original.upgrade === 'Upgraded' ? ' upgraded' : ''
                    }`}
                  >
                    {row.cells.map(cell => {
                      const ratings =
                        typeof cell.value === 'number' &&
                        cell.column.id !== 'level'
                          ? rows.map(row => row.values[cell.column.id])
                          : false

                      const spriteLocation = spriteLocations.find(
                        item => item.name === cell.value
                      )

                      // Cell render
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={
                            !!ratings && cell.value === Math.max(...ratings)
                              ? `${cell.column.id === 'cost' ? 'min' : 'max'}`
                              : !!ratings && cell.value === Math.min(...ratings)
                              ? `${cell.column.id === 'cost' ? 'max' : 'min'}`
                              : ''
                          }
                        >
                          {cell.column.id === 'name' && spriteLocation && (
                            <div
                              className="creature"
                              style={{
                                backgroundPosition: spriteLocation.position
                              }}
                            ></div>
                          )}
                          {cell.column.id === 'cost' && (
                            <img
                              src={gold}
                              className="resource"
                              alt="stack of coins"
                            />
                          )}{' '}
                          {cell.column.id === 'maxDamage' &&
                            cell.row.original.minDamage &&
                            `${cell.row.original.minDamage}-`}
                          {Array.isArray(cell.value) &&
                          cell.value.length > 1 ? (
                            <ul>
                              {cell.value.map((item, index) => (
                                <li
                                  key={`${cell.row.original.name}-special-${index}`}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            cell.render('Cell')
                          )}
                          {cell.column.id === 'cost' &&
                            cell.row.original.extraCost && (
                              <div
                                style={{
                                  display: 'inline-block'
                                }}
                              >
                                {' '}
                                <img
                                  src={
                                    resourceImgs[
                                      cell.row.original.extraCost.resource
                                    ]
                                  }
                                  className="resource"
                                  alt="extra resource"
                                />
                                {` ${cell.row.original.extraCost.value}`}
                              </div>
                            )}
                          {cell.column.id === 'population' &&
                            cell.row.original.bonusPopulation && (
                              <span>
                                {' '}
                                + {cell.row.original.bonusPopulation}
                              </span>
                            )}
                          {cell.column.id === 'name' &&
                            cell.row.original.shots && (
                              <span>
                                {' '}
                                <img
                                  src={shooter}
                                  className="resource"
                                  title={`Creature has a ranged attack, with ${cell.row.original.shots} shots`}
                                  alt="ranged attack"
                                ></img>{' '}
                                <sup>{cell.row.original.shots}</sup>
                              </span>
                            )}
                          {cell.column.id === 'name' &&
                            cell.row.original.movement === 'flying' && (
                              <span>
                                {' '}
                                <img
                                  src={flying}
                                  className="resource"
                                  title="Creature can move over obstacles."
                                  alt="unit can move beyond obstacles"
                                ></img>
                              </span>
                            )}
                        </td>
                      )
                    })}
                  </motion.tr>
                )
              })}
            </AnimatePresence>
          </tbody>
          <tfoot>
            {footerGroups.map(group => (
              <tr {...group.getFooterGroupProps()}>
                {group.headers.map(column => (
                  <td {...column.getFooterProps()}>
                    {column.render('Footer')}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </Layout>
  )
}

export default CompareCreaturesTemplate

export const query = graphql`
  query CompareCreaturesTemplate {
    strapiCompareCreatures {
      title
      description
    }
  }
`

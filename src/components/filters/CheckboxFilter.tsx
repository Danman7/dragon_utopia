import { motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'

import Button from '../button'

interface CheckboxProps {
  column: {
    Header: string
    preFilteredRows: { values: [] }[]
    id: number
    filterValue: (string | number)[]
    setFilter: (value: string | number) => void
  }
  isToggle?: boolean
}

const CheckboxFilter = ({ column, isToggle }: CheckboxProps) => {
  const { preFilteredRows, id, filterValue, setFilter, Header } = column

  const allOptions = isToggle
    ? ['Yes', 'No']
    : useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach((row) => {
          options.add(row.values[id])
        })
        return [...options.values()]
      }, [id, preFilteredRows])

  const setCheckboxFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    const updatedValue =
      Header === 'Town' ||
      Header === 'Upgrade' ||
      Header === 'Ranged' ||
      Header === 'Movement'
        ? value
        : parseInt(value, 10)

    if (!filterValue) {
      setFilter([updatedValue])
    } else {
      setFilter(
        checked
          ? [...filterValue, updatedValue]
          : filterValue.filter((item) => item !== updatedValue)
      )
    }
  }

  useEffect(() => {
    setFilter(allOptions)
  }, [])

  return (
    <div className="checkbox-group">
      <div>
        <div className="lead">
          {column.Header}{' '}
          {!isToggle && allOptions.length > 2 && (
            <>
              <Button onClick={() => setFilter(allOptions)}>Select All</Button>{' '}
              <Button onClick={() => setFilter([])}>Select None</Button>
            </>
          )}
        </div>
      </div>
      <div className="checkbox-items">
        {allOptions.map((option) => (
          <div key={`option-checkbox-${option}`} className="checkbox-item">
            <label htmlFor={`option-${option}`} className="checkbox-container">
              {option}
              <input
                id={`option-${option}`}
                type="checkbox"
                checked={filterValue ? filterValue.includes(option) : true}
                value={option}
                onChange={setCheckboxFilter}
              />
              <div className="switch-wrapper">
                <div
                  className="switch"
                  data-ison={filterValue ? filterValue.includes(option) : true}
                >
                  <motion.div
                    className="handle"
                    layout
                    transition={{
                      type: 'spring',
                      stiffness: 700,
                      damping: 20,
                    }}
                  />
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckboxFilter

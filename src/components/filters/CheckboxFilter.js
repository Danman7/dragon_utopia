import { motion } from 'framer-motion'
import React, { useEffect, useMemo } from 'react'

import Button from '../../components/button'

const CheckboxFilter = ({ column }) => {
  const { preFilteredRows, id, filterValue, setFilter } = column

  const allOptions = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  const setCheckboxFilter = (e) => {
    const { value, checked } = e.target

    const updatedValue =
      column.Header === 'Town' || column.Header === 'Upgrade'
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
        <h5>
          {column.Header}{' '}
          <Button onClick={() => setFilter(allOptions)}>Select All</Button>{' '}
          <Button onClick={() => setFilter([])}>Select None</Button>
        </h5>
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

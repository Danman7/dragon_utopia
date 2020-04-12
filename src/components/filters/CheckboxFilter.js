import React, { useEffect, useMemo } from 'react'

export default ({ column }) => {
  const { preFilteredRows, id, filterValue, setFilter } = column

  const allOptions = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  const setCheckboxFilter = e => {
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
          : filterValue.filter(item => item !== updatedValue)
      )
    }
  }

  useEffect(() => {
    setFilter(allOptions)
  }, [])

  return (
    <div>
      <div>
        <strong>{column.Header}</strong>
      </div>
      {allOptions.map(level => (
        <div
          key={`level-checkbox-${level}`}
          style={{ display: 'inline-block', marginRight: 5 }}
        >
          <label htmlFor={`level-${level}`}>
            <input
              id={`level-${level}`}
              type="checkbox"
              checked={filterValue ? filterValue.includes(level) : true}
              value={level}
              onChange={setCheckboxFilter}
            />{' '}
            {level}
          </label>{' '}
        </div>
      ))}
      <div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setFilter([])}
        >
          None
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setFilter(allOptions)}
        >
          All
        </button>
      </div>
    </div>
  )
}

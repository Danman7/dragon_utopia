import React, { useState } from 'react'

export default ({ onSearch }) => {
  const [search, setSearch] = useState('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onSearch(search)
      }}
    >
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button
            className="btn btn-secondary"
            type="button"
            id="button-addon1"
            onClick={e => onSearch(search)}
          >
            Search
          </button>
        </div>
        <input
          className="form-control"
          id="global-search"
          value={search || ''}
          onChange={e => setSearch(e.target.value)}
          placeholder="Type anything and hit Enter..."
        />
      </div>
    </form>
  )
}

import React, { useState } from 'react'

export default ({ onSearch }) => {
  const [search, setSearch] = useState('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onSearch(search)
      }}
      className="searchbar"
    >
      <input
        id="global-search"
        type="text"
        value={search || ''}
        onChange={e => setSearch(e.target.value)}
        placeholder="Type any search criteria..."
      />
      <input type="submit" value="Search for creature" />
    </form>
  )
}

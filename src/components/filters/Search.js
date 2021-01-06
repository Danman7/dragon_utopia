import { useState } from 'react'

import Button from '../button'

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSearch(search)
      }}
      className="searchbar"
    >
      <input
        id="global-search"
        type="text"
        value={search || ''}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type any search criteria..."
      />
      <Button isSubmit>Search for creature</Button>
    </form>
  )
}

export default Search

import { useState } from 'react'

import Button from '../button'

const Search = ({
  onSearch,
  description,
}: {
  onSearch: (search: string) => void
  description?: string
}) => {
  const [search, setSearch] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSearch(search)
      }}
      className="searchbar"
    >
      <div>
        <input
          id="global-search"
          type="text"
          value={search || ''}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={'Searching for...'}
        />
        <Button isSubmit>Search for creature</Button>
      </div>
      <small>{description}</small>
    </form>
  )
}

export default Search

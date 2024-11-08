import { useEffect, useRef } from 'react'

type Props = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({ query, setQuery }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchRef}
    />
  )
}

export default Search

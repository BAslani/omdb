import { useEffect, useState } from 'react'
import Box from './components/Box'
import Logo from './components/Logo'
import Main from './components/Main'
import MovieList from './components/MovieList'
import Navbar from './components/Navbar'
import Search from './components/Search'
import SearchNumResults from './components/SearchNumResults'
import WatchedMoviesList from './components/WatchedMoviesList'
import WatchedSummary from './components/WatchedSummary'
import Loader from './components/Loader'
import MovieDetails from './components/MovieDetails'
import { useMovies } from './hooks/useMovies'
import { WatchedMovieType } from './types/types'

export default function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [watched, setWatched] = useState<WatchedMovieType[]>(() => {
    return JSON.parse(localStorage.getItem('watched') || '[]')
  })

  const { movies, isLoading, error } = useMovies({ query })

  function handleMovieSelect(id: string) {
    setSelectedId((currId) => (currId === id ? '' : id))
  }

  function handleAddWatched(movie: WatchedMovieType) {
    setWatched((watched) => [...watched, movie])
  }

  function handleRemoveWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  function handleCloseSelectedMovie() {
    setSelectedId('')
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <SearchNumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
          )}
          {error && <p className='error'>{error}</p>}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseSelectedMovie={handleCloseSelectedMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}

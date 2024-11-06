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

export type MovieType = {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export type WatchedMovieType = {
  imdbID: string
  title: string
  year: string
  poster: string
  runtime: number
  imdbRating: number
  userRating: number
}

const apiKey = import.meta.env.VITE_API_KEY

export default function App() {
  const [movies, setMovies] = useState([])
  const [watched, setWatched] = useState<WatchedMovieType[]>([])
  const [query, setQuery] = useState('')
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState('')

  const handleMovieSelect = (id: string) => {
    setSelectedId((currId) => (currId === id ? '' : id))
  }

  const handleAddWatched = (movie: WatchedMovieType) => {
    setWatched((watched) => [...watched, movie])
  }

  const handleRemoveWatched = (id: string) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  const handleCloseSelectedMovie = () => {
    setSelectedId('')
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        setError('')
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
        )

        if (!res.ok) throw new Error('Something went wrong')

        const data = await res.json()

        if (data.Response === 'False') throw new Error('No results found')

        setMovies(data.Search)
        setIsLoading(false)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (query.length < 2) {
      setMovies([])
      setError('')
      return
    }
    fetchMovies()
  }, [query])

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <SearchNumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
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

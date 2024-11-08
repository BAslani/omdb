import { useEffect, useState } from 'react'
import StarsRating from './StarsRating'
import Loader from './Loader'
import { WatchedMovieType } from '../types/types'
import { useKey } from '../hooks/useKey'

type Props = {
  selectedId: string
  onCloseSelectedMovie: () => void
  onAddWatched: (movie: WatchedMovieType) => void
  watched: WatchedMovieType[]
}

const apiKey = import.meta.env.VITE_API_KEY

const MovieDetails = ({
  selectedId,
  onCloseSelectedMovie,
  onAddWatched,
  watched,
}: Props) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState(0)

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find(
    (m) => m.imdbID === selectedId
  )?.userRating

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie as {
    Title: string
    Poster: string
    Runtime: string
    Year: string
    imdbRating: string
    Plot: string
    Released: string
    Actors: string
    Director: string
    Genre: string
  }

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(' ')[0]),
      imdbRating: Number(imdbRating),
      userRating,
    }
    onAddWatched(newWatchedMovie)
    onCloseSelectedMovie()
  }

  useKey('Escape', onCloseSelectedMovie)

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true)
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
      )
      const data = await res.json()
      setMovie(data)
      setIsLoading(false)
    }
    getMovieDetails()
  }, [selectedId])

  useEffect(() => {
    if (!title) return
    document.title = `Movie | ${title}`

    return () => {
      document.title = 'popcorn'
    }
  }, [title])

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseSelectedMovie}>
              &larr;
            </button>
            <img src={poster} alt='movie poster' />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {isWatched ? (
                <>
                  <p>
                    You have already rated this movie {watchedUserRating}
                    <span>⭐</span>
                  </p>
                </>
              ) : (
                <>
                  <StarsRating
                    onSetRating={setUserRating}
                    maxRating={10}
                    size={24}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  )
}

export default MovieDetails

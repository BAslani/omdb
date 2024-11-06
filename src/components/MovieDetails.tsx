import { useEffect, useState } from 'react'
import StarsRating from './StarsRating'
import Loader from './Loader'

type Props = {
  selectedId: string
  onCloseSelectedMovie: () => void
}

const apiKey = import.meta.env.VITE_API_KEY

const MovieDetails = ({ selectedId, onCloseSelectedMovie }: Props) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState(0)

  const {
    Title: title,
    Poster: poster,
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
    imdbRating: string
    Plot: string
    Released: string
    Actors: string
    Director: string
    Genre: string
  }

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

  console.log('User Rating: ', userRating)

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
              <StarsRating
                onSetRating={setUserRating}
                maxRating={10}
                size={24}
              />
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

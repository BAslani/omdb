import { MovieType } from '../App'

type Props = {
  movie: MovieType
  onMovieSelect: (id: string) => void
}

const Movie = ({ movie, onMovieSelect }: Props) => {
  return (
    <li onClick={() => onMovieSelect(movie.imdbID)} className='movie'>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

export default Movie

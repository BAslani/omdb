import { MovieType } from '../App'
import Movie from './Movie'

type Props = {
  movies: MovieType[]
  onMovieSelect: (id: string) => void
}

const MovieList = ({ movies, onMovieSelect }: Props) => {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onMovieSelect={onMovieSelect} />
      ))}
    </ul>
  )
}

export default MovieList

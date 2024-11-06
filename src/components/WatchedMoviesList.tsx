import { WatchedMovieType } from '../App'
import WatchedMovie from './WatchedMovie'

type Props = {
  watched: WatchedMovieType[]
}

const WatchedMoviesList = ({ watched }: Props) => {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  )
}

export default WatchedMoviesList

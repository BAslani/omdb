import { WatchedMovieType } from '../App'
import WatchedMovie from './WatchedMovie'

type Props = {
  watched: WatchedMovieType[]
  onRemoveWatched: (id: string) => void
}

const WatchedMoviesList = ({ watched, onRemoveWatched }: Props) => {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onRemoveWatched={onRemoveWatched}
        />
      ))}
    </ul>
  )
}

export default WatchedMoviesList

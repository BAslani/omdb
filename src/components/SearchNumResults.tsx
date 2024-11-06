import { MovieType } from '../App'

type Props = {
  movies: MovieType[]
}

const SearchNumResults = ({ movies }: Props) => {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

export default SearchNumResults

import { useEffect, useState } from 'react'

type Args = {
  query: string
}

const apiKey = import.meta.env.VITE_API_KEY

export function useMovies({ query }: Args) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        setError('')
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
          { signal: controller.signal }
        )

        if (!res.ok) throw new Error('Something went wrong')

        const data = await res.json()

        if (data.Response === 'False') throw new Error('No results found')

        setMovies(data.Search)
        setIsLoading(false)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.name !== 'AbortError') setError(error.message)
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

    return () => {
      controller.abort()
    }
  }, [query])

  return { movies, isLoading, error }
}

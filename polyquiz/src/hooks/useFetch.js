import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
//le useEffect sert
  useEffect(() => {
    let isCancelled = false

    setLoading(true)
    setError(null)

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`)
        return res.json()
      })
      .then(json => {
        if (!isCancelled) {
          setData(json)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!isCancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { isCancelled = true }
  }, [url])

  return { data, loading, error }
}

export default useFetch
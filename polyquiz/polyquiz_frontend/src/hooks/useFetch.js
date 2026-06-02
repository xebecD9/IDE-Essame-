import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function useFetch(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!url) return

    let isCancelled = false
    const token = localStorage.getItem('polyquiz_token')
    const headers = { 'Content-Type': 'application/json' }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    setLoading(true)
    setError(null)

    fetch(url.startsWith('http') ? url : `${API_URL}${url}`, { headers })
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
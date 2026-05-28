import { useState, useEffect } from 'react'

function useFetch(url) {
  // Les 3 états internes du hook
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    // Permet d'annuler la requête si le composant est démonté avant la fin
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

    // Cleanup : évite les mises à jour d'état sur un composant démonté
    return () => { isCancelled = true }
  }, [url]) // Se re-déclenche si l'URL change

  // Retourne un objet : le composant destructure ce dont il a besoin
  return { data, loading, error }
}

export default useFetch
import { useEffect, useState } from 'react'

export const useDagStorage = () => {
  const [dagStorage, setDagStorage] = useState('')

  const setlocalStorage = (dagData: string) => {
    window.localStorage.setItem('dagData', dagData)
    setDagStorage(dagData)
  }

  useEffect(() => {
    const localDagStorage = window.localStorage.getItem('dagData') // could be null
    localDagStorage && setDagStorage(localDagStorage)
  })

  return { dagStorage, setlocalStorage }
}

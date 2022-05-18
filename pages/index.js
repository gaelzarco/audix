import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [ data, setData ] = useState('')

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [data.name])

  return (
    <div className={styles.container}>
      <h1>NEXT.JS AUDIX</h1>
      {data.name}
    </div>
  )
}

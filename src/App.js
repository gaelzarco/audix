import './App.css';
import { useEffect, useState } from 'react'

import Search from './components/Search';

export default function App() {
  const [ data, setData ] = useState([])
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    if (search) {
      document.title=`${search} on Audix`
      const fetchData = async () => {
        const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
        console.log(response)
        const resData = await response.json()
        console.log(resData)
        if(!resData.results.length) {
          return console.log('data not found')
        }
        setData(resData.results)
        console.log(resData.results)
      }
      fetchData()
    }
  }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  return (
    <div className='styles.main'>
      <div className='styles.header'>
        <h1 id='styles.audix'>Audix</h1>
      </div>
      <div id='styles.search'>
        <Search handleSearch={handleSearch} />
      </div>
    </div>
  );
}

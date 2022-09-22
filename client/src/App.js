import './App.css';
import { useEffect, useState } from 'react'

import Dropdown from './components/Dropdown';
import Credentials from './components/Credentials';

export default function App() {

  const [ data, setData ] = useState('')

  useEffect(() => {
    fetch('/user')
    .then(res => res.json())
    .then(resData => setData(resData))
  }, [])

  return (
    <div className="main">
      <h1>Audix</h1>
      <h1>{data.message}</h1>
    </div>
  )

  // const spotify = Credentials()
  // const userCred = spotify.ClientId + ':' + spotify.ClientSecret

  // const data = [
  //   {value: 1, name: 'A'},
  //   {value: 1, name: 'A'},
  //   {value: 1, name: 'A'}
  // ]

  // const [ token, setToken ] = useState('')

  // useEffect(() => {

  //   axios('https://accounts.spotify.com/api/token', {
  //     headers: {
  //       'Content-Type' : 'application/x-www-form-urlencoded',
  //       'Authorization' : 'Basic' + userCred.toString('base64')
  //     },
  //     body: 'grant_type=client_credentials',
  //     method: 'POST'
  //   })
  //   .then(tokenResponse => {
  //     console.log(tokenResponse.data.access_token)
  //     setToken(tokenResponse.data.access_token)
  //   })

  // }, [])

  // return (
  //   <form onSubmit={() => {}}>
  //     <div className='main'>
  //     <Dropdown options={data}/>
  //     <Dropdown options={data}/>
  //     <button type='submit'>
  //       Search
  //     </button>
  //   </div>
  //   </form>
  // );
}

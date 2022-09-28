import './App.css';
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Profile from './components/Profile';

import { getAccessToken } from './spotify';

export default function App() {

  const [ access_token, setAccessToken ] = useState('')

  const [ searchParams ] =  useSearchParams()
  let accessToken = searchParams.get('access_token')
  let refreshToken = searchParams.get('refresh_token')

  useEffect(() => {
    setAccessToken(getAccessToken(accessToken, refreshToken))
  }, [accessToken, refreshToken])

  console.log(access_token)

  return (
    <div className='app'>
        {access_token ? <Profile /> : <LandingPage />}
    </div>
  )
  }
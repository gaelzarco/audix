import { useEffect, useState } from 'react'

import { token } from './spotify';

import LandingPage from './components/LandingPage';
import Profile from './components/Profile';

export default function App() {

  const [ accessToken, setAccessToken ] = useState(null)

  useEffect(() => {
    setAccessToken(token)
  }, [])

  return (
    <div className='app'>
        { accessToken !== 'undefined' && accessToken ? <Profile /> : <LandingPage />}
    </div>
  )
  }
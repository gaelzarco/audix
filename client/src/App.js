import { useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Profile from './components/Profile';

import { UserContext } from './context/userContext';

export default function App() {

  const [ token ] = useSearchParams()
  const [ user, setUser ] = useContext(UserContext)

  useEffect(() => {
    const aToken = token.get('access_token')
    const rToken = token.get('refresh_token')

    if (aToken && rToken) {
      setUser((user) => ({ ...user, accessToken: aToken, refreshToken: rToken }))
    }
  }, [token, setUser])

  return (
    <div className='app'>
        { user.accessToken !== null ? <Profile /> : <LandingPage />}
    </div>
  )
  }
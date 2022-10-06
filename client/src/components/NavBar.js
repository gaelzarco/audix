import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UserContext } from "../context/userContext"

export default function NavBar() {

    const [ user, setUser ] = useContext(UserContext)
    const navigate = useNavigate()

    const logout = () => {
        setUser((user) => ({...user, accessToken: null, refreshToken: null}))
        console.log(user)
        navigate('/')
    }

    return (
        <div>
            <nav id='nav'>
                <a href='https://github.com/gaelzarco?tab=repositories' target={'_blank'} rel='noreferrer'>
                    <h2 className='title' style={{fontSize: '1.5em'}}>AUDIX</h2>
                </a>
                <ul>
                    <li><a href='/'>profile</a></li>
                    <li><a href='/artists'>top artists</a></li>
                    <li><a href='/tracks'>top tracks</a></li>
                    <li><a href='/recent'>recent</a></li>
                    <li><a href='/playlists'>playlists</a></li>
                </ul>
                <button id='bttn' onClick={logout}>LOGOUT</button>
            </nav>
        </div>
    )
}
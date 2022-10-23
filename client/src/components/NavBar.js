import { logout } from "../spotify"

export default function NavBar() {

    return (
        <div>
            <nav id='nav'>
                <a className='navitem' href='https://github.com/gaelzarco?tab=repositories' target={'_blank'} rel='noreferrer'>
                    <h2 className='title' style={{fontSize: '1.5em', animation: 'fadein 0s'}}>AUDIX</h2>
                </a>
                <ul>
                    <li><a className='navitem' href='/'>profile</a></li>
                    <li><a className='navitem' href='/artists'>top artists</a></li>
                    <li><a className='navitem' href='/tracks'>top tracks</a></li>
                    <li><a className='navitem' href='/recent'>recent</a></li>
                    <li><a className='navitem' href='/playlists'>playlists</a></li>
                </ul>
                <button className='bttn' style={{animation: 'fadein 0s'}} onClick={logout}>LOGOUT</button>
            </nav>
        </div>
    )
}
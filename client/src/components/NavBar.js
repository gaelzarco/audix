import { logout } from "../spotify"
// import { useState } from 'react'


export default function NavBar() {

    // const [ currentTab, setCurrentTab ] = useState('')

    // function setTab(item) {
    //     setCurrentTab(item)
    // }

    return (
        <div>
            <nav id='nav'>
                <a className='navitem' href='https://github.com/gaelzarco?tab=repositories' target={'_blank'} rel='noreferrer'>
                    <h2 className='title' style={{fontSize: '1.5em', animation: 'fadein 0s'}}>AUDIX</h2>
                </a>           
                <ul>
                    <li id='profile'><a className='navitem' href='/'>profile</a></li>
                    <li id='artists'><a className='navitem' href='/artists'>top artists</a></li>
                    <li><a className='navitem' id='navstatic' href='/static'>STATIC</a></li>
                    <li id='tracks'><a className='navitem' href='/tracks'>top tracks</a></li>
                    <li id='recent'><a className='navitem' href='/recent'>recent</a></li>
                    {/* <li id='playlists'><a className='navitem' href='/playlists'>playlists</a></li> */}
                </ul>
                <button className='bttn' style={{animation: 'fadein 0s'}} onClick={logout}>LOGOUT</button>
            </nav>
        </div>
    )
}
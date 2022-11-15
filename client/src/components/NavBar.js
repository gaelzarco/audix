import { useState, useEffect } from 'react'

import { logout } from "../spotify"

export default function NavBar() {
    const [ currentTab, setCurrentTab ] = useState('profile')
    const [ navToggle, setNavToggle ] = useState(false)
    const [ windowDimension, setWindowDimension ] = useState(null)

    const toggleBttn = () => {
        setNavToggle(!navToggle)
    }

    useEffect(() => {
        setWindowDimension(window.innerWidth)

        function handleResize() {
            setWindowDimension(window.innerWidth)
        }
    
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    if (currentTab !== window.location.pathname) {
        setCurrentTab(window.location.pathname)
    }

    return (
        <>
            {windowDimension > 1200 ? (
                <div id='nav-div'>
                <nav id='nav'>
                    <a className='navitem' href='https://github.com/gaelzarco/audix' target={'_blank'} rel='noreferrer'>
                        <h2 className='title' style={{fontSize: '1.5em', animation: 'fadein 0s', paddingLeft: '2px'}}>AUDIX</h2>
                    </a>           
                    <ul>
                        <li><a className={currentTab === '/' ? 'active' : 'navitem'} href='/'>profile</a></li>
                        <li><a className={currentTab === '/artists' ? 'active' : 'navitem'} href='/artists'>top artists</a></li>
                        <li><a className={currentTab === '/static' ? 'active' : 'navitem'} href='/static'>STATIC</a></li>
                        <li><a className={currentTab === '/tracks' ? 'active' : 'navitem'} href='/tracks'>top tracks</a></li>
                        <li><a className={currentTab === '/recent' ? 'active' : 'navitem'} href='/recent'>recent</a></li>
                    </ul>
                    <button className='bttn' style={{animation: 'fadein 0s', padding: '0px', width: '100px', paddingTop: '5px', paddingBottom: '5px'}} onClick={logout}>LOGOUT</button>
                </nav>
            </div>
            ) : (
                <div id='small-nav-div'>
                    <div id='small-nav'>
                        <button className='bttn' onClick={toggleBttn} style={{animation: 'fadein 0s', width: '80px'}}>NAV</button>
                        <h3 style={{animation: 'fadein 0s', paddingLeft: '10px', paddingRight: '10px'}}>✦</h3>
                        <button className='bttn' style={{animation: 'fadein 0s', width: '80px'}} onClick={logout}>LOGOUT</button>
                    </div>
                    {navToggle === true ? (
                        <ul>
                            <li style={{padding: '15px'}}><a className={currentTab === '/' ? 'active' : 'navitem'} href='/'>profile</a></li>
                            <li style={{padding: '15px'}}><a className={currentTab === '/artists' ? 'active' : 'navitem'} href='/artists'>top artists</a></li>
                            <li style={{padding: '15px'}}><a className={currentTab === '/static' ? 'active' : 'navitem'} href='/static'>STATIC</a></li>
                            <li style={{padding: '15px'}}><a className={currentTab === '/tracks' ? 'active' : 'navitem'} href='/tracks'>top tracks</a></li>
                            <li style={{padding: '15px'}}><a className={currentTab === '/recent' ? 'active' : 'navitem'} href='/recent'>recent</a></li>
                        </ul>
                    ) : (
                        <p></p>
                    )}
                </div>
            )}
        </>
    )
}
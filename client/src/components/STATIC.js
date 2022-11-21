import html2canvas from 'html2canvas'

import { useState, useEffect } from "react";

import { getUser, getTopTracksShort, getTopTracksMedium, getTopTracksLong } from "../spotify";

import LoadingSpinner from "../loading/LoadingSpinner"

import staticlogo from '../imgs/staticlogo.png'
import static1 from '../imgs/static1.png'
import static2 from '../imgs/static2.png'
import static3 from '../imgs/static3.png'
import static4 from '../imgs/static4.png'
import static5 from '../imgs/static5.png'

export default function Static() {
    const [ search, setSearch ] = useState('long')
    const [ bg, setBg ] = useState(0)
    const [ user, setUser ] = useState(null)
    const [ tracksAll, setTracksAll ] = useState(null)
    const [ tracksMed, setTracksMed ] = useState(null)
    const [ tracksShort, setTracksShort ] = useState(null)

    const fetchData = async () => {
        const profile = await getUser()
        const songsAll = await getTopTracksLong()
        const songsMed = await getTopTracksMedium()
        const songsShort = await getTopTracksShort()
        setUser(profile.data)
        setTracksAll(songsAll.data.items.slice(0, 10))
        setTracksMed(songsMed.data.items.slice(0, 10))
        setTracksShort(songsShort.data.items.slice(0, 10))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const download = () => {
        html2canvas(document.getElementById('static-bg')).then(canvas => {
            console.log(canvas.toDataURL('image/jpeg', 1.0))
            let link = document.createElement("a")
            link.download = "AUDIX_STATIC.png"
            link.href = canvas.toDataURL('image/jpeg', 1.0)
            link.click()
        })
    }

    const backgrounds = [
        static1,
        static2,
        static3,
        static4,
        static5
    ]

    const backdrop = () => {
        bg === 4 ? setBg(0) : setBg(bg + 1)
    }

    const displayTracks = () => {
        switch (search) {
            case 'long': return (
                tracksAll.map((track, index) => {
                    return <p className='static-track' key={index}>{track.name} ✦ {track.album.artists[0].name}</p>
                })
            )
            
            case 'med': return (
                tracksMed.map((track, index) => {
                    return <p className='static-track' key={index}>{track.name} ✦ {track.album.artists[0].name}</p>
                })
            )

            case 'short': return (
                tracksShort.map((track, index) => {
                    return <p className='static-track' key={index}>{track.name} ✦ {track.album.artists[0].name}</p>
                })
            )

            default: return 'long'
        }
    }

    return (
        <>
            <div className='time'>
                <div className='time-options'>
                    <span className='option' id='short' onClick={ (e) => setSearch(e.target.id) }>4 Weeks</span>
                    <span className='option' id='med' onClick={ (e) => setSearch(e.target.id) }>6 Months</span>
                    <span className='option' id='long' onClick={ (e) => setSearch(e.target.id) }>All Time</span>
                </div>
            </div>
            {user !== null ? (
                <div id='static-page'>
                    <div id="static">
                        <div id="static-bg" style={{backgroundImage: `url(${backgrounds[bg]})`}}>
                            <img id='static-logo'src={staticlogo} alt='static logo'></img>
                            <div id='static-content'>
                                <h2>{user.display_name} ✦ top tracks</h2>
                                <br></br>
                                <div id='static-tracks'>
                                    {displayTracks()}
                                </div>
                                <p id='static-audix'>AUDIX</p>
                            </div>
                        </div>
                    </div>
                    <div id='static-bttn'>
                        <span style={{padding: '5px'}}><button className="bttn" style={{width: '140px'}} onClick={() => download()}>DOWNLOAD</button></span>
                        <span style={{padding: '5px'}}><button className='bttn' style={{width: '140px'}} onClick={() => backdrop()}>BACKDROP</button></span>
                    </div>
                </div>
            ) : (
                <div className='spinner-container'>
                    <LoadingSpinner />
                </div>
            )}
        </>
    )
}
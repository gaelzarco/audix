import html2canvas from 'html2canvas'

import { useState, useEffect } from "react";

import { getUser, 
    // getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong, 
    getTopTracksShort, getTopTracksMedium, getTopTracksLong } from "../spotify";

import LoadingSpinner from "../loading/LoadingSpinner"

import statix from '../imgs/statix.png'

export default function Static() {

    const [ search, setSearch ] = useState('long')

    const [ user, setUser ] = useState(null)

    const [ tracksAll, setTracksAll ] = useState(null)
    const [ tracksMed, setTracksMed ] = useState(null)
    const [ tracksShort, setTracksShort ] = useState(null)

    const fetchData = async () => {
        const profile = await getUser()
        const songsAll = await getTopTracksLong()
        const songsMed = await getTopTracksMedium()
        const songsShort = await getTopTracksShort()

        setTracksAll(songsAll.data.items.slice(0, 10))
        setTracksMed(songsMed.data.items.slice(0, 10))
        setTracksShort(songsShort.data.items.slice(0, 10))

        setUser(profile.data)
    }

    const setTimeframe = (id) => {
        setSearch(id)
    }

    const download = () => {
        const input = document.getElementById('static-bg')
        html2canvas(input).then(canvas => {
            let link = document.createElement("a")
            link.download = "AUDIX_STATIC.png"
            link.href = canvas.toDataURL('image/jpeg', 0.9)
            link.click()
        })
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

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className='time'>
                <div className='time-options'>
                    <span className='option' id='short' onClick={ (e) => setTimeframe(e.target.id) }>4 Weeks</span>
                    <span className='option' id='med' onClick={ (e) => setTimeframe(e.target.id) }>6 Months</span>
                    <span className='option' id='long' onClick={ (e) => setTimeframe(e.target.id) }>All Time</span>
                </div>
            </div>

            {user !== null ? (
                <div id='static-page'>
                    <div id="static">
                        <div id="static-bg">
                            <img id='static-logo'src={statix} alt='static logo'></img>
                            <div id='static-content'>
                                <h2>{user.display_name} ✦ top tracks</h2>
                                <p>{}</p>

                                <br></br>

                                <div id='static-tracks'>
                                    {displayTracks()}
                                </div>

                                <p id='static-audix'>AUDIX</p>
                            </div>
                        </div>
                    </div>
        
                    <div id='static-bttn'>
                        <button className="bttn" style={{width: '140px'}} onClick={() => download()}>DOWNLOAD</button>
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
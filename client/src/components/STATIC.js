import html2canvas from 'html2canvas'
import * as htmlToImage from 'html-to-image'

import { useState, useEffect } from "react";

import { getUser, getTopTracksShort, getTopTracksMedium, getTopTracksLong } from "../spotify";

import LoadingSpinner from "../loading/LoadingSpinner"

import statix from '../imgs/statix.png'

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
        const input = document.getElementById('static-bg')
        html2canvas(input).then(canvas => {
            let link = document.createElement("a")
            link.download = "AUDIX_STATIC.png"
            link.href = canvas.toDataURL('image/jpeg', 1.0)
            link.click()
        })
    }

    const backgrounds = [
        'https://audixbucket.s3.us-west-1.amazonaws.com/static1-modified.png',
        'https://audixbucket.s3.us-west-1.amazonaws.com/static2-modified.png',
        'https://audixbucket.s3.us-west-1.amazonaws.com/static3-modified.png',
        'https://audixbucket.s3.us-west-1.amazonaws.com/static4-modified.png'
    ]

    const backdrop = () => {
        bg === 3 ? setBg(0) : setBg(bg + 1)
        console.log(bg)
        console.log(backgrounds[bg])
        // let background = document.getElementById('static-bg')
        // for (let i = 0; i < backgrounds.length; i++) {
        //     if (bg === i) {
        //         background.style.backgroundImage = `url(${backgrounds[i]})`
        //     }
        // }
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
                            <img id='static-logo'src={statix} alt='static logo'></img>
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
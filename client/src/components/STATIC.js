import { useState, useEffect } from "react";

import { getUser, 
    getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong, 
    getTopTracksShort, getTopTracksMedium, getTopTracksLong } from "../spotify";

import static2 from '../imgs/static2.png'
import ps2 from '../imgs/ps2.png'
import psp from '../imgs/psp.png'
import psx from '../imgs/psx.png'
// import barcode from '../imgs/barcode.png'
// import flower from '../imgs/flower.png'

import LoadingSpinner from "../loading/LoadingSpinner"

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

        setTracksAll(songsAll.data.items.slice(-10))
        setTracksMed(songsMed.data.items)
        setTracksShort(songsShort.data.items)

        setUser(profile.data)
    }

    const setTimeframe = (id) => {
        setSearch(id)
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

            default: return 'LONG'
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {user !== null ? (
                <div id='static-page'>

                    <div className='time'>
                        <div className='time-options'>
                            <span className='option' id='short' onClick={ (e) => setTimeframe(e.target.id) }>4 Weeks</span>
                            <span className='option' id='med' onClick={ (e) => setTimeframe(e.target.id) }>6 Months</span>
                            <span className='option' id='long' onClick={ (e) => setTimeframe(e.target.id) }>All Time</span>
                        </div>
                    </div>

                    <div id="static">
                        <div id="static-bg">
                            <img id='static-logo'src={static2} alt='static logo' style={{height: '300px'}}></img>
                            
                            <div id='static-content'>
                                <h2>{user.display_name} ✦ top tracks</h2>

                                <br></br>

                                <div id='static-tracks'>
                                    {displayTracks()}
                            </div>

                            <div id='static-audix'>
                                <h3>AUDIX</h3>
                            </div>

                            </div>

                            {/* <img id='static-barcode' src={barcode} alt='barcode' style={{height: '100px'}}></img>
                            <img id='static-flower' src={flower} alt='flower' style={{height: '100px'}}></img> */}
                        </div>
                    </div>
        
                    <div id='static-bttn'>
                        <button className="bttn" style={{width: '140px'}}>DOWNLOAD</button>
                    </div>

                    <div>
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
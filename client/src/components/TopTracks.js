import { useState, useEffect } from "react"

import { getTopTracksShort, getTopTracksMedium, getTopTracksLong } from "../spotify"
import { millisToMinutesAndSeconds } from "../utility"

import LoadingSpinner from "../loading/LoadingSpinner"

export default function TopTracks() {
    const [ search, setSearch ] = useState('long')
    const [ tracksAll, setTracksAll ] = useState(null)
    const [ tracksMed, setTracksMed ] = useState(null)
    const [ tracksShort, setTracksShort ] = useState(null)

    const fetchData = async () => {
        const songsAll = await getTopTracksLong()
        const songsMed = await getTopTracksMedium()
        const songsShort = await getTopTracksShort()
        setTracksAll(songsAll.data.items)
        setTracksMed(songsMed.data.items)
        setTracksShort(songsShort.data.items)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const displayTracks = () => {
        switch (search) {
            case 'long': return (
                tracksAll.length > 0 ? (
                    tracksAll.map((track, index) => {
                        return ( 
                            <div className='trackscard' key={index}>
                                <img src={track.album.images[0].url} alt='Album Cover' className='tracks-img'></img>
                                <div className='trackscard-content'>
                                    <h3 className='card-title' style={{fontSize: '1rem'}}>{track.name}</h3>
                                        <p style={{fontSize: '1rem'}}>{track.album.artists[0].name} ✦ {track.album.name}</p>
                                        <span>
                                            <p style={{fontSize: '.75rem'}}>{millisToMinutesAndSeconds(track.duration_ms)}</p>
                                        </span>
                                    <a href={track.external_urls.spotify} target={'_blank'} rel='noreferrer'><button className='bttn'>SPOTIFY</button></a>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className='spinner-container'>
                        <h3 className='title' style={{color: 'rgb(255, 255, 255, 0.75)'}}>No top tracks ever</h3>
                    </div>
                )
            )
            
            case 'med': return (
                tracksMed.length > 0 ? (
                    tracksMed.map((track, index) => {
                        return ( 
                            <div className='trackscard' key={index}>
                                <img src={track.album.images[0].url} alt='Album Cover' className='tracks-img'></img>
                                <div className='trackscard-content'>
                                    <h3 className='card-title' style={{fontSize: '1rem'}}>{track.name}</h3>
                                        <p style={{fontSize: '1rem'}}>{track.album.artists[0].name} ✦ {track.album.name}</p>
                                        <span>
                                            <p style={{fontSize: '.75rem'}}>{millisToMinutesAndSeconds(track.duration_ms)}</p>
                                        </span>
                                    <a href={track.external_urls.spotify} target={'_blank'} rel='noreferrer'><button className='bttn'>SPOTIFY</button></a>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className='spinner-container'>
                        <h3 className='title' style={{color: 'rgb(255, 255, 255, 0.75)'}}>No top tracks in the last 6 months</h3>
                    </div>
                )
            )

            case 'short': return (
                tracksShort.length > 0 ? (
                    tracksShort.map((track, index) => {
                        return ( 
                            <div className='trackscard' key={index}>
                                <img src={track.album.images[0].url} alt='Album Cover' className='tracks-img'></img>
                                <div className='trackscard-content'>
                                    <h3 className='card-title' style={{fontSize: '1rem'}}>{track.name}</h3>
                                        <p style={{fontSize: '1rem'}}>{track.album.artists[0].name} ✦ {track.album.name}</p>
                                        <span>
                                            <p style={{fontSize: '.75rem'}}>{millisToMinutesAndSeconds(track.duration_ms)}</p>
                                        </span>
                                    <a href={track.external_urls.spotify} target={'_blank'} rel='noreferrer'><button className='bttn'>SPOTIFY</button></a>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className='spinner-container'>
                        <h3 className='title' style={{color: 'rgb(255, 255, 255, 0.75)'}}>No recent top tracks</h3>
                    </div>
                )
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
            {tracksAll !== null ? (
                <div className='tracks'>
                    {displayTracks()}
                </div>
            ): (
                <LoadingSpinner />
            )}
        </>
    )
}
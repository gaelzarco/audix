import { useState, useEffect } from "react"

import { getRecentlyPlayed } from "../spotify"
import { millisToMinutesAndSeconds } from "../utility"

import LoadingSpinner from "../loading/LoadingSpinner"

export default function Recent() {
    const [ recentlyPlayed, setRecentlyPlayed ] = useState(null)

    const fetchData = async () => {
        const recent = await getRecentlyPlayed()
        setRecentlyPlayed(recent.data.items)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {recentlyPlayed !== null ? (
                <div className='tracks'>
                    {recentlyPlayed.length > 0 ? (
                        recentlyPlayed.map((recentSong, index) => {
                            return ( 
                                <div className='trackscard' key={index}>
                                    <img src={`${recentSong.track.album.images[0].url}`} alt='Album Cover' className='tracks-img'></img>
                                    <div className='trackscard-content'>
                                        <h3 className='card-title' style={{fontSize: '1rem'}}>{recentSong.track.name}</h3>
                                            <p style={{fontSize: '1rem'}}>{recentSong.track.album.artists[0].name} ✦ {recentSong.track.album.name}</p>
                                            <span>
                                                <p style={{fontSize: '.75rem'}}>{millisToMinutesAndSeconds(recentSong.track.duration_ms)}</p>
                                            </span>
                                        <a href={recentSong.track.external_urls.spotify} target={'_blank'} rel='noreferrer'><button className='bttn'>SPOTIFY</button></a>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className='spinner-container'>
                            <h3 className='text' style={{color: 'rgb(255, 255, 255, 0.75)'}}>No recent tracks</h3>
                        </div>
                    )}
                </div>
            ): (
                <LoadingSpinner />
            )}
        </>
    )
}
import { useState, useEffect } from "react"

import { getTopTracksLong } from "../spotify"

import LoadingSpinner from "../loading/LoadingSpinner"

export default function TopTracks() {

    const [ topTracks, setTopTracks ] = useState(null)

    const fetchData = async () => {
        const tracks = await getTopTracksLong()
        setTopTracks(tracks.data.items)
    }

    // Stack Overflow https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {topTracks !== null ? (
                <div className='tracks'>
                    {topTracks.length > 0 ? (
                        topTracks.map((track, index) => {
                            return ( 
                                <div className='trackscard' key={index}>
                                    <img src={`${track.album.images[0].url}`} alt='Album Cover' className='tracks-img'></img>
                                    <div className='trackscard-content'>
                                        <h3 className='card-title' style={{fontSize: '1rem'}}>{track.name}</h3>
                                            <p style={{fontSize: '1rem'}}>{track.album.artists[0].name} ✦ {track.album.name}</p>
                                            <span>
                                                <p style={{fontSize: '.75rem'}}>{millisToMinutesAndSeconds(track.duration_ms)}</p>
                                            </span>
                                        <a href={`/tracks/${track.id}`}><button className='bttn'>SPOTIFY</button></a>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className='spinner-container'>
                            <h3 className='title'>you do not have any top tracks</h3>
                        </div>
                    )}
                </div>
            ): (
                <LoadingSpinner />
            )}
        </>
    )
}
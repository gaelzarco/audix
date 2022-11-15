import { useState, useEffect } from "react"

import { getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong } from "../spotify"

import LoadingSpinner from "../loading/LoadingSpinner"

export default function TopArtists() {
    const [ search, setSearch ] = useState('long')
    const [ artistsAll, setArtistsAll ] = useState(null)
    const [ artistsMed, setArtistsMed ] = useState(null)
    const [ artistsShort, setArtistsShort ] = useState(null)

    const fetchData = async () => {
        const artistsL = await getTopArtistsLong()
        const artistsM = await getTopArtistsMedium()
        const artistsS = await getTopArtistsShort()
        setArtistsAll(artistsL.data.items)
        setArtistsMed(artistsM.data.items)
        setArtistsShort(artistsS.data.items)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const displayArtists = () => {
        switch (search) {
            case 'long': return (
                artistsAll.length > 0 ? (
                    artistsAll.map((artist, index) => {
                        return ( 
                            <span key={index}>
                                <a className='a' href={`/artist/${artist.id}`}>
                                    <img src={artist.images[0].url} className='topapics' alt='Artist Profile'/>
                                    <h3 className='text'>{artist.name}</h3>
                                </a>
                            </span>
                        )
                    })
                ) : (
                    <div className='spinner-container'>
                        <h3 className='title' style={{color: 'rgb(255, 255, 255, 0.75)'}}>No top artists ever</h3>
                    </div>
                )
            )

            case 'med': return (
                artistsMed.length > 0 ? (
                    artistsMed.map((artist, index) => {
                        return ( 
                            <span key={index}>
                                <a className='a' href={`/artist/${artist.id}`}>
                                    <img src={artist.images[0].url} className='topapics' alt='Artist Profile'/>
                                    <h3 className='text'>{artist.name}</h3>
                                </a>
                            </span>
                        )
                    })
                ) : (
                    <div className='spinner-container'>
                        <h3 className='title' style={{color: 'rgb(255, 255, 255, 0.75)'}}>No top artists in the last 6 months</h3>
                    </div>
                )
            )

            case 'short': return (
                artistsShort.length > 0 ? (
                    artistsShort.map((artist, index) => {
                        return ( 
                            <span key={index}>
                                <a className='a' href={`/artist/${artist.id}`}>
                                    <img src={artist.images[0].url} className='topapics' alt='Artist Profile'/>
                                    <h3 className='text'>{artist.name}</h3>
                                </a>
                            </span>
                        )
                    })
                ) : (
                    <div className='spinner-container'>
                        <h3 className='title' style={{color: 'rgb(255, 255, 255, 0.75)'}}>No recent top artists</h3>
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
            {artistsAll !== null ? (
                <div className='top-artists'>
                    {displayArtists()}
                </div>
            ): (
                <LoadingSpinner />
            )}
        </>
    )
}
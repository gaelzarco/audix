import { useState, useEffect } from "react"

import { getTopArtistsLong } from "../spotify"

import LoadingSpinner from "../loading/LoadingSpinner"

export default function TopArtists() {

    const [ search, setSearch ] = useState('long')

    const [ topArtists, setTopArtists ] = useState(null)

    const fetchData = async () => {
        const artists = await getTopArtistsLong()

        setTopArtists(artists.data.items)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const setTimeframe = (id) => {
        setSearch(id)
    }

    return (
        <>
            <div className='time'>
                <div className='time-options'>
                    <span className='option' id='short' onClick={ (e) => setTimeframe(e.target.id) }>4 Weeks</span>
                    <span className='option' id='med' onClick={ (e) => setTimeframe(e.target.id) }>6 Months</span>
                    <span className='option' id='long' onClick={ (e) => setTimeframe(e.target.id) }>All Time</span>
                </div>
            </div>

            {topArtists !== null ? (
                <div className='top-artists'>

                    {topArtists.length > 0 ? (
                        topArtists.map((artist, index) => {
                            return ( 
                                <span key={index}>
                                    <a className='a' href={`artist/${artist.id}`}>
                                        <img src={artist.images[0].url} className='topapics' alt='Artist Profile'/>
                                        <h3 className='text'>{artist.name}</h3>
                                    </a>
                                </span>
                            )
                        })
                    ) : (
                        <div className='spinner-container'>
                            <h3 className='title'>you do not have any top artists</h3>
                        </div>
                    )}
                </div>
            ): (
                <LoadingSpinner />
            )}
        </>
    )
}
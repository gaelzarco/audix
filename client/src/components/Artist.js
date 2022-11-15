import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"

import { getArtist } from "../spotify"

import LoadingSpinner from '../loading/LoadingSpinner'

export default function Artist() {
    const nav = useNavigate()
    const { id } = useParams()
    
    const [ artist, setArtist ] = useState(null)

    const fetchData = async () => {
        const art = await getArtist(id)
        setArtist(art.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(artist)

    const titleStyle = {
        fontSize: '1rem',
        color: 'rgb(255, 255, 255, 0.75)'
    }

    return (
        <>
            {artist !== null ? (
                <div className='user'>
                    <img id='avatar' src={artist.images[0].url} alt='artist'></img>
                    <h1 className='title'>{artist.name}</h1>
                    <span className='following'>
                        <span className='nested-following-span'>
                            <h3 className='text'>{artist.followers.total.toLocaleString("en-US")}</h3>
                            <h3 className='title' style={titleStyle}>Followers</h3>
                        </span>
                        <span className='nested-following-span'>
                            {artist.genres.slice(0, 3).map((genre, index) => <h3 className='text' key={index} style={{padding: '5px'}}>{genre}</h3>)}
                            <h3 className='title' style={titleStyle}>Genres</h3>
                        </span>
                        <span className='nested-following-span'>
                            <h3 className='text'>{artist.popularity}</h3>
                            <h3 className='title' style={titleStyle}>Popularity</h3>
                        </span>
                    </span>
                    <div style={{padding: '50px'}}>
                        <span style={{paddingRight: '5px'}}><a href={artist.external_urls.spotify} target={'_blank'} rel='noreferrer'><button className='bttn'>SPOTIFY</button></a></span>
                        <span style={{paddingLeft: '5px'}}><button className='bttn' onClick={() => nav(-1)}>BACK</button></span>
                    </div>
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </>
    )
}
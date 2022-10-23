import { useState, useEffect } from "react"

import { getPlaylists } from "../spotify"

import LoadingSpinner from "../loading/LoadingSpinner"

export default function Playlists() {

    const [ playlists, setPlaylists ] = useState(null)

    const fetchData = async () => {
        const playlists = await getPlaylists()

        setPlaylists(playlists.data.items)
    }

    console.log(playlists)

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {playlists !== null ? (
                <div className='playlists'>
                    {playlists.length > 0 ? (
                        playlists.map((playlist, index) => {
                            return ( 
                                <div key={index}>
                                    <a>
                                        { playlist.images > 0 ? <img src={playlist.images[0].url} className='playlist-img' alt='Playlist Cover'/> : (
                                            <img src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fechos.mus.br%2Fproducoes%2Fwp-content%2Fuploads%2Fsites%2F3%2F2017%2F02%2Falbum_placeholder.jpg&f=1&nofb=1&ipt=fa8b1a217586e4dee4e2a13e247aec741adfbefa3b14baf8f6a3449b84f89426&ipo=images' className='playlist-img' alt='Placeholder Playlist Cover' style={{height: '280px'}}/>
                                        )}
                                        <h3 className='text'>{playlist.name}</h3>
                                    </a>
                                </div>
                            )
                        })
                    ) : (
                        <div className='spinner-container'>
                            <h3 className='title'>you do not have any playlists</h3>
                        </div>
                    )}
                </div>
            ): (
                <LoadingSpinner />
            )}
        </>
    )
}
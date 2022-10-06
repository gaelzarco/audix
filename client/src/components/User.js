import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";

import LoadingSpinner from "../loading/LoadingSpinner";

export default function User() {

    const [ user, setUser ] = useContext(UserContext)
    const [ userProfile, setUserProfile ] = useState(null)
    const [ followedArtists, setFollowedArtists ] = useState(null)
    const [ topSongs, setTopSongs ] = useState(null)
    const [ topArtists, setTopArtists ] = useState(null)

    const navigate = useNavigate()

    const checkErr = useCallback((res) => {
        if (res.error) {
            fetch(`/refresh_token?refresh_token=${user.refreshToken}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then( resData => setUser((user) => ({ ...user, accessToken: resData.access_token })) )
            .finally(() => navigate('/'))
        } else {
            setUserProfile(res)
        }
    }, [setUser, user.refreshToken, navigate])

    const headers = useMemo(() => {
        return ({
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${user.accessToken}`
            }
        })
    }, [user.accessToken])

    useEffect(() => {
        fetch('https://api.spotify.com/v1/me', headers)
        .then(res => res.json())
        .then(resData => checkErr(resData))

        fetch('https://api.spotify.com/v1/me/following?type=artist', headers)
        .then(res => res.json())
        .then(resData => setFollowedArtists(resData.artists.items))

        fetch('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', headers)
        .then(res => res.json())
        .then(resData => setTopArtists(resData.items))

        fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', headers)
        .then(res => res.json())
        .then(resData => setTopSongs(resData.items))
    }, [headers, checkErr])

    return (
        <>
            {userProfile !== null ? (
                <div className='user'>
                    {userProfile.images.length > 0 ? (
                        <img src={userProfile.images[0].url} id='avatar' alt='avatar'/>
                    ) : (
                        <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_960_720.png&f=1&nofb=1&ipt=19ee73a7d7f3fce63232dc1909edb18399a2a02a7e49bdc69af23eaf46da2213&ipo=images' alt='no avatar' />
                    )}
                    <h3 className='title' style={{fontSize:'2rem'}}>{userProfile.display_name}</h3>
                    <span className='following'>
                        <span>
                            <h3 className='text'>{userProfile.followers.total}</h3>
                            <h3 className='title' style={{fontSize:'1rem', color:'rgb(255, 255, 255, 0.75)'}}>{userProfile.followers.total > 1 || userProfile.followers.total === 0 ? 'followers' : 'follower'}</h3>
                        </span>
                        {followedArtists !== null && followedArtists.length > 0 ? (
                            <span>
                                <h3 className='text'>{followedArtists.length}</h3>
                                <h3 className='title' style={{fontSize:'1rem', color:'rgb(255, 255, 255, 0.75)'}}>{followedArtists.length > 0 ? 'following' : 'you are not following anyone'}</h3>
                            </span>
                        ) : <h3 className='text'>you are not following anyone</h3>}
                    </span>

                    <h3 className='title' style={{paddingTop: '30px', fontSize: '2.5rem'}}>top artists</h3>

                    <div className='top' style={{ paddingBottom: '30px'}}>
                    {topArtists !== null ? (
                        topArtists.map((artist, index) => {
                            return ( 
                                <span key={index}>
                                    <img src={artist.images[0].url} className='toppics' alt='Artist Profile'/>
                                    <h3 className='text'>{artist.name}</h3>
                                </span>
                            )
                        })
                    ) : (
                        <h3 className='title'>You do not have any top artists</h3>
                    )}
                    </div>

                    <h3 className='title' style={{paddingTop: '30px', fontSize: '2.5rem'}}>top tracks</h3>

                    <div className='top' style={{ paddingBottom: '30px'}}>
                    {topSongs !== null ? (
                        topSongs.map((song, index) => {
                            return ( 
                                <span key={index}>
                                    <img src={song.album.images[0].url} className='toppics' alt='Song Album Cover'/>
                                    <h3 className='text'>{song.name}</h3>
                                </span>
                            )
                        })
                    ) : (
                        <h3 className='title'>You do not have any top songs</h3>
                    )}
                    </div>
                </div>
            ) : <LoadingSpinner />}
        </>
    )
}
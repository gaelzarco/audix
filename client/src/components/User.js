import { useState, useEffect } from "react";

import { getUser, getFollowing } from "../spotify"; 

import LoadingSpinner from "../loading/LoadingSpinner";

export default function User() {

    const [ user, setUser ] = useState(null)
    const [ followedArtists, setFollowedArtists ] = useState(null)

    const fetchData = async () => {
        const target = await getUser()
        const artists = await getFollowing()

        setUser(target.data)
        setFollowedArtists(artists.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {user !== null ? (
                <div className='user'>
                    {user.images.length > 0 ? (
                        <img src={user.images[0].url} id='avatar' alt='avatar'/>
                    ) : (
                        <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_960_720.png&f=1&nofb=1&ipt=19ee73a7d7f3fce63232dc1909edb18399a2a02a7e49bdc69af23eaf46da2213&ipo=images' id='avatar' alt='no avatar' />
                    )}

                    <h3 className='title' style={{fontSize:'2rem'}}>{user.display_name}</h3>
                    <span className='following'>
                        <span>
                            <h3 className='text'>{user.followers.total}</h3>
                            <h3 className='title' style={{fontSize:'1rem', color:'rgb(255, 255, 255, 0.75)'}}>{user.followers.total > 1 || user.followers.total === 0 ? 'followers' : 'follower'}</h3>
                        </span>

                        {followedArtists !== null ? (
                            <span>
                                <h3 className='text'>{followedArtists.artists.items.length}</h3>
                                <h3 className='title' style={{fontSize:'1rem', color:'rgb(255, 255, 255, 0.75)'}}>following</h3>
                            </span>
                        ) : <h3 className='text'>error finding followers</h3>}

                    </span>
                </div>
            ) : <LoadingSpinner />}
        </>
    )
}
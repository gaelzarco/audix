import { useState, useEffect } from "react";

import { getUser } from "../spotify";

import audxstatic from '../imgs/audxstatic.jpg'
import static2 from '../imgs/static2.png'

export default function Static() {

    const [ user, setUser ] = useState(null)

    const fetchData = async () => {
        const target = await getUser()

        setUser(target.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(user)

    return (
        <>
            {user !== null ? (
                <div>
                    <div className="static">
                    <div id="static-bg">
                        <img id='static-logo'src={static2} alt='static logo' style={{height: '300px'}}></img>
                        
                        <div id='static-content'>
                            <h2 >{user.display_name}</h2>
                        </div>
                    </div>
                    </div>
        
                    <div id='static-bttn'>
                        <button className="bttn">DOWNLOAD</button>
                    </div>
                </div>
            ) : (
                <div className='spinner-container'>
                    <h1>Something went wrong...</h1>
                </div>
            )}
        </>
    )
}
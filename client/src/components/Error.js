import { useParams } from "react-router-dom"

export default function Error() {
    const { error } = useParams()
    console.log(error)

    const errorDisplay = () => {
        if (error === 'access_denied') {
            return (
                <div>
                    <h2 id='title'>Please allow Audix access to Spotify</h2>

                    <a href='/'>
                        <button id='bttn'>BACK</button>
                    </a>
                </div>
            )
        }
    }

    return (
        <div className='error'>
            {errorDisplay()}
        </div>
    )
}
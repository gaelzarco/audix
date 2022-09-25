export default function LandingPage() {

    const spotifyLogin = () => {
        fetch('/login', {
            mode: 'no-cors'
        })
    }

    return (
        <div className='landing'>
            <h1 id='title'>Audix</h1>
            {/* <h1 id="fetch">{data.message}</h1> */}
            <button id='bttn' onClick={spotifyLogin}>LOGIN</button>

            {/* <Footer /> */}
        </div>
    )
}
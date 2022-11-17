export default function LandingPage() {
    return (
        <div className='landing'>
            <div style={{paddingBottom: '20px'}}>
            <h1 className='title' style={{ fontSize: '2.5rem'}}>AUDIX</h1>
                <div id='landing-desc' style={{padding: '20px'}}>
                    <p>Download a STATIC and share your top Spotify tracks with the world</p>
                </div>
            </div>
            <a href='http://127.0.0.1:5000/authorize'>
                <button className='bttn'>LOGIN</button>
            </a>
            <p></p>
            <footer id='footer'>Gael Zarco</footer>
        </div>
    )
}
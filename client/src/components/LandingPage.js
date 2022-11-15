export default function LandingPage() {
    return (
        <div className='landing'>
            <h1 className='title' style={{ fontSize: '2.5rem' }}>AUDIX</h1>
            <div style={{paddingBottom: '20px'}}>
                <div id='landing-desc' style={{padding: '20px'}}>
                    <p>Audix is a website to share your top SPOTIFY tracks with the world. Download a STATIC with a push of a button.</p>
                    <p style={{paddingTop: '10px'}}>Created by Gael Zarco</p>
                </div>
            </div>
            <a href='http://127.0.0.1:5000/authorize'>
                <button className='bttn'>LOGIN</button>
            </a>
            <p></p>
        </div>
    )
}
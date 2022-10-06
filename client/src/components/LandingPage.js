export default function LandingPage() {
    return (
        <div className='landing'>
            <h1 className='title' style={{fontSize: '2.5rem'}}>AUDIX</h1>
            
            <a href='http://127.0.0.1:5000/authorize'>
                <button id='bttn'>LOGIN</button>
            </a>
        </div>
    )
}
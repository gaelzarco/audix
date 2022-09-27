export default function LandingPage() {
    return (
        <div className='landing'>
            <h1 id='title' style={{fontSize: '4rem'}}>Audix</h1>
            
            <a href='http://127.0.0.1:5000/authorize'>
                <button id='bttn'>LOGIN</button>
            </a>
        </div>
    )
}
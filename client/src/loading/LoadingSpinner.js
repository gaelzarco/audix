export default function LoadingSpinner() {
    return (
        <div className='spinner-container'>
            <img id='spinner' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F67%2Ffc%2Fcd%2F67fccd215854dffa6a9d289870479a01.gif&f=1&nofb=1&ipt=07dca38a23150446273d8829226255fa27980483c645564a09377a9fcb12c36d&ipo=images' alt='loading'/>
            <h1 className='title' style={{ fontSize: '1rem', padding: '20px' }}>LOADING...</h1>
        </div>
    )
}